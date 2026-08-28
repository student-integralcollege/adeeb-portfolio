import { Sun, Moon, Menu, X } from "lucide-react";

import { useState } from 'react';

export default function Navbar({ isDark, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed left-1/2 top-3 z-50 w-[min(calc(100%_-_1rem),72rem)] -translate-x-1/2 select-none sm:top-5 sm:w-[min(calc(100%_-_2rem),72rem)] lg:w-[min(92%,72rem)] xl:w-[min(84%,72rem)]">
      <div className="relative flex items-center justify-between rounded-full border border-[var(--border-subtle)] bg-white/90 px-3 py-2.5 shadow-lg backdrop-blur-xl transition-colors duration-300 dark:bg-[#12121a]/90 sm:px-5 sm:py-3 lg:px-7">
        {/* Logo */}
        <a
          href="#home"
          className="flex h-10 w-12 shrink-0 items-center justify-center text-lg font-black text-[var(--text-primary)] sm:text-xl"
          aria-label="Home"
        >
          AH7
        </a>

        {/* Section Navigation Links */}
        <div className="hidden items-center gap-1 text-sm font-medium text-[var(--text-secondary)] lg:flex xl:gap-2">
          <a
            href="#about"
            className="rounded-full px-3 py-2.5 transition hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)] xl:px-4"
          >
            About
          </a>

          <a
            href="#skills"
            className="rounded-full px-3 py-2.5 transition hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)] xl:px-4"
          >
            Skills
          </a>

          <a
            href="#projects"
            className="rounded-full px-3 py-2.5 transition hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)] xl:px-4"
          >
            Projects
          </a>

          <a
            href="#github"
            className="rounded-full px-3 py-2.5 transition hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)] xl:px-4"
          >
            Activity
          </a>

          <a
            href="#education"
            className="rounded-full px-3 py-2.5 transition hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)] xl:px-4"
          >
            Education
          </a>

          <a
            href="#contact"
            className="rounded-full px-3 py-2.5 transition hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)] xl:px-4"
          >
            Contact
          </a>
        </div>

        {/* Mobile menu button + Social Links + Theme */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMenuOpen((s) => !s)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-sm transition hover:bg-[var(--surface-muted)] lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
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
        {/* Mobile menu panel */}
        {menuOpen && (
          <div className="absolute left-1/2 top-full z-40 mt-3 max-h-[calc(100vh-5.5rem)] w-full -translate-x-1/2 overflow-y-auto rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-3 shadow-md lg:hidden sm:p-4">
            <div className="flex flex-col gap-2 text-sm text-[var(--text-secondary)]">
              <a href="#about" onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-2.5 transition hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]">About</a>
              <a href="#skills" onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-2.5 transition hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]">Skills</a>
              <a href="#projects" onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-2.5 transition hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]">Projects</a>
              <a href="#github" onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-2.5 transition hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]">Activity</a>
              <a href="#education" onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-2.5 transition hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]">Education</a>
              <a href="#contact" onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-2.5 transition hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]">Contact</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
