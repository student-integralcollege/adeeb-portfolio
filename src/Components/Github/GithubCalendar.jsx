import { useEffect, useState } from 'react';
import { Calendar, GitPullRequest, RefreshCw } from 'lucide-react';

// Theme-aware tailwind colors for contribution levels (None to High activity)
const LEVEL_COLORS = {
  NONE: 'bg-slate-100 dark:bg-slate-800/40',
  FIRST_QUARTILE: 'bg-emerald-100 dark:bg-emerald-950/40',
  SECOND_QUARTILE: 'bg-emerald-300 dark:bg-emerald-800/60',
  THIRD_QUARTILE: 'bg-emerald-400 dark:bg-emerald-600/70',
  FOURTH_QUARTILE: 'bg-emerald-600 dark:bg-emerald-400',
};

// Generates simple, clean mock data if the API rate limit is hit or if offline
const generateMockCalendar = () => {
  const contributions = [];
  const levelChoices = ['NONE', 'NONE', 'FIRST_QUARTILE', 'SECOND_QUARTILE', 'NONE', 'THIRD_QUARTILE', 'FOURTH_QUARTILE'];
  const countMap = { NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 3, THIRD_QUARTILE: 5, FOURTH_QUARTILE: 8 };

  // Loop through 53 weeks and 7 days to generate a mock contribution calendar grid
  for (let w = 0; w < 53; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      // Pick a level based on simple repeating pattern to make it look realistic
      const level = levelChoices[(w + d) % levelChoices.length];
      week.push({
        date: `Day ${(w * 7) + d + 1}`,
        contributionCount: countMap[level],
        contributionLevel: level,
      });
    }
    contributions.push(week);
  }
  return { contributions, totalContributions: 145 };
};

export default function GithubCalendar() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);

  // Fetch public contributions from the deno server proxy
  const fetchContributions = async () => {
    setLoading(true);
    setIsFallback(false);
    try {
      const response = await fetch('https://github-contributions-api.deno.dev/student-integralcollege.json');
      if (!response.ok) {
        throw new Error('Server response was not OK');
      }
      const result = await response.json();
      
      // Ensure the returned structure has the contribution grid array
      if (result && Array.isArray(result.contributions)) {
        setData(result);
      } else {
        throw new Error('Data format is invalid');
      }
    } catch (error) {
      console.warn('GitHub API failed, loading mock data instead:', error);
      setData(generateMockCalendar());
      setIsFallback(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContributions();
  }, []);

  return (
    <section id="github" className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-10">
      {/* Section Header */}
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
          GitHub Activity
        </h2>
        <p className="mt-3 text-base leading-8 text-[var(--text-secondary)]">
          My open source contributions and commit frequency on GitHub.
        </p>
      </div>

      {/* Main Container Card */}
      <div className="rounded-[2rem] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-6 shadow-[0_12px_30px_var(--shadow-soft)] sm:p-8">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          
          {/* User Profile Info */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
              <Calendar size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-[var(--text-primary)] font-mono">student-integralcollege</h3>
              <p className="text-xs text-[var(--text-secondary)]">
                {loading ? (
                  <span className="inline-block h-3 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                ) : (
                  `${data?.totalContributions || 0} contributions in the last year`
                )}
              </p>
            </div>
          </div>

          {/* Fallback label + Refresh Action button */}
          <div className="flex items-center gap-2">
            {isFallback && (
              <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-medium text-amber-600 dark:text-amber-400">
                Fallback Active
              </span>
            )}
            <button
              onClick={fetchContributions}
              disabled={loading}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-muted)] px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] transition hover:bg-[var(--surface-elevated)] disabled:opacity-50"
            >
              <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>
        </div>

        {/* Scrollable Calendar Grid wrapper */}
        <div className="relative overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-muted)]/50 p-4">
          <div className="overflow-x-auto pb-2 scrollbar-thin">
            <div className="flex min-w-[760px] select-none gap-[3px]">
              
              {loading ? (
                // Show pulsing grey square placeholders while loading
                Array.from({ length: 53 }).map((_, w) => (
                  <div key={w} className="flex flex-col gap-[3px]">
                    {Array.from({ length: 7 }).map((_, d) => (
                      <div
                        key={d}
                        className="h-[10px] w-[10px] animate-pulse rounded-[1px] bg-slate-200 dark:bg-slate-800"
                        style={{
                          animationDelay: `${(w * 7 + d) * 15}ms`,
                          animationDuration: '1.2s',
                        }}
                      />
                    ))}
                  </div>
                ))
              ) : (
                // Render the real or mock contribution squares
                data?.contributions?.map((week, w) => (
                  <div key={w} className="flex flex-col gap-[3px]">
                    {week.map((day, d) => {
                      if (!day) return <div key={d} className="h-[10px] w-[10px] bg-transparent" />;
                      const colorClass = LEVEL_COLORS[day.contributionLevel] || LEVEL_COLORS.NONE;
                      return (
                        <div
                          key={d}
                          title={`${day.contributionCount} contributions on ${day.date}`}
                          className={`h-[10px] w-[10px] rounded-[1px] transition-colors duration-150 hover:ring-1 hover:ring-emerald-500/50 ${colorClass}`}
                        />
                      );
                    })}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Legend / Info Footer */}
        <div className="mt-4 flex items-center justify-between text-xs text-[var(--text-secondary)]">
          <span className="flex items-center gap-1">
            <GitPullRequest size={12} />
            Data sourced from public profile
          </span>
          <div className="flex items-center gap-1.5">
            <span>Less</span>
            <div className="h-2.5 w-2.5 rounded-[1px] bg-slate-100 dark:bg-slate-800/40" />
            <div className="h-2.5 w-2.5 rounded-[1px] bg-emerald-100 dark:bg-emerald-950/40" />
            <div className="h-2.5 w-2.5 rounded-[1px] bg-emerald-300 dark:bg-emerald-800/60" />
            <div className="h-2.5 w-2.5 rounded-[1px] bg-emerald-400 dark:bg-emerald-600/70" />
            <div className="h-2.5 w-2.5 rounded-[1px] bg-emerald-600 dark:bg-emerald-400" />
            <span>More</span>
          </div>
        </div>
      </div>
    </section>
  );
}
