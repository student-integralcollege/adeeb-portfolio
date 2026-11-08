const username = process.env.GITHUB_USERNAME || 'student-integralcollege';
const cache = new Map();
const TTL = 15 * 60 * 1000;
const query = `query($login:String!, $from:DateTime!, $to:DateTime!) { user(login:$login) { contributionsCollection(from:$from,to:$to) { contributionCalendar { totalContributions weeks { contributionDays { date contributionCount contributionLevel } } } } } }`;

async function githubData(year) {
  if (!process.env.GITHUB_TOKEN) throw Object.assign(new Error('GitHub contribution service is not configured. Set GITHUB_TOKEN in the server environment.'), { status: 503 });
  const key = `${username}:${year}`;
  const cached = cache.get(key);
  if (cached && cached.expires > Date.now()) return cached.value;
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, 'Content-Type': 'application/json', 'User-Agent': 'portfolio-contribution-calendar' },
    body: JSON.stringify({ query, variables: { login: username, from: `${year}-01-01T00:00:00Z`, to: `${year}-12-31T23:59:59Z` } }),
  });
  const payload = await response.json();
  if (!response.ok || payload.errors?.length) {
    if (response.status === 401) throw Object.assign(new Error('GitHub rejected GITHUB_TOKEN (401). The token is invalid, expired, or revoked. Create a replacement and update .env.'), { status: 401 });
    if (response.status === 403) throw Object.assign(new Error('GitHub denied this GraphQL request (403). Check token permissions and rate limits.'), { status: 403 });
    throw Object.assign(new Error(payload.errors?.[0]?.message || payload.message || `GitHub API returned ${response.status}`), { status: 502 });
  }
  const calendar = payload.data?.user?.contributionsCollection?.contributionCalendar;
  if (!calendar) throw Object.assign(new Error(`No contribution history was returned for ${username}.`), { status: 404 });
  const contributions = calendar.weeks.flatMap((week) => week.contributionDays).map((day) => ({ date: day.date, count: day.contributionCount, level: ['NONE', 'FIRST_QUARTILE', 'SECOND_QUARTILE', 'THIRD_QUARTILE', 'FOURTH_QUARTILE'].indexOf(day.contributionLevel) }));
  const value = { username, year, total: calendar.totalContributions, contributions };
  cache.set(key, { value, expires: Date.now() + TTL });
  return value;
}

export async function handleGithubApi(req, res) {
  const url = new URL(req.url, 'http://localhost');
  if (url.pathname !== '/api/github/contributions') return false;
  res.setHeader('Content-Type', 'application/json');
  const year = Number(url.searchParams.get('year'));
  if (!Number.isInteger(year) || year < 2008 || year > new Date().getFullYear()) {
    res.statusCode = 400; res.setHeader('Cache-Control', 'no-store'); res.end(JSON.stringify({ error: 'Invalid contribution year.' })); return true;
  }
  try {
    const value = await githubData(year);
    res.statusCode = 200; res.setHeader('Cache-Control', 'public, max-age=300, stale-while-revalidate=900'); res.end(JSON.stringify(value));
  } catch (error) {
    res.statusCode = error.status || 502; res.setHeader('Cache-Control', 'no-store'); res.end(JSON.stringify({ error: error.message || 'Unable to load GitHub contributions.' }));
  }
  return true;
}
