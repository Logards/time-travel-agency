import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Menu, X } from 'lucide-react'

const navLinks = [
  { href: '#accueil', label: 'Accueil' },
  { href: '#agence', label: 'L\'Agence' },
  { href: '#destinations', label: 'Destinations' },
  { href: '#contact', label: 'Contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-dark shadow-lg shadow-black/30' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a
          href="#accueil"
          onClick={(e) => handleNavClick(e, '#accueil')}
          className="flex items-center gap-2.5 group"
        >
          <div className="relative w-9 h-9 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-gold/30 group-hover:border-gold/70 transition-colors duration-300" />
            <Clock className="w-5 h-5 text-gold group-hover:rotate-[360deg] transition-transform duration-700" />
          </div>
          <span className="font-playfair text-lg font-bold leading-none">
            <span className="gold-text">Time</span>
            <span className="text-white">Travel</span>
            <span className="block text-white/40 text-[10px] font-inter font-normal tracking-[0.3em] uppercase">
              Agency
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-white/60 hover:text-gold transition-colors duration-200 text-sm font-medium tracking-wide relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <a
            href="#destinations"
            onClick={(e) => handleNavClick(e, '#destinations')}
            className="bg-gold hover:bg-gold-light text-space-dark px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 hover:shadow-md hover:shadow-gold/30"
          >
            Réserver
          </a>
        </nav>

        {/* Mobile button */}
        <button
          className="md:hidden text-white/80 hover:text-gold transition-colors p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden glass-dark mx-4 mb-3 rounded-2xl overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="py-3 px-2 text-white/70 hover:text-gold border-b border-white/5 transition-colors duration-200 last:border-0"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#destinations"
                onClick={(e) => handleNavClick(e, '#destinations')}
                className="mt-3 bg-gold text-space-dark px-5 py-2.5 rounded-full text-sm font-semibold text-center"
              >
                Réserver un voyage
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
