import { skills } from '../../constants';

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-10">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">Skills</h2>

        <p className="mt-3 text-base leading-8 text-[var(--text-secondary)]">
          Technologies and tools I use to build fast, scalable, and modern web applications.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-2xl border border-transparent bg-slate-950 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 hover:shadow-[0_8px_20px_var(--shadow-soft)]"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}