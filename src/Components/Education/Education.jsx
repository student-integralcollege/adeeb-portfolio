import { education } from '../../constants';

const Education = () => {
  return (
    <section id="education" className="mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:px-10 lg:py-24">
      <div className="mb-10 flex justify-center">
        <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
          Education
        </h2>
      </div>

      <div className="relative mx-auto max-w-4xl">
        <div className="absolute bottom-0 left-[0.9rem] top-0 w-px bg-[var(--border-subtle)]" />

        <div className="space-y-6">
          {education.map((item, index) => {
            const isHighlighted = index < 2;

            return (
              <div key={item.id} className="group relative flex items-start gap-4 md:gap-6">
                <div className="relative z-10 mt-7 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--surface-elevated)] bg-[var(--surface-elevated)] md:mt-8">
                  <span
                    className={`h-3.5 w-3.5 rounded-full transition-transform duration-300 group-hover:scale-110 ${isHighlighted ? 'bg-[#22C55E]' : 'bg-[var(--text-secondary)]'}`}
                  />
                </div>

                <article className="w-full rounded-[20px] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-5 shadow-[0_12px_30px_var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_var(--shadow-soft)] sm:p-6 md:p-7">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex min-w-0 flex-1 items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--surface-muted)]">
                        <img src={item.img} alt={`${item.school} logo`} className="h-8 w-8 object-contain" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="mb-3 flex flex-wrap items-center gap-3">
                          <span className="rounded-full bg-violet-500/10 px-3 py-1 text-sm font-semibold text-violet-600 dark:text-violet-300">
                            {item.grade}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-secondary)]">
                              {index === 0 ? 'Schooling' : 'University'}
                            </p>
                            <h3 className="mt-1 text-lg font-semibold leading-snug text-[var(--text-primary)] sm:text-xl">
                              {item.school}
                            </h3>
                          </div>
                          <div className="shrink-0 text-sm font-semibold text-[var(--text-primary)] sm:pt-1">
                            {item.date}
                          </div>
                        </div>

                        <p className="mt-2 text-sm font-medium text-[var(--text-secondary)]">{item.degree}</p>
                        <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Education;