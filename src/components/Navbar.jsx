import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Leaf, Phone } from 'lucide-react'
import { handleSectionNavClick } from '../utils/scrollToSection'
import ThemeToggle from './ThemeToggle'

const links = [
  { href: '#problema',  label: 'O Problema' },
  { href: '#coleta',    label: 'Coleta' },
  { href: '#ecopontos', label: 'Ecopontos' },
  { href: '#impactos',  label: 'Impactos' },
  { href: '#galeria',   label: 'Galeria' },
  { href: '#mapa',      label: 'Mapa' },
  { href: '#solucoes',  label: 'Soluções' },
  { href: '#direitos',  label: 'Direitos' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [active, setActive]       = useState('')
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = links.map(l => l.href.slice(1))
    const observers = ids.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  const onNavClick = (e, href, { closeMenu = false } = {}) => {
    handleSectionNavClick(e, href, {
      closeMenu: closeMenu ? () => setMenuOpen(false) : undefined,
    })
  }

  const navSurface = scrolled
    ? 'bg-white/90 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 shadow-lg dark:shadow-2xl'
    : 'bg-white/80 dark:bg-slate-950/75 backdrop-blur-md border border-slate-200/60 dark:border-white/6'

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-4 left-4 right-4 z-50 transition-all duration-300 ${
        menuOpen ? 'rounded-t-2xl' : 'rounded-2xl'
      } ${navSurface}`}
    >
      <div className="px-4 sm:px-6 h-14 flex items-center justify-between gap-2">
        <a
          href="#inicio"
          onClick={(e) => onNavClick(e, '#inicio')}
          className="flex items-center gap-2 group min-w-0"
        >
          <div className="w-8 h-8 rounded-lg bg-cyan-500/15 dark:bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center shrink-0">
            <Leaf className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          </div>
          <span className="font-bold text-[11px] leading-tight min-[380px]:text-xs sm:text-sm text-slate-800 dark:text-slate-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors truncate min-w-0 max-w-[6.5rem] min-[360px]:max-w-[9rem] min-[420px]:max-w-[12rem] sm:max-w-none">
            Keralux / Vila Guaraciaba
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map(({ href, label }) => {
            const id = href.slice(1)
            return (
              <li key={href}>
                <a
                  href={href}
                  onClick={(e) => onNavClick(e, href)}
                  className={`relative px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    active === id
                      ? 'text-cyan-600 dark:text-cyan-400'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {active === id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-cyan-500/10 border border-cyan-500/20 rounded-lg pointer-events-none"
                    />
                  )}
                  <span className="relative">{label}</span>
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2 shrink-0">
          <ThemeToggle />

          <a
            href="tel:156"
            className="hidden md:flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-sm font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-950"
            aria-label="Ligar para 156 — Central da Prefeitura"
          >
            <Phone className="w-4 h-4" />
            156
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-900/5 dark:hover:bg-white/5 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu de navegação'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-t border-slate-200 dark:border-white/8 overflow-hidden rounded-b-2xl"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {links.map(({ href, label }) => {
                const id = href.slice(1)
                return (
                  <a
                    key={href}
                    href={href}
                    onClick={(e) => onNavClick(e, href, { closeMenu: true })}
                    className={`px-3 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500/50 ${
                      active === id
                        ? 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/10'
                        : 'text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-500/5'
                    }`}
                  >
                    {label}
                  </a>
                )
              })}
              <a
                href="tel:156"
                className="mt-2 flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3 rounded-lg text-sm transition-colors"
              >
                <Phone className="w-4 h-4" />
                Ligar 156
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
