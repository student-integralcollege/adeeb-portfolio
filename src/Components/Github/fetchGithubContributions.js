function normalizeContributions(data, username, year) {
  let total = 0;
  if (typeof data?.total === 'number') {
    total = data.total;
  } else if (data?.total && typeof data.total === 'object') {
    total = data.total[year] ?? data.total[String(year)] ?? Object.values(data.total)[0] ?? 0;
  }

  const rawContributions = Array.isArray(data?.contributions) ? data.contributions : [];
  const contributions = rawContributions.map((item) => {
    let level = Number(item.level ?? 0);
    if (!Number.isInteger(level) || level < 0 || level > 4) {
      if (item.count > 0) {
        level = Math.min(4, Math.max(1, Math.ceil(item.count / 3)));
      } else {
        level = 0;
      }
    }
    return {
      date: item.date,
      count: Number(item.count ?? 0),
      level,
    };
  });

  return {
    username: data?.username || username,
    year: Number(data?.year || year),
    total: Number(total || 0),
    contributions,
  };
}

export async function fetchGithubContributions(username, year, signal) {
  // 1. Primary: fetch from the Vercel/Vite serverless API endpoint
  try {
    const response = await fetch(
      `/api/github/contributions?username=${encodeURIComponent(username)}&year=${year}`,
      { signal }
    );

    if (response.ok) {
      const data = await response.json();
      if (data && Array.isArray(data.contributions)) {
        return normalizeContributions(data, username, year);
      }
    } else {
      const errBody = await response.json().catch(() => ({}));
      console.warn(`[GitHub Calendar] Server API responded with ${response.status}:`, errBody.error || response.statusText);
    }
  } catch (err) {
    if (err.name === 'AbortError') throw err;
    console.warn('[GitHub Calendar] Server API unreachable, falling back to public endpoint:', err.message);
  }

  // 2. Client-side fallback: direct query to public GitHub contributions API
  // This ensures the graph never breaks even if Vercel serverless function hits a cold-start timeout
  const publicUrl = `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=${year}`;
  const fallbackRes = await fetch(publicUrl, { signal });

  if (!fallbackRes.ok) {
    throw new Error(`GitHub contributions could not be loaded (${fallbackRes.status})`);
  }

  const fallbackData = await fallbackRes.json();
  return normalizeContributions(fallbackData, username, year);
}
