import { education } from '../../constants';

const Education = () => {
  return (
    <section
      id="education"
      className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-24"
    >
      {/* Section Heading */}
      <div className="mb-8 flex flex-col items-center justify-center sm:mb-10 lg:mb-14">
        <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
          Education
        </h2>
        <div className="mt-4 h-1 w-10 rounded-full bg-[var(--text-primary)]" />
      </div>

      {/* Education Timeline */}
      <div className="relative mx-auto max-w-6xl">

        {/* Vertical Timeline Line */}
        <div className="absolute bottom-3 left-2.5 top-3 w-[2px] -translate-x-1/2 bg-[var(--border-subtle)] sm:left-3" />
        <div className="space-y-4 sm:space-y-6 lg:space-y-7">
          {education.map((item) => (
            <div key={item.id} className="group relative flex items-start gap-4 sm:gap-7">
              {/* Timeline Dot */}
              <div className="relative z-10 flex h-5 w-5 shrink-0 items-center justify-center sm:h-6 sm:w-6">
                <span className="h-4 w-4 rounded-full bg-[var(--text-primary)] ring-4 ring-[var(--surface-base)] transition-transform duration-300 group-hover:scale-125" />
              </div>

              {/* Education Card */}
              <article className="min-w-0 w-full rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-4 py-4 shadow-[0_10px_35px_var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_var(--shadow-soft)] sm:rounded-[24px] sm:px-6 sm:py-6 lg:px-8 lg:py-7">
                <div className="flex min-w-0 flex-col gap-4 sm:gap-6 lg:flex-row lg:items-start lg:justify-between">

                  {/* Left Section */}
                  <div className="flex min-w-0 flex-1 items-start gap-3 sm:gap-5">

                    {/* Education Logo */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-muted)] sm:h-16 sm:w-16 sm:rounded-2xl">
                      <img
                        src={item.img}
                        alt={`${item.school} logo`}
                        className="h-7 w-7 object-contain sm:h-8 sm:w-8"
                      />
                    </div>

                    {/* Education Information */}
                    <div className="min-w-0 flex-1">
                      <h3 className="break-words text-lg font-bold leading-snug text-[var(--text-primary)] sm:text-xl lg:text-2xl">
                        {item.school}
                      </h3>

                      <p className="mt-1 break-words text-sm font-medium leading-6 text-[var(--text-secondary)] sm:text-base">
                        {item.degree}
                      </p>

                      <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--text-secondary)] sm:mt-4 sm:text-base sm:leading-7">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Right Section */}
                  <div className="flex shrink-0 items-center justify-between gap-3 border-t border-[var(--border-subtle)] pt-3 sm:gap-4 sm:border-t-0 sm:pt-0 lg:flex-col lg:items-end">
                    {/* Education Date */}
                    <p className="whitespace-nowrap text-sm font-semibold text-[var(--text-primary)]">
                      {item.date}
                    </p>

                    {/* Grade */}
                    <span className="rounded-full bg-[var(--surface-muted)] px-3 py-1.5 text-xs font-bold text-[var(--text-primary)] sm:px-5 sm:py-2 sm:text-sm">
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