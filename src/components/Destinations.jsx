import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Compass } from 'lucide-react'
import { destinations } from '../data/destinations'
import DestinationCard from './DestinationCard'

export default function Destinations({ onSelect }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="destinations" className="py-24 md:py-32 relative">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] rounded-full bg-gold/4 blur-[120px] -translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div ref={ref} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-xs text-gold font-medium tracking-[0.3em] uppercase mb-4"
          >
            <Compass className="w-3.5 h-3.5" />
            Nos destinations
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Trois époques,{' '}
            <span className="gold-text">trois aventures</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/50 text-lg max-w-2xl mx-auto"
          >
            Chaque destination est soigneusement sélectionnée pour vous offrir une
            immersion totale dans l'une des périodes les plus fascinantes de l'histoire.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {destinations.map((destination, index) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              onSelect={onSelect}
              index={index}
            />
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center text-white/25 text-sm mt-12"
        >
          Toutes les destinations incluent: transferts temporels aller-retour, hébergement, guide expert &amp; assurance voyage
        </motion.p>
      </div>
    </section>
  )
}
