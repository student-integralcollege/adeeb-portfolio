import ProjectCard from "./Projectcard";
import { projects } from "../../constants";

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 md:px-8 lg:px-10">
      <div className="mx-auto mb-8 max-w-5xl text-center sm:mb-10">
        <h2 className="text-[clamp(1.875rem,6vw,2.25rem)] font-bold tracking-tight text-[var(--text-primary)]">
          Projects
        </h2>
        <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)] sm:text-base sm:leading-8">
          A collection of projects that showcase my skills, creativity, and passion for building modern web applications.
        </p>
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}
