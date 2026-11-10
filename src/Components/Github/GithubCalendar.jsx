import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Calendar,
  GitPullRequest,
  RefreshCw,
  AlertCircle,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const GITHUB_USERNAME = 'student-integralcollege';

// GitHub intensity color levels
const PALETTE = {
  light: [
    '#ebedf0', // Level 0: No contributions
    '#9be9a8', // Level 1: Low contributions
    '#40c463', // Level 2: Medium-low contributions
    '#30a14e', // Level 3: Medium-high contributions
    '#216e39', // Level 4: High contributions
  ],
  dark: [
    '#161b22', // Level 0: No contributions
    '#0e4429', // Level 1: Low contributions
    '#006d32', // Level 2: Medium-low contributions
    '#26a641', // Level 3: Medium-high contributions
    '#39d353', // Level 4: High contributions
  ],
};

const CELL_SIZE = 11;
const CELL_GAP = 3;
const STEP = CELL_SIZE + CELL_GAP; // 14px
const TOTAL_WEEKS = 53;
const TOTAL_ROWS = 7;
const SVG_WIDTH = TOTAL_WEEKS * STEP; // 742px
const SVG_HEIGHT = TOTAL_ROWS * STEP; // 98px

function buildCalendarGrid(contributions) {
  if (!contributions || contributions.length === 0) {
    return [];
  }

  const sorted = [...contributions].sort((a, b) => a.date.localeCompare(b.date));

  // Determine weekday offset for the first contribution day (0 = Sun, 1 = Mon, ..., 6 = Sat)
  const [y1, m1, d1] = sorted[0].date.split('-').map(Number);
  const firstDayOfWeek = new Date(y1, m1 - 1, d1).getDay();

  const weeks = [];
  let currentWeek = [];

  // Pad days before the first day of the year with null
  for (let i = 0; i < firstDayOfWeek; i++) {
    currentWeek.push(null);
  }

  for (const day of sorted) {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  // Pad remaining days of the last week with null
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    weeks.push(currentWeek);
  }

  return weeks;
}

export default function GithubActivity() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [scheme, setScheme] = useState('light');
  const [availableYears, setAvailableYears] = useState([currentYear]);

  const cacheRef = useRef(new Map());

  // Synchronize with document dark mode
  useEffect(() => {
    const update = () => setScheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const loadContributions = useCallback(
    async (targetYear, signal) => {
      if (cacheRef.current.has(targetYear)) {
        setContributions(cacheRef.current.get(targetYear));
        setLoading(false);
        setError('');
        return;
      }

      setLoading(true);
      setError('');

      try {
        const url = `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(GITHUB_USERNAME)}?y=${targetYear}`;
        const res = await fetch(url, { signal });

        if (!res.ok) {
          throw new Error(`Public contribution service returned HTTP ${res.status}`);
        }

        const payload = await res.json();

        if (payload.total && typeof payload.total === 'object') {
          const years = Object.keys(payload.total)
            .filter((k) => /^\d{4}$/.test(k))
            .map(Number)
            .sort((a, b) => b - a);
          if (years.length > 0) {
            setAvailableYears(years);
          }
        }

        const items = Array.isArray(payload.contributions)
          ? payload.contributions.map((c) => ({
              date: c.date,
              level: Math.max(0, Math.min(4, Number(c.level ?? (c.count > 0 ? 1 : 0)))),
            }))
          : [];

        cacheRef.current.set(targetYear, items);
        if (!signal.aborted) {
          setContributions(items);
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.warn('[GitHub Contributions Error]', err.message);
          setError(err.message || 'Unable to load contribution data.');
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    },
    []
  );

  useEffect(() => {
    const controller = new AbortController();
    loadContributions(year, controller.signal);
    return () => controller.abort();
  }, [year, loadContributions]);

  const weeks = useMemo(() => buildCalendarGrid(contributions), [contributions]);

  const minYear = availableYears.length > 0 ? Math.min(...availableYears) : 2020;
  const maxYear = availableYears.length > 0 ? Math.max(...availableYears) : currentYear;

  return (
    <section id="github" className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10 md:px-8 lg:px-10">
      {/* Section Header */}
      <div className="mx-auto mb-5 max-w-3xl text-center sm:mb-6">
        <h2 className="text-[clamp(1.875rem,6vw,2.25rem)] font-bold tracking-tight text-[var(--text-primary)]">
          GitHub Activity
        </h2>
        <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)] sm:text-base">
          My open source contributions and commit frequency on GitHub.
        </p>
      </div>

      {/* Main Container Card */}
      <div className="mx-auto max-w-4xl rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-4 shadow-[0_12px_30px_var(--shadow-soft)] sm:p-5 lg:p-6">
        {/* Card Header: Profile info & Year navigation */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
              <Calendar size={20} />
            </div>
            <div>
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono font-semibold text-[var(--text-primary)] hover:text-emerald-500 transition-colors inline-flex items-center gap-1.5"
                title="View GitHub profile"
              >
                {GITHUB_USERNAME}
                <ExternalLink size={13} className="opacity-70" />
              </a>
              <p className="text-xs text-[var(--text-secondary)]">Public contribution graph</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              aria-label="Previous year"
              disabled={year <= minYear || loading}
              onClick={() => setYear((y) => y - 1)}
              className="rounded-lg border border-[var(--border-subtle)] p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-muted)] transition disabled:opacity-40"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="min-w-14 text-center text-sm font-semibold text-[var(--text-primary)]">
              {year}
            </span>
            <button
              aria-label="Next year"
              disabled={year >= maxYear || loading}
              onClick={() => setYear((y) => y + 1)}
              className="rounded-lg border border-[var(--border-subtle)] p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-muted)] transition disabled:opacity-40"
            >
              <ChevronRight size={16} />
            </button>
            <button
              aria-label="Refresh contributions"
              onClick={() => {
                cacheRef.current.delete(year);
                const controller = new AbortController();
                loadContributions(year, controller.signal);
              }}
              disabled={loading}
              className="rounded-lg border border-[var(--border-subtle)] p-2 text-emerald-500 hover:bg-[var(--surface-muted)] transition disabled:opacity-50"
            >
              <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        {/* Calendar Viewport with Horizontal Scroll */}
        <div className="overflow-x-auto rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-muted)]/50 p-3 sm:p-4">
          <div className="min-w-[742px] flex items-center justify-center py-2">
            {/* Loading Indicator */}
            {loading && contributions.length === 0 && (
              <div className="flex h-24 items-center justify-center gap-2 text-sm text-[var(--text-secondary)]">
                <RefreshCw size={18} className="animate-spin text-emerald-500" />
                <span>Loading GitHub contributions…</span>
              </div>
            )}

            {/* Error Message */}
            {error && contributions.length === 0 && (
              <div className="flex min-h-24 flex-col items-center justify-center gap-2 px-3 text-center text-sm text-[var(--text-secondary)]">
                <AlertCircle size={22} className="text-amber-500" />
                <span className="font-medium text-[var(--text-primary)]">Unable to load contribution data</span>
                <span className="max-w-md text-xs text-[var(--text-secondary)]">{error}</span>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => {
                      const controller = new AbortController();
                      loadContributions(year, controller.signal);
                    }}
                    className="rounded-md border border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-3 py-1 text-xs font-medium text-[var(--text-primary)] hover:bg-[var(--surface-muted)] transition"
                  >
                    Try again
                  </button>
                  <a
                    href={`https://github.com/${GITHUB_USERNAME}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-md bg-emerald-600 px-3 py-1 text-xs font-medium text-white hover:bg-emerald-500 transition"
                  >
                    <span>View on GitHub</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            )}

            {/* Clean SVG Contribution Grid */}
            {contributions.length > 0 && (
              <svg
                width={SVG_WIDTH}
                height={SVG_HEIGHT}
                viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
                className="overflow-visible select-none"
                role="img"
                aria-label={`GitHub contribution calendar for ${year}`}
              >
                {weeks.map((week, colIndex) => (
                  <g key={colIndex} transform={`translate(${colIndex * STEP}, 0)`}>
                    {week.map((day, rowIndex) => {
                      if (!day) return null;
                      const cellY = rowIndex * STEP;
                      const fillColor = PALETTE[scheme][day.level] || PALETTE[scheme][0];
                      const strokeColor =
                        scheme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(27, 31, 35, 0.06)';

                      return (
                        <rect
                          key={day.date}
                          x="0"
                          y={cellY}
                          width={CELL_SIZE}
                          height={CELL_SIZE}
                          rx="2"
                          ry="2"
                          fill={fillColor}
                          stroke={strokeColor}
                          strokeWidth="1"
                        />
                      );
                    })}
                  </g>
                ))}
              </svg>
            )}
          </div>
        </div>

        {/* Card Footer: Attribution & Intensity Legend */}
        <div className="mt-4 flex flex-col gap-2 text-xs text-[var(--text-secondary)] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-1.5">
            <GitPullRequest size={13} />
            <span>GitHub public profile activity</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px]">Less</span>
            <div className="flex items-center gap-[3px]" aria-hidden="true">
              {PALETTE[scheme].map((color, idx) => (
                <div
                  key={idx}
                  className="h-[11px] w-[11px] rounded-[2px]"
                  style={{
                    backgroundColor: color,
                    border:
                      scheme === 'dark' ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(27, 31, 35, 0.06)',
                  }}
                />
              ))}
            </div>
            <span className="text-[11px]">More</span>
          </div>
        </div>
      </div>
    </section>
  );
}
