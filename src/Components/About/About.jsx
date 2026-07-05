import profileImg from '../../assets/profile.jpg';

export default function About() {
  const profile = {
    bio: [
      { text: 'I’m a frontend developer who enjoys building thoughtful interfaces that feel as good as they look.', bold: false },
      { text: ' My focus is on clean UI, responsive layouts, and polished user experiences.', bold: true },
    ],
    availability: [
      { text: 'Available for freelance projects, internships, and full-time opportunities.', bold: false },
      { text: ' I’m currently open to new collaborations.', bold: true },
    ],
  };

  return (
    <section id="top" className="mx-auto max-w-6xl px-6 pb-16 pt-16 sm:px-8 lg:px-10 lg:pb-20 lg:pt-20">
      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div className="animate-[fadeUp_0.45s_ease-out_both]">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
              Hi, I&apos;m Adeeb
            </h1>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#22C55E] px-3 py-1.5 text-xs font-semibold text-white shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              Open to Work
            </span>
          </div>

          <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
            {profile.bio.map((chunk, i) => (
              <span key={i} className={chunk.bold ? 'font-semibold text-[var(--text-primary)]' : ''}>
                {chunk.text}
              </span>
            ))}
          </p>

          <p className="mt-3 max-w-2xl text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
            {profile.availability.map((chunk, i) => (
              <span key={i} className={chunk.bold ? 'font-semibold text-[var(--text-primary)]' : ''}>
                {chunk.text}
              </span>
            ))}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="https://drive.google.com/file/d/1HsOHFjzrKDzTEBbDbb-oXuWY9KZMPtBj/view?usp=drivesdk"
              className="inline-flex items-center gap-2 rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 white:bg-dark white:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 3v12" strokeLinecap="round" />
                <path d="m7 8 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5 19h14" strokeLinecap="round" />
              </svg>
              Resume
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 white:bg-dark white:text-white"
            >
              Get in Touch
            </a>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="group relative aspect-square w-full max-w-[320px] overflow-hidden rounded-full border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-2 shadow-[0_20px_50px_var(--shadow-soft)] transition duration-300 hover:scale-[1.03]">
            <img
              src={profileImg}
              alt="Adeeb Hussain"
              className="h-full w-full rounded-full object-cover transition duration-300 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}