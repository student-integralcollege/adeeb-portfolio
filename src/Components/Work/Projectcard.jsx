import { ExternalLink } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'

export default function ProjectCard({ project }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)] shadow-[0_12px_30px_var(--shadow-soft)] transition-shadow hover:shadow-[0_18px_40px_var(--shadow-soft)]">
      <div className={`flex h-36 items-center justify-center bg-gradient-to-br ${project.gradient || 'from-sky-500 to-blue-500'}`}>
        <span className="text-lg font-semibold tracking-tight text-white/90">{project.title}</span>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-[var(--text-primary)]">{project.title}</h3>
          <div className="flex shrink-0 items-center gap-2 text-[var(--text-secondary)]">
            <a href={project.webapp} target="_blank" rel="noreferrer" aria-label={`${project.title} live site`} className="transition-colors hover:text-[var(--text-primary)]">
              <ExternalLink size={15} />
            </a>
            <a href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.title} source code`} className="transition-colors hover:text-[var(--text-primary)]">
              <FaGithub size={15} />
            </a>
          </div>
        </div>

        <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {(project.tags || []).map((t) => (
            <span key={t} className="rounded-md border border-[var(--border-subtle)] bg-[var(--surface-muted)] px-2 py-1 text-[11px] font-medium text-[var(--text-secondary)]">
              {t}
            </span>
          ))}
        </div>

        {project.status ? (
          <div className="mt-3 flex items-center gap-1.5 text-xs text-success">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            {project.status}
          </div>
        ) : null}
      </div>
    </div>
  )
}