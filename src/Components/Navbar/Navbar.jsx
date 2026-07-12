import { Sun, Moon } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

export default function Navbar({ isDark, toggleTheme }) {
  return (
    <nav className="fixed top-6 left-1/2 z-50 w-[60%] max-w-7xl -translate-x-1/2 select-none">
      <div className="flex items-center justify-between rounded-full border border-[var(--border-subtle)] bg-white/90 dark:bg-[#12121a]/90 px-5 py-3 shadow-lg backdrop-blur-xl transition-colors duration-300 sm:px-7">

        {/* Logo */}
        <a
          href="#home"
          className="flex h-10 w-10 items-center justify-center text-xl font-black text-[var(--text-primary)]"
          aria-label="Home"
        >
          AH7
        </a>

        {/* Section Navigation Links */}
        <div className="hidden md:flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)]">
          <a
            href="#about"
            className="rounded-full px-4 py-2.5 transition hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]"
          >
            About
          </a>

          <a
            href="#skills"
            className="rounded-full px-4 py-2.5 transition hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]"
          >
            Skills
          </a>

          <a
            href="#projects"
            className="rounded-full px-4 py-2.5 transition hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]"
          >
            Projects
          </a>

          <a
            href="#github"
            className="rounded-full px-4 py-2.5 transition hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]"
          >
            Activity
          </a>

          <a
            href="#education"
            className="rounded-full px-4 py-2.5 transition hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]"
          >
            Education
          </a>

          <a
            href="#contact"
            className="rounded-full px-4 py-2.5 transition hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]"
          >
            Contact
          </a>
        </div>

        {/* Social Links + Theme */}
        <div className="flex items-center gap-2">
          {/* Divider */}
          <div className="h-6 w-px bg-[var(--border-subtle)]" />

          {/* Theme Switching Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition hover:scale-105 active:scale-95 dark:bg-white dark:text-black"
          >
            {isDark ? (
              <Sun className="h-5 w-5 text-amber-500" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}