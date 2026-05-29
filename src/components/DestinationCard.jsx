import { motion } from 'framer-motion'
import { Clock, Star, ArrowRight, Users } from 'lucide-react'

export default function DestinationCard({ destination, onSelect, index }) {
  const { name, era, year, tagline, description, image, gradient, accentColor, accentRgb, price, duration, difficulty, icon, rating, reviews } = destination

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: 'easeOut' }}
      className="group relative rounded-3xl overflow-hidden cursor-pointer flex flex-col"
      onClick={() => onSelect(destination)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(destination)}
      aria-label={`Explorer ${name}`}
    >
      {/* Image / Gradient background */}
      <div className={`relative h-64 bg-gradient-to-br ${gradient} overflow-hidden`}>
        {/* Try to load image, fallback is gradient */}
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-space-card via-transparent to-transparent" />

        {/* Era badge */}
        <div className="absolute top-4 left-4">
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm border"
            style={{
              color: accentColor,
              borderColor: `${accentColor}40`,
              backgroundColor: `${accentColor}15`,
            }}
          >
            {era}
          </span>
        </div>

        {/* Price badge */}
        <div className="absolute top-4 right-4">
          <span className="glass text-white text-sm font-bold px-3 py-1 rounded-full">
            {price}
          </span>
        </div>

        {/* Large era icon */}
        <div className="absolute bottom-4 right-4 text-4xl opacity-60 group-hover:scale-125 group-hover:opacity-100 transition-all duration-500">
          {icon}
        </div>
      </div>

      {/* Card body */}
      <div
        className="flex-1 p-6 flex flex-col border border-t-0 rounded-b-3xl transition-colors duration-300"
        style={{
          background: 'rgba(19, 19, 42, 0.9)',
          borderColor: 'rgba(255,255,255,0.06)',
        }}
      >
        {/* Year chip */}
        <p className="text-xs font-mono tracking-widest mb-2" style={{ color: accentColor }}>
          {year} AP. J.-C.
        </p>

        <h3 className="font-playfair text-2xl font-bold text-white mb-1 group-hover:text-gold transition-colors duration-300">
          {name}
        </h3>
        <p className="text-white/40 text-sm italic mb-3">{tagline}</p>

        <p className="text-white/60 text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
          {description}
        </p>

        {/* Meta info */}
        <div className="flex items-center gap-4 mb-5 text-xs text-white/40">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {duration}
          </span>
          <span
            className="px-2 py-0.5 rounded-full text-xs"
            style={{ color: accentColor, backgroundColor: `${accentColor}15` }}
          >
            {difficulty}
          </span>
          <span className="flex items-center gap-1 ml-auto">
            <Star className="w-3.5 h-3.5 fill-gold text-gold" />
            <span className="text-white/60">{rating}</span>
            <span className="text-white/30">({reviews})</span>
          </span>
        </div>

        {/* CTA */}
        <button
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-300 border group-hover:scale-[1.02]"
          style={{
            color: accentColor,
            borderColor: `${accentColor}40`,
            backgroundColor: `${accentColor}12`,
          }}
          onClick={(e) => { e.stopPropagation(); onSelect(destination) }}
        >
          Explorer cette destination
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      </div>
    </motion.article>
  )
}
