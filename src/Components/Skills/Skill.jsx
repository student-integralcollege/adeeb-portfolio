import { skills } from '../../constants';

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 md:px-8 lg:px-10">
      <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
        <h2 className="text-[clamp(1.875rem,6vw,2.25rem)] font-bold tracking-tight text-[var(--text-primary)]">Skills</h2>

        <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)] sm:text-base sm:leading-8">
          Technologies and tools I use to build fast, scalable, and modern web applications.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
        {skills.map((skill) => (
          <span
            key={skill}
            className="max-w-full rounded-2xl border border-transparent bg-slate-950 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-[0_8px_20px_var(--shadow-soft)] dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 sm:px-5 sm:py-2.5"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
