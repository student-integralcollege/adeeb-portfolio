import { skills } from '../../constants';

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold text-[var(--text-primary)]">Skills</h2>

        <p className="mt-3 text-[var(--text-secondary)]">
          Technologies and tools I use to build fast, scalable, and modern web applications.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-transparent bg-[var(--skill-pill-bg)] px-5 py-2.5 text-sm font-medium text-[var(--skill-pill-text)] shadow-sm transition-all duration-100 hover:-translate-y-1 hover:shadow-md"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}