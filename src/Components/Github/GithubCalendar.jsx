import { useCallback, useEffect, useMemo, useState } from 'react';
import { Calendar, GitPullRequest, RefreshCw, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchGithubContributions } from './fetchGithubContributions';

const GITHUB_USERNAME = 'student-integralcollege';
const today = new Date();
const currentYear = today.getFullYear();
const palette = { light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'], dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'] };
const dateLabel = (iso) => new Date(`${iso}T12:00:00`).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

export default function GithubActivity() {
  const [year, setYear] = useState(currentYear);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [scheme, setScheme] = useState('light');

  const load = useCallback((signal) => {
    setLoading(true); setError('');
    fetchGithubContributions(GITHUB_USERNAME, year, signal).then((value) => { if (!signal.aborted) setData(value); })
      .catch((err) => { if (err.name !== 'AbortError') setError(err.message); })
      .finally(() => { if (!signal.aborted) setLoading(false); });
  }, [year]);

  useEffect(() => { const controller = new AbortController(); load(controller.signal); return () => controller.abort(); }, [load]);
  useEffect(() => {
    const update = () => setScheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    update(); const observer = new MutationObserver(update); observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] }); return () => observer.disconnect();
  }, []);

  const days = useMemo(() => data?.contributions || [], [data]);
  const stats = useMemo(() => {
    let streak = 0, longest = 0, previous = null;
    for (const day of days) {
      if (day.count > 0) { streak = previous && (new Date(`${day.date}T12:00:00`) - new Date(`${previous}T12:00:00`)) === 86400000 ? streak + 1 : 1; longest = Math.max(longest, streak); previous = day.date; }
      else streak = 0;
    }
    const todayDay = days.find((d) => d.date === today.toISOString().slice(0, 10));
    const currentStreak = todayDay?.count ? streak : previous && (today - new Date(`${previous}T12:00:00`)) / 86400000 <= 1 ? streak : 0;
    return { total: data?.total ?? 0, longest, currentStreak };
  }, [days, data]);

  // GraphQL returns calendar weeks with leading/trailing days; preserve the official week columns.
  const weeks = useMemo(() => { const groups = []; for (let i = 0; i < days.length; i += 7) groups.push(days.slice(i, i + 7)); return groups; }, [days]);

  return <section id="github" className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10 md:px-8 lg:px-10">
    <div className="mx-auto mb-5 max-w-3xl text-center sm:mb-6"><h2 className="text-[clamp(1.875rem,6vw,2.25rem)] font-bold tracking-tight text-[var(--text-primary)]">GitHub Activity</h2><p className="mt-2 text-sm leading-6 text-[var(--text-secondary)] sm:text-base">My open source contributions and commit frequency on GitHub.</p></div>
    <div className="mx-auto max-w-4xl rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-3 shadow-[0_12px_30px_var(--shadow-soft)] sm:p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500"><Calendar size={20}/></div><h3 className="font-mono font-semibold text-[var(--text-primary)]">{GITHUB_USERNAME}</h3></div>
        <div className="flex items-center gap-2"><button aria-label="Previous year" disabled={year <= 2008} onClick={() => setYear((value) => value - 1)} className="rounded-lg border border-[var(--border-subtle)] p-2 text-[var(--text-secondary)] disabled:opacity-40"><ChevronLeft size={16}/></button><span className="min-w-12 text-center text-sm font-semibold text-[var(--text-primary)]">{year}</span><button aria-label="Next year" disabled={year >= currentYear} onClick={() => setYear((value) => value + 1)} className="rounded-lg border border-[var(--border-subtle)] p-2 text-[var(--text-secondary)] disabled:opacity-40"><ChevronRight size={16}/></button><button aria-label="Refresh contributions" onClick={() => load(new AbortController().signal)} disabled={loading} className="rounded-lg border border-[var(--border-subtle)] p-2 text-emerald-500 disabled:opacity-50"><RefreshCw size={15} className={loading ? 'animate-spin' : ''}/></button></div></div>
      <div className="mb-3 grid grid-cols-3 gap-2 sm:gap-3">{[['This year', year === currentYear ? stats.total : '—'], ['Current streak', year === currentYear ? `${stats.currentStreak} days` : '—'], ['Longest streak', `${stats.longest} days`]].map(([label, value]) => <div key={label} className="rounded-xl bg-[var(--surface-muted)]/60 px-2 py-2.5 text-center"><div className="text-lg font-bold text-[var(--text-primary)]">{value}</div><div className="text-[11px] text-[var(--text-secondary)] sm:text-xs">{label}</div></div>)}</div>
      <div className="overflow-x-auto rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-muted)]/50 p-2 sm:p-3"><div className="min-w-[690px]">
        {error ? <div className="flex min-h-36 flex-col items-center justify-center gap-2 px-3 text-center text-sm text-[var(--text-secondary)]"><AlertCircle size={20} className="text-red-400"/><span>Unable to load contribution data.</span><span className="max-w-xl text-xs">{error}</span><button onClick={() => load(new AbortController().signal)} className="rounded-md border border-[var(--border-subtle)] px-3 py-1 text-xs">Try again</button></div> : loading && !data ? <div className="flex h-36 items-center justify-center text-sm text-[var(--text-secondary)]">Loading GitHub contributions…</div> : <><div className="mb-2 text-sm font-medium text-[var(--text-primary)]">{stats.total.toLocaleString()} contributions in {year}</div><div className="flex gap-[3px]" role="grid" aria-label={`${year} GitHub contributions`}>
          {weeks.map((week, wi) => <div className="flex flex-col gap-[3px]" role="rowgroup" key={`${year}-${wi}`}>{week.map((day) => <div key={day.date} role="gridcell" title={`${day.count} contribution${day.count === 1 ? '' : 's'} on ${dateLabel(day.date)}`} aria-label={`${day.count} contributions on ${dateLabel(day.date)}`} className="h-[11px] w-[11px] rounded-[2px] outline-none focus:ring-2 focus:ring-emerald-500" style={{ backgroundColor: palette[scheme][day.level] }} />)}</div>)}
        </div></>}
      </div></div>
      <div className="mt-3 flex flex-col gap-2 text-xs text-[var(--text-secondary)] sm:flex-row sm:items-center sm:justify-between"><span className="flex items-center gap-1"><GitPullRequest size={12}/> GitHub contribution calendar</span><div className="flex items-center gap-1.5"><span>Less</span>{palette[scheme].map((color) => <span key={color} className="h-2.5 w-2.5 rounded-[2px]" style={{ backgroundColor: color }}/ >)}<span>More</span></div></div>
    </div>
  </section>;
}
