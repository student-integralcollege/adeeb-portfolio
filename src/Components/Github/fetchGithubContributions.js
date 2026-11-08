export async function fetchGithubContributions(username, year, signal) {
  const response = await fetch(`/api/github/contributions?username=${encodeURIComponent(username)}&year=${year}`, { signal });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error || `GitHub request failed (${response.status})`);
  return body;
}
