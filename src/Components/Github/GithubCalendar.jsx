import { useEffect, useState } from 'react';
import { Calendar, GitPullRequest, RefreshCw } from 'lucide-react';

export default function GithubActivity() {
  const [Cal, setCal] = useState(null);

  useEffect(() => {
    let mounted = true;
    import('react-github-calendar')
      .then((m) => {
        let Comp = m && (m.default || m);
        if (Comp && typeof Comp === 'object') {
          if (Comp.GitHubCalendar) Comp = Comp.GitHubCalendar;
          else if (Comp.ReactGitHubCalendar) Comp = Comp.ReactGitHubCalendar;
          else if (Comp.default) Comp = Comp.default;
        }

        const isValid = typeof Comp === 'function' || (typeof Comp === 'object' && Comp !== null);
        if (!isValid) {
          console.error('react-github-calendar import did not return a valid component', m);
          return;
        }
        if (mounted) setCal(() => Comp);
      })
      .catch((err) => {
        console.error('Failed to load react-github-calendar', err);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section id="github" className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-14 md:px-8 lg:px-10">
      <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
        <h2 className="text-[clamp(1.875rem,6vw,2.25rem)] font-bold tracking-tight text-[var(--text-primary)]">
          GitHub Activity
        </h2>
        <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)] sm:text-base sm:leading-8">
          My open source contributions and commit frequency on GitHub.
        </p>
      </div>

      <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-4 shadow-[0_12px_30px_var(--shadow-soft)] sm:p-5 lg:p-6">
        <div className="mb-4 flex items-center gap-3 sm:mb-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
              <Calendar size={20} />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="break-words font-mono font-semibold text-[var(--text-primary)]">student-integralcollege</h3>
                <button
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-muted)] px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] transition hover:bg-[var(--surface-elevated)]"
                >
                  <RefreshCw size={12} />
                  Refresh
                </button>
              </div>
              <p className="text-xs text-[var(--text-secondary)]">Public contributions</p>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-muted)]/50 p-2 sm:p-4">
          <div className="overflow-x-auto pb-2 scrollbar-thin">
            <div className="min-w-[720px]">
              {Cal ? (
                <Cal
                  username="student-integralcollege"
                  colorScheme="light"
                  blockSize={12}
                  blockMargin={4}
                  fontSize={14}
                />
              ) : (
                <div className="h-40 flex items-center justify-center text-sm text-[var(--text-secondary)]">Loading calendar…</div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 text-xs text-[var(--text-secondary)] sm:flex-row sm:items-center sm:justify-between">
          <span className="flex items-center gap-1">
            <GitPullRequest size={12} />
            Data sourced from public profile
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            <span>Less</span>
            <div className="h-2.5 w-2.5 rounded-[1px] bg-slate-100 dark:bg-slate-800/40" />
            <div className="h-2.5 w-2.5 rounded-[1px] bg-emerald-100 dark:bg-emerald-700/40" />
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
