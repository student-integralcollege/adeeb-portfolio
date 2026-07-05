import { Home, Sun, Moon } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

export default function Navbar({ isDark, toggleTheme }) {
  return (
    <nav className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <div className="flex items-center rounded-full border border-[var(--border-subtle)] bg-[var(--surface-elevated)]/95 px-3 py-2 shadow-2xl bg-white/90">
        <a
          href="#top"
          className="rounded-full p-3 text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-muted)]"
        >
          <Home size={22} />
        </a>

        <div className="mx-2 h-8 w-px bg-[var(--border-subtle)]" />

        <a
          href="https://github.com/student-integralcollege"
          target="_blank"
          rel="noreferrer"
          className="rounded-full p-3 text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-muted)]"
        >
          <FaGithub size={22} />
        </a>

        <a
          href="https://www.linkedin.com/in/syed-mohd-adeeb-hussain-395670295"
          target="_blank"
          rel="noreferrer"
          className="rounded-full p-3 text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-muted)]"
        >
          <FaLinkedin size={22} />
        </a>

        <a
          href="https://x.com/AdeebHu78527761"
          target="_blank"
          rel="noreferrer"
          className="rounded-full p-3 text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-muted)]"
        >
          <FaXTwitter size={22} />
        </a>

        <div className="mx-2 h-8 w-px bg-[var(--border-subtle)]" />

        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="rounded-full p-3 text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-muted)]"
        >
          {isDark ? <Sun size={22} /> : <Moon size={22} />}
        </button>
      </div>
    </nav>
  );
}