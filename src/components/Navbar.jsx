import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Leaf } from 'lucide-react'

const links = [
  { href: '#problema',  label: 'O Problema' },
  { href: '#coleta',    label: 'Coleta' },
  { href: '#ecopontos', label: 'Ecopontos' },
  { href: '#impactos',  label: 'Impactos' },
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

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-slate-950/90 backdrop-blur-xl border-b border-white/6 shadow-2xl' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
            <Leaf className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="font-bold text-sm text-slate-200 group-hover:text-cyan-400 transition-colors hidden sm:block">
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
                  className={`relative px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    active === id
                      ? 'text-cyan-400'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {active === id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-cyan-500/10 border border-cyan-500/20 rounded-lg"
                    />
                  )}
                  <span className="relative">{label}</span>
                </a>
              </li>
            )
          })}
        </ul>

        <a
          href="tel:156"
          className="hidden md:flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-sm font-bold px-4 py-2 rounded-lg transition-colors"
        >
          📞 156
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-slate-950/95 backdrop-blur-xl border-b border-white/6 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {links.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/5 text-sm font-medium transition-colors"
                >
                  {label}
                </a>
              ))}
              <a
                href="tel:156"
                className="mt-2 bg-cyan-500 text-slate-950 font-bold py-2.5 rounded-lg text-center text-sm"
              >
                Ligar 156
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
