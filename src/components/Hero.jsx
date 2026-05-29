import { useMemo, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Compass } from 'lucide-react'

function StarField() {
  const stars = useMemo(() => {
    return Array.from({ length: 180 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2.5 + 0.5,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.1,
    }))
  }, [])

  const shootingStars = useMemo(() => {
    return Array.from({ length: 4 }, (_, i) => ({
      id: i,
      top: `${10 + Math.random() * 50}%`,
      left: `${40 + Math.random() * 50}%`,
      delay: i * 4 + Math.random() * 3,
      duration: Math.random() * 1.5 + 1,
    }))
  }, [])

  return (
    <div className="stars-container">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
      {shootingStars.map((s) => (
        <div
          key={s.id}
          className="shooting-star"
          style={{
            top: s.top,
            left: s.left,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

function PortalRing({ size, className, ringClass }) {
  return (
    <div
      className={`absolute rounded-full border opacity-20 ${className}`}
      style={{ width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2 }}
    >
      <div className={`w-full h-full rounded-full border-2 border-gold/30 ${ringClass}`} />
    </div>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

export default function Hero() {
  const handleScrollDown = () => {
    document.getElementById('agence')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleCTA = () => {
    document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#07070f] via-[#0b0b1f] to-[#07070f]"
    >
      {/* Background gradient blob */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gold/5 blur-[120px]" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-indigo-900/20 blur-[80px]" />
      </div>

      <StarField />

      {/* Portal rings (decorative, centered) */}
      <div className="absolute top-1/2 left-1/2 pointer-events-none">
        <PortalRing size={400} className="portal-ring-1 border-gold/10" ringClass="" />
        <PortalRing size={560} className="portal-ring-2 border-white/5" ringClass="" />
        <PortalRing size={720} className="portal-ring-3 border-gold/5" ringClass="" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="inline-flex items-center gap-2 glass border border-gold/20 rounded-full px-4 py-1.5 mb-8"
        >
          <Compass className="w-3.5 h-3.5 text-gold" />
          <span className="text-xs text-gold font-medium tracking-widest uppercase">
            Agence de voyage temporel
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.25}
          className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-6"
        >
          <span className="text-white">Explorez</span>
          <br />
          <span className="gold-text text-glow-gold">l'Histoire</span>
          <br />
          <span className="text-white/80 text-4xl md:text-5xl lg:text-6xl font-normal italic">
            réinventée
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.45}
          className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Trois destinations hors du temps vous attendent. Paris 1889, le Crétacé −65M
          et Florence 1504 — des voyages d'exception dans les plus grandes époques
          de l'humanité.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.6}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={handleCTA}
            className="bg-gold hover:bg-gold-light text-space-dark font-semibold px-8 py-3.5 rounded-full text-sm tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-gold/40 hover:scale-105 animate-pulse-gold"
          >
            Découvrir les destinations
          </button>
          <button
            onClick={handleScrollDown}
            className="glass border border-white/10 hover:border-gold/30 text-white/70 hover:text-gold font-medium px-8 py-3.5 rounded-full text-sm tracking-wide transition-all duration-300"
          >
            En savoir plus
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.8}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-12"
        >
          {[
            { value: '3', label: 'Destinations' },
            { value: '740+', label: 'Voyageurs satisfaits' },
            { value: '100%', label: 'Retour garanti' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="font-playfair text-2xl md:text-3xl font-bold gold-text">{value}</p>
              <p className="text-white/40 text-xs tracking-wider uppercase mt-1">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 hover:text-gold transition-colors duration-300 animate-float"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-6 h-6" />
      </motion.button>
    </section>
  )
}
