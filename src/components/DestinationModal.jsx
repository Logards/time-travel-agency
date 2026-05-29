import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Clock, MapPin, Star, CheckCircle, Wind, Languages } from 'lucide-react'

export default function DestinationModal({ destination, onClose, onBook }) {
  const {
    name, era, year, tagline, longDescription, image, gradient,
    accentColor, price, duration, difficulty, period, icon,
    activities, highlights, atmosphere, climate, rating, reviews,
  } = destination

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKey)
    }
  }, [onClose])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

        {/* Panel */}
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 80, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative z-10 w-full md:max-w-3xl bg-space-card border border-white/8 rounded-t-3xl md:rounded-3xl overflow-hidden max-h-[92vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Hero image / gradient */}
          <div className={`relative h-52 md:h-64 bg-gradient-to-br ${gradient} flex-shrink-0`}>
            <img
              src={image}
              alt={name}
              className="absolute inset-0 w-full h-full object-cover opacity-50"
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-space-card via-transparent to-transparent" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 glass rounded-full p-2 text-white/70 hover:text-white transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Era + icon */}
            <div className="absolute bottom-5 left-6 flex items-end gap-4">
              <span className="text-5xl">{icon}</span>
              <div>
                <p className="text-xs font-mono tracking-widest mb-1" style={{ color: accentColor }}>
                  {year} AP. J.-C. — {era}
                </p>
                <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white text-glow-gold">
                  {name}
                </h2>
              </div>
            </div>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 md:p-8">
              {/* Tagline */}
              <p className="text-white/50 italic mb-4">{tagline}</p>

              {/* Description */}
              <p className="text-white/70 text-sm leading-relaxed mb-6">{longDescription}</p>

              {/* Meta chips */}
              <div className="flex flex-wrap gap-3 mb-6">
                {[
                  { icon: Clock, label: duration },
                  { icon: MapPin, label: atmosphere },
                  { icon: Wind, label: climate },
                  { icon: Star, label: `${rating}/5 (${reviews} avis)`, fill: true },
                ].map(({ icon: Icon, label, fill }) => (
                  <span
                    key={label}
                    className="flex items-center gap-1.5 glass border border-white/10 rounded-full px-3 py-1.5 text-xs text-white/60"
                  >
                    <Icon className={`w-3.5 h-3.5 text-gold ${fill ? 'fill-gold' : ''}`} />
                    {label}
                  </span>
                ))}
                <span
                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold"
                  style={{ color: accentColor, backgroundColor: `${accentColor}15` }}
                >
                  {difficulty}
                </span>
              </div>

              {/* Activities */}
              <div className="mb-6">
                <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                  Au programme
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {activities.map((activity) => (
                    <li key={activity} className="flex items-start gap-2 text-sm text-white/60">
                      <CheckCircle
                        className="w-4 h-4 mt-0.5 flex-shrink-0"
                        style={{ color: accentColor }}
                      />
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Highlights */}
              <div className="mb-8">
                <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-3">
                  Points forts
                </h3>
                <div className="flex flex-wrap gap-2">
                  {highlights.map((h) => (
                    <span
                      key={h}
                      className="text-xs px-3 py-1 rounded-full border"
                      style={{ color: accentColor, borderColor: `${accentColor}40`, backgroundColor: `${accentColor}10` }}
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer / CTA */}
          <div className="flex-shrink-0 p-6 border-t border-white/5 flex items-center justify-between gap-4">
            <div>
              <p className="text-white/40 text-xs">À partir de</p>
              <p className="font-playfair text-2xl font-bold text-white">
                {price}
                <span className="text-white/40 text-sm font-normal font-inter ml-1">/ personne</span>
              </p>
            </div>
            <button
              className="px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                backgroundColor: accentColor,
                color: '#07070f',
                boxShadow: `0 0 20px ${accentColor}40`,
              }}
              onClick={() => onBook(destination)}
            >
              Réserver ce voyage
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
