import profileImg from '../../assets/profile.jpg';
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import { MapPin } from 'lucide-react';

export default function About() {
  return (
    <section
      id="about"
      className="mx-auto mt-16 max-w-7xl px-4 py-10 sm:mt-20 sm:px-6 sm:py-16 md:px-8 lg:px-10 lg:py-28">
      <div className="grid min-w-0 items-center gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] lg:gap-16 xl:gap-20">

        {/* About Content - Left Side */}
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            About me
          </h2>

          <div className="mx-auto mt-4 h-1 w-10 rounded-full bg-[var(--text-primary)] lg:mx-0" />

          {/* Location */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-[var(--text-secondary)] lg:justify-start">
            <MapPin className="h-4 w-4 shrink-0" />
            <span>Lucknow, Uttar Pradesh, India</span>
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500 bg-emerald-100 px-2 py-0.5 text-[9px] font-semibold text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 sm:gap-1.5 sm:px-3 sm:py-1 sm:text-[10px]">
              Open to Work
              <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-500 sm:h-1.5 sm:w-1.5" />
            </span>
          </div>

          {/* About Description */}
          <div className="mx-auto mt-5 max-w-2xl space-y-3.5 sm:mt-6 sm:space-y-5 lg:mx-0">
            <p className="text-[clamp(0.95rem,2.5vw,1.125rem)] leading-7 text-[var(--text-secondary)] sm:leading-8">
              I'm {' '}
              <span className="font-semibold text-[var(--text-primary)]">
                Adeeb Hussain
              </span>{' '}
              a Full Stack Developer passionate about building modern, scalable, and user-friendly web
              applications.
            </p>

            <p className="text-[clamp(0.95rem,2.5vw,1.125rem)] leading-7 text-[var(--text-secondary)] sm:leading-8">
              I enjoy working with the{' '}
              <span className="font-semibold text-[var(--text-primary)]">
                MERN Stack
              </span>{' '}
              and creating clean interfaces, powerful backend systems, and
              real-world SaaS applications.
            </p>

            <p className="text-[clamp(0.95rem,2.5vw,1.125rem)] leading-7 text-[var(--text-secondary)] sm:leading-8">
              Currently, I'm focused on improving my development skills,
              contributing to open source, and building projects that solve
              real-world problems.
            </p>
          </div>

          {/* Social Links */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">

            {/* GitHub */}
            <a
              href="https://github.com/student-integralcollege"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:scale-105 dark:bg-white dark:text-black"
            >
              <FaGithub className="h-5 w-5" />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/syed-mohd-adeeb-hussain-395670295"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:scale-105 dark:bg-white dark:text-black"
            >
              <FaLinkedin className="h-5 w-5" />
            </a>

            {/* Twitter */}
            <a
              href="https://x.com/AdeebHu78527761"
              target="_blank"
              rel="noreferrer"
              aria-label="X Profile"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:scale-105 dark:bg-white dark:text-black"
            >
              <FaXTwitter className="h-5 w-5" />
            </a>

          </div>
        </div>

        {/* Profile Image - Right Side */}
        <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
          <div className="group relative aspect-square w-[min(64vw,220px)] shrink-0 overflow-hidden rounded-full border border-[var(--border-subtle)] bg-[var(--surface-elevated)] shadow-[0_20px_50px_var(--shadow-soft)] sm:w-[min(52vw,380px)]">
            <img
              src={profileImg}
              alt="Adeeb Hussain"
              className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
