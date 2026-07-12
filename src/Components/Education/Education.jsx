import { education } from '../../constants';

const Education = () => {
  return (
    <section
      id="education"
      className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10 lg:py-24"
    >
      {/* Section Heading */}
      <div className="mb-14 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
          Education
        </h2>
        <div className="mt-4 h-1 w-10 rounded-full bg-[var(--text-primary)]" />
      </div>

      {/* Education Timeline */}
      <div className="relative mx-auto max-w-6xl">

        {/* Vertical Timeline Line */}
        <div className="absolute bottom-3 left-3 top-3 w-[2px] -translate-x-1/2 bg-[var(--border-subtle)]" />
        <div className="space-y-7">
          {education.map((item) => (
            <div key={item.id} className="group relative flex items-center gap-7">
              {/* Timeline Dot */}
              <div className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center">
                <span className="h-4 w-4 rounded-full bg-[var(--text-primary)] ring-4 ring-[var(--surface-base)] transition-transform duration-300 group-hover:scale-125" />
              </div>

              {/* Education Card */}
              <article className="w-full rounded-[24px] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-6 py-7 shadow-[0_10px_35px_var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_var(--shadow-soft)] sm:px-8">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">

                  {/* Left Section */}
                  <div className="flex min-w-0 flex-1 items-start gap-5">

                    {/* Education Logo */}
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-muted)]">
                      <img
                        src={item.img}
                        alt={`${item.school} logo`}
                        className="h-8 w-8 object-contain"
                      />
                    </div>

                    {/* Education Information */}
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xl font-bold leading-snug text-[var(--text-primary)] sm:text-2xl">
                        {item.school}
                      </h3>

                      <p className="mt-1 text-base font-medium text-[var(--text-secondary)]">
                        {item.degree}
                      </p>

                      <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Right Section */}
                  <div className="flex shrink-0 items-center justify-between gap-4 sm:flex-col sm:items-end">
                    {/* Education Date */}
                    <p className="whitespace-nowrap text-sm font-semibold text-[var(--text-primary)]">
                      {item.date}
                    </p>

                    {/* Grade */}
                    <span className="rounded-full bg-[var(--surface-muted)] px-5 py-2 text-sm font-bold text-[var(--text-primary)]">
                      {item.grade}
                    </span>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;