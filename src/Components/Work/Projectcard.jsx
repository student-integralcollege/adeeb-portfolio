import { ExternalLink } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'

export default function ProjectCard({ project }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)] shadow-[0_12px_30px_var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_var(--shadow-soft)]">
      {/* Project Image Header */}
      <div className="relative aspect-video w-full overflow-hidden bg-[var(--surface-muted)] border-b border-[var(--border-subtle)]">
        {!project.image ? (
          <div className="flex h-full w-full items-center justify-center p-4">
            <svg viewBox="0 0 100 100" className="h-16 w-16 text-[var(--text-secondary)] opacity-30" fill="none" stroke="currentColor">
              <rect x="15" y="25" width="70" height="50" rx="6" strokeWidth="2" />
              <path d="M15 65l20-15 15 12 20-22 15 15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="35" cy="40" r="4" fill="currentColor" />
            </svg>
          </div>
        ) : (
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
        )}
      </div>

      {/* Project Info & CTAs */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-lg font-bold text-[var(--text-primary)] transition-colors">
              {project.title}
            </h3>
            {project.status && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                <span className="h-1 w-1 rounded-full bg-emerald-500" />
                {project.status}
              </span>
            )}
          </div>

          <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-[var(--text-secondary)] min-h-[60px]">
            {project.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {(project.tags || []).map((t) => (
              <span
                key={t}
                className="rounded-lg border border-[var(--border-subtle)] px-2.5 py-1 text-[11px] font-medium dark:bg-slate-100 dark:text-slate-900 transition duration-300 bg-slate-900 text-white"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons at Bottom */}
        <div className="mt-6 flex items-center gap-3 border-t border-[var(--border-subtle)] pt-4">
          <a
            href={project.webapp}
            target="_blank"
            rel="noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition dark:bg-slate-100 dark:text-slate-900 "
          >
            <ExternalLink size={13} />
            Live Demo
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition dark:bg-slate-100 dark:text-slate-900 "
          >
            <FaGithub size={13} />
            Source Code
          </a>
        </div>
      </div>
    </div>
  )
}