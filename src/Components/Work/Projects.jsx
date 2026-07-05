import ProjectCard from './Projectcard'
import { projects } from '../../constants'

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-12">
      <h2 className="mb-6 text-2xl font-bold text-[var(--text-primary)]">Projects</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  )
}
