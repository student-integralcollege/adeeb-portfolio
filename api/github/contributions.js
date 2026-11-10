/**
 * Vercel Serverless Function: /api/github/contributions
 *
 * Handles fetching GitHub contribution calendar data using GitHub GraphQL API
 * with authentication via GITHUB_TOKEN environment variable.
 *
 * Features:
 * - Server-side only token usage (token is never leaked to the client)
 * - Supports Classic PATs (user query) & Fine-Grained PATs (viewer query)
 * - Built-in fallback to public GitHub contributions service if token is rate-limited or fails
 * - In-memory and Vercel Edge caching (Cache-Control) to avoid rate limits
 * - Meaningful server logs for Vercel diagnostic logging
 */

const cache = new Map();
const TTL = 15 * 60 * 1000; // 15 minutes

const USER_QUERY = `
  query($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

const VIEWER_QUERY = `
  query($from: DateTime!, $to: DateTime!) {
    viewer {
      login
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

const CONTRIBUTION_LEVELS = [
  'NONE',
  'FIRST_QUARTILE',
  'SECOND_QUARTILE',
  'THIRD_QUARTILE',
  'FOURTH_QUARTILE',
];

function transformCalendarData(calendar, username, year) {
  const contributions = calendar.weeks
    .flatMap((week) => week.contributionDays)
    .map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: Math.max(0, CONTRIBUTION_LEVELS.indexOf(day.contributionLevel)),
    }));

  return {
    username,
    year,
    total: calendar.totalContributions,
    contributions,
    source: 'github-graphql',
  };
}

async function fetchFromGraphQL(username, year, token) {
  if (!token) {
    console.warn('[GitHub API] GITHUB_TOKEN is not configured in environment variables.');
    return null;
  }

  const from = `${year}-01-01T00:00:00Z`;
  const to = `${year}-12-31T23:59:59Z`;
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'User-Agent': 'adeeb-portfolio-contribution-calendar',
  };

  // 1. Attempt user(login: $login) query (standard for Classic PAT with read:user)
  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers,
      signal: AbortSignal.timeout(6000),
      body: JSON.stringify({
        query: USER_QUERY,
        variables: { login: username, from, to },
      }),
    });

    if (response.ok) {
      const payload = await response.json();
      const calendar = payload.data?.user?.contributionsCollection?.contributionCalendar;
      if (calendar) {
        console.log(`[GitHub API] Successfully retrieved GraphQL contributions for user: ${username} (${year})`);
        return transformCalendarData(calendar, username, year);
      }
      if (payload.errors?.length) {
        console.warn('[GitHub API] GraphQL user query returned errors:', payload.errors.map((e) => e.message).join('; '));
      }
    } else {
      console.warn(`[GitHub API] GitHub GraphQL user query failed with status: ${response.status}`);
    }
  } catch (err) {
    console.warn('[GitHub API] Error requesting GitHub GraphQL user query:', err.message);
  }

  // 2. Fine-grained PATs often restrict user(login:) — attempt viewer query if username matches
  try {
    const viewerRes = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers,
      signal: AbortSignal.timeout(6000),
      body: JSON.stringify({
        query: VIEWER_QUERY,
        variables: { from, to },
      }),
    });

    if (viewerRes.ok) {
      const payload = await viewerRes.json();
      const viewerLogin = payload.data?.viewer?.login;
      const calendar = payload.data?.viewer?.contributionsCollection?.contributionCalendar;
      if (calendar && (!viewerLogin || viewerLogin.toLowerCase() === username.toLowerCase())) {
        console.log(`[GitHub API] Successfully retrieved GraphQL contributions via viewer query (${year})`);
        return transformCalendarData(calendar, username, year);
      }
    }
  } catch (err) {
    console.warn('[GitHub API] Error requesting GitHub GraphQL viewer query:', err.message);
  }

  return null;
}

async function fetchFromPublicService(username, year) {
  try {
    console.log(`[GitHub API] Falling back to public contributions service for ${username} (${year})...`);
    const publicUrl = `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=${year}`;
    const response = await fetch(publicUrl, { signal: AbortSignal.timeout(5000) });

    if (!response.ok) {
      console.warn(`[GitHub API] Public fallback service responded with HTTP ${response.status}`);
      return null;
    }

    const data = await response.json();
    let total = 0;
    if (typeof data.total === 'number') {
      total = data.total;
    } else if (data.total && typeof data.total === 'object') {
      total = data.total[year] ?? data.total[String(year)] ?? Object.values(data.total)[0] ?? 0;
    }

    const rawContributions = Array.isArray(data.contributions) ? data.contributions : [];
    const contributions = rawContributions.map((item) => ({
      date: item.date,
      count: Number(item.count ?? 0),
      level: Math.min(4, Math.max(0, Number(item.level ?? 0))),
    }));

    console.log(`[GitHub API] Successfully retrieved contributions from fallback service for ${username} (${year})`);
    return {
      username,
      year,
      total: Number(total || 0),
      contributions,
      source: 'public-fallback',
    };
  } catch (err) {
    console.warn('[GitHub API] Failed to reach public fallback service:', err.message);
    return null;
  }
}

export async function getGithubContributions(username, year) {
  const key = `${username}:${year}`;
  const cached = cache.get(key);
  if (cached && cached.expires > Date.now()) {
    return cached.value;
  }

  const token = process.env.GITHUB_TOKEN;

  // 1. Try GraphQL first
  let result = await fetchFromGraphQL(username, year, token);

  // 2. If GraphQL returns nothing or failed, use the reliable public fallback
  if (!result) {
    result = await fetchFromPublicService(username, year);
  }

  if (!result) {
    throw Object.assign(new Error(`Unable to load contribution data for ${username} (${year}).`), { status: 404 });
  }

  cache.set(key, { value: result, expires: Date.now() + TTL });
  return result;
}

/**
 * Universal Request Handler
 * Works both as a Vercel Serverless Function and Vite/Node middleware
 */
export async function handleGithubApi(req, res) {
  // Parse query parameters from req.query (Vercel) or req.url (Connect / Node http)
  const url = new URL(req.url || '/', 'http://localhost');
  const isDirectApiCall = !req.url || url.pathname === '/' || url.pathname.startsWith('/api/github/contributions');
  if (!isDirectApiCall) {
    return false;
  }

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return true;
  }

  const queryParams = req.query || {};

  const username =
    queryParams.username ||
    url.searchParams.get('username') ||
    process.env.GITHUB_USERNAME ||
    'student-integralcollege';

  const yearParam = queryParams.year || url.searchParams.get('year');
  const year = yearParam ? Number(yearParam) : new Date().getFullYear();

  res.setHeader('Content-Type', 'application/json');

  if (!Number.isInteger(year) || year < 2008 || year > new Date().getFullYear() + 1) {
    res.statusCode = 400;
    res.setHeader('Cache-Control', 'no-store');
    res.end(JSON.stringify({ error: `Invalid contribution year: ${yearParam}. Must be an integer between 2008 and current year.` }));
    return true;
  }

  try {
    const data = await getGithubContributions(username, year);
    res.statusCode = 200;
    // Cache at Vercel Edge for 5 minutes, stale-while-revalidate for 15 minutes
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=900');
    res.end(JSON.stringify(data));
  } catch (error) {
    console.error(`[GitHub API Error] Failed for ${username} (${year}):`, error.message);
    res.statusCode = error.status || 502;
    res.setHeader('Cache-Control', 'no-store');
    res.end(JSON.stringify({ error: error.message || 'Unable to load GitHub contributions.' }));
  }

  return true;
}

// Default export for Vercel Serverless Function
export default async function handler(req, res) {
  return handleGithubApi(req, res);
}
