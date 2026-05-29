import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Shield, Sparkles, Star, Clock } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Sécurité Absolue',
    description:
      'Chaque voyage est encadré par nos guides temporels certifiés. Protocoles de sécurité validés par 10 ans de recherche.',
    color: 'text-gold',
    bgColor: 'bg-gold/10',
    borderColor: 'border-gold/20',
  },
  {
    icon: Sparkles,
    title: 'Expériences Uniques',
    description:
      'Rencontrez des figures historiques légendaires, assistez à des événements fondateurs et vivez des moments inoubliables.',
    color: 'text-violet-400',
    bgColor: 'bg-violet-500/10',
    borderColor: 'border-violet-500/20',
  },
  {
    icon: Star,
    title: 'Luxe & Confort',
    description:
      'Hébergements de prestige adaptés à chaque époque, gastronomie d\'exception et service personnalisé 24/7.',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="agence" className="py-24 md:py-32 relative overflow-hidden">
      {/* bg accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-indigo-950/30 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.span
            variants={itemVariants}
            className="inline-block text-xs text-gold font-medium tracking-[0.3em] uppercase mb-4"
          >
            L'Agence
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Voyager dans le passé,{' '}
            <span className="gold-text">en toute confiance</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            TimeTravel Agency est la première agence de voyage temporel de luxe. Fondée
            par des passionnés d'histoire et de technologies de pointe, nous réinventons
            l'exploration du passé depuis 2019.
          </motion.p>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {features.map(({ icon: Icon, title, description, color, bgColor, borderColor }) => (
            <motion.div
              key={title}
              variants={itemVariants}
              className={`glass-card rounded-2xl p-8 border ${borderColor} hover:border-opacity-60 transition-all duration-300 group hover:-translate-y-1`}
            >
              <div className={`w-12 h-12 rounded-xl ${bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <h3 className="text-white font-semibold text-lg mb-3 font-playfair">{title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="glass border border-gold/10 rounded-2xl px-8 py-8 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Clock className="w-5 h-5 text-gold" />
              <span className="text-gold font-medium text-sm tracking-wide">Notre promesse</span>
            </div>
            <blockquote className="font-playfair text-xl md:text-2xl text-white/80 italic leading-relaxed">
              "Chaque voyage dans le passé est une fenêtre sur ce qui nous a construits.
              Nous vous offrons non seulement un spectacle, mais une compréhension
              profonde de l'humanité."
            </blockquote>
            <p className="mt-4 text-white/40 text-sm">— Fondateur, TimeTravel Agency</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
