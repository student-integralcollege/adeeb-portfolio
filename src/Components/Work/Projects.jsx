import ProjectCard from "./Projectcard";
import { projects } from "../../constants";

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-10">
      <div className="mx-auto mb-10 max-w-5xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
          Projects
        </h2>
        <p className="mt-3 text-base leading-8 text-[var(--text-secondary)]">
          A collection of projects that showcase my skills, creativity, and passion for building modern web applications.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}
