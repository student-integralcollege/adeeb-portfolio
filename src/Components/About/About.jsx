import profileImg from '../../assets/profile.jpg';
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import { MapPin } from 'lucide-react';

export default function About() {
  return (
    <section
      id="about"
      className="mt-14 mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10 lg:py-28"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">

        {/* About Content - Left Side */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            About me
          </h2>

          <div className="mt-4 h-1 w-10 rounded-full bg-[var(--text-primary)]" />

          {/* Location */}
          <div className="mt-7 flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)]">
            <MapPin className="h-4 w-4" />
            <span>Lucknow, Uttar Pradesh, India</span>
            <span className="inline-flex items-center gap-2 border border-emerald-500 rounded-full bg-emerald-100 px-4 py-2 text-xs font-semibold text-black-700 dark:bg-emerald-500/20 dark:text-emerald-300">
              Open to Work
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            </span>
          </div>

          {/* About Description */}
          <div className="mt-6 max-w-2xl space-y-5">
            <p className="text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
              I'm {' '}
              <span className="font-semibold text-[var(--text-primary)]">
                Adeeb Hussain
              </span>{' '}
              a Full Stack Developer passionate about building modern, scalable, and user-friendly web
              applications.
            </p>

            <p className="text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
              I enjoy working with the{' '}
              <span className="font-semibold text-[var(--text-primary)]">
                MERN Stack
              </span>{' '}
              and creating clean interfaces, powerful backend systems, and
              real-world SaaS applications.
            </p>

            <p className="text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
              Currently, I'm focused on improving my development skills,
              contributing to open source, and building projects that solve
              real-world problems.
            </p>
          </div>

          {/* Social Links */}
          <div className="mt-8 flex flex-wrap items-center gap-3">

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
        <div className="flex justify-center lg:justify-end">
          <div className="group relative h-[320px] w-[320px] shrink-0 overflow-hidden rounded-full border border-[var(--border-subtle)] bg-[var(--surface-elevated)] shadow-[0_20px_50px_var(--shadow-soft)] sm:h-[380px] sm:w-[380px]">
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