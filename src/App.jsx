import { useEffect, useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import Hero from './Components/About/About'
import Projects from './Components/Work/Projects'
import Skills from './Components/Skills/Skill'
import Contact from './Components/Contact/Contact'
import Education from './Components/Education/Education'

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false

    const storedTheme = window.localStorage.getItem('theme')
    if (storedTheme === 'dark') return true
    if (storedTheme === 'light') return false

    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light'
    window.localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const toggleTheme = () => setIsDark((d) => !d)

  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--text-primary)] transition-colors duration-300">
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
    </div>
  )
}