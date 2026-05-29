import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, ChevronLeft, ChevronRight, User, Users,
  Calendar, CheckCircle, Ticket, PartyPopper,
} from 'lucide-react'

// ─── Mini Calendar ────────────────────────────────────────────────────────────
const MONTHS_FR = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
]
const DAYS_FR = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

function MiniCalendar({ selected, onSelect, accentColor }) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [view, setView] = useState({ year: today.getFullYear(), month: today.getMonth() })

  const daysInMonth = (y, m) => new Date(y, m + 1, 0).getDate()
  const firstDayOfMonth = (y, m) => {
    const d = new Date(y, m, 1).getDay()
    return d === 0 ? 6 : d - 1
  }

  const prevMonth = () =>
    setView(v => v.month === 0 ? { year: v.year - 1, month: 11 } : { ...v, month: v.month - 1 })
  const nextMonth = () =>
    setView(v => v.month === 11 ? { year: v.year + 1, month: 0 } : { ...v, month: v.month + 1 })

  const isSelected = d => {
    if (!selected) return false
    return selected.getDate() === d && selected.getMonth() === view.month && selected.getFullYear() === view.year
  }
  const isPast = d => new Date(view.year, view.month, d) <= today
  const isToday = d => {
    const t = new Date()
    return d === t.getDate() && view.month === t.getMonth() && view.year === t.getFullYear()
  }

  const cells = [
    ...Array(firstDayOfMonth(view.year, view.month)).fill(null),
    ...Array.from({ length: daysInMonth(view.year, view.month) }, (_, i) => i + 1),
  ]

  return (
    <div className="w-full select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={prevMonth}
          className="p-1.5 rounded-lg hover:bg-white/8 text-white/50 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-white/90 text-sm font-semibold">
          {MONTHS_FR[view.month]} {view.year}
        </span>
        <button
          onClick={nextMonth}
          className="p-1.5 rounded-lg hover:bg-white/8 text-white/50 hover:text-white transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS_FR.map((d, i) => (
          <div key={i} className="text-center text-[10px] font-medium text-white/25 py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Cells */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((day, i) => (
          <div key={i} className="flex items-center justify-center h-8">
            {day && (
              <button
                onClick={() => !isPast(day) && onSelect(new Date(view.year, view.month, day))}
                disabled={isPast(day)}
                className={[
                  'w-8 h-8 rounded-full text-xs transition-all duration-150 font-medium',
                  isPast(day)
                    ? 'text-white/15 cursor-not-allowed'
                    : isSelected(day)
                    ? 'scale-110 font-bold text-space-dark shadow-md'
                    : isToday(day)
                    ? 'text-white ring-1 ring-inset hover:bg-white/10 cursor-pointer'
                    : 'text-white/65 hover:bg-white/10 cursor-pointer',
                ].join(' ')}
                style={
                  isSelected(day)
                    ? { backgroundColor: accentColor, boxShadow: `0 0 10px ${accentColor}60` }
                    : isToday(day)
                    ? { ringColor: accentColor }
                    : {}
                }
              >
                {day}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatDateFR(date) {
  if (!date) return ''
  return new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  }).format(date)
}

function formatPrice(n) {
  return new Intl.NumberFormat('fr-FR').format(n) + ' €'
}

function genRef() {
  return 'TTA-' + Math.random().toString(36).substring(2, 8).toUpperCase()
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function BookingModal({ destination, onClose }) {
  const { name, era, icon, accentColor, gradient, pricePerPerson, duration, image } = destination

  const [step, setStep] = useState(1) // 1=form 2=recap 3=confirmed
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [date, setDate] = useState(null)
  const [people, setPeople] = useState(1)
  const [bookingRef] = useState(genRef)

  const total = pricePerPerson * people
  const canContinue = firstName.trim() && lastName.trim() && date

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] flex items-end md:items-center justify-center p-0 md:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, y: 80, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 80, scale: 0.95 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 w-full md:max-w-xl bg-space-card border border-white/8 rounded-t-3xl md:rounded-3xl overflow-hidden flex flex-col max-h-[95vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* ── Step 1 : Form ──────────────────────────────────────────────── */}
        {step === 1 && (
          <>
            {/* Header band */}
            <div className={`relative h-28 bg-gradient-to-br ${gradient} flex-shrink-0`}>
              <img
                src={image}
                alt={name}
                className="absolute inset-0 w-full h-full object-cover opacity-40"
                onError={e => { e.currentTarget.style.display = 'none' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-space-card to-transparent" />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 glass rounded-full p-1.5 text-white/60 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-4 left-6 flex items-center gap-3">
                <span className="text-3xl">{icon}</span>
                <div>
                  <p className="text-white/50 text-xs uppercase tracking-widest">{era}</p>
                  <h2 className="font-playfair text-xl font-bold text-white">{name}</h2>
                </div>
              </div>
            </div>

            {/* Scrollable form */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Name fields */}
              <div>
                <h3 className="text-white/60 text-xs uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> Voyageur principal
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-white/40 text-xs mb-1.5">Prénom</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      placeholder="Jean"
                      className="w-full bg-white/5 border border-white/10 focus:border-gold/40 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-white/40 text-xs mb-1.5">Nom</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                      placeholder="Dupont"
                      className="w-full bg-white/5 border border-white/10 focus:border-gold/40 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* People */}
              <div>
                <h3 className="text-white/60 text-xs uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" /> Nombre de voyageurs
                </h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setPeople(p => Math.max(1, p - 1))}
                    className="w-10 h-10 rounded-full border border-white/15 text-white/60 hover:border-gold/40 hover:text-gold transition-all text-lg font-light flex items-center justify-center"
                  >
                    −
                  </button>
                  <span className="text-white text-2xl font-bold font-playfair w-8 text-center">
                    {people}
                  </span>
                  <button
                    onClick={() => setPeople(p => Math.min(10, p + 1))}
                    className="w-10 h-10 rounded-full border border-white/15 text-white/60 hover:border-gold/40 hover:text-gold transition-all text-lg font-light flex items-center justify-center"
                  >
                    +
                  </button>
                  <span className="text-white/30 text-sm ml-2">
                    {people > 1 ? `${people} personnes` : '1 personne'}
                  </span>
                  <span className="ml-auto text-white/60 text-sm font-medium">
                    {formatPrice(pricePerPerson * people)}
                  </span>
                </div>
              </div>

              {/* Date picker */}
              <div>
                <h3 className="text-white/60 text-xs uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Date de départ
                </h3>
                <div className="glass border border-white/8 rounded-2xl p-4">
                  <MiniCalendar selected={date} onSelect={setDate} accentColor={accentColor} />
                </div>
                {date && (
                  <p className="mt-2 text-xs text-center capitalize" style={{ color: accentColor }}>
                    {formatDateFR(date)}
                  </p>
                )}
              </div>
            </div>

            {/* Footer CTA */}
            <div className="flex-shrink-0 p-6 border-t border-white/5">
              <button
                disabled={!canContinue}
                onClick={() => setStep(2)}
                className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-[1.02] hover:shadow-lg"
                style={
                  canContinue
                    ? { backgroundColor: accentColor, color: '#07070f', boxShadow: `0 0 20px ${accentColor}35` }
                    : { backgroundColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.3)' }
                }
              >
                Voir le récapitulatif →
              </button>
              {!canContinue && (
                <p className="text-center text-white/25 text-xs mt-2">
                  Renseignez votre prénom, nom et choisissez une date
                </p>
              )}
            </div>
          </>
        )}

        {/* ── Step 2 : Recap ─────────────────────────────────────────────── */}
        {step === 2 && (
          <>
            <div className="flex items-center justify-between p-6 border-b border-white/5 flex-shrink-0">
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-1.5 text-white/50 hover:text-white transition-colors text-sm"
              >
                <ChevronLeft className="w-4 h-4" /> Modifier
              </button>
              <h2 className="text-white font-semibold">Récapitulatif</h2>
              <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* Destination block */}
              <div
                className="rounded-2xl overflow-hidden border"
                style={{ borderColor: `${accentColor}30` }}
              >
                <div className={`relative h-24 bg-gradient-to-br ${gradient}`}>
                  <img
                    src={image} alt={name}
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                    onError={e => { e.currentTarget.style.display = 'none' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-space-card/80 to-transparent" />
                  <div className="absolute bottom-3 left-4 flex items-center gap-2">
                    <span className="text-2xl">{icon}</span>
                    <div>
                      <p className="text-white font-playfair font-bold">{name}</p>
                      <p className="text-white/50 text-xs">{era} · {duration}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Details list */}
              <div className="glass border border-white/8 rounded-2xl divide-y divide-white/5">
                {[
                  { label: 'Voyageur', value: `${firstName} ${lastName}` },
                  { label: 'Date de départ', value: formatDateFR(date) },
                  { label: 'Nombre de voyageurs', value: `${people} personne${people > 1 ? 's' : ''}` },
                  { label: 'Durée', value: duration },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-start justify-between px-4 py-3">
                    <span className="text-white/40 text-sm">{label}</span>
                    <span className="text-white text-sm font-medium text-right max-w-[55%] capitalize">{value}</span>
                  </div>
                ))}
              </div>

              {/* Price breakdown */}
              <div className="glass border border-white/8 rounded-2xl overflow-hidden">
                <div className="divide-y divide-white/5">
                  <div className="flex justify-between px-4 py-3 text-sm">
                    <span className="text-white/40">Prix par personne</span>
                    <span className="text-white/70">{formatPrice(pricePerPerson)}</span>
                  </div>
                  <div className="flex justify-between px-4 py-3 text-sm">
                    <span className="text-white/40">× {people} voyageur{people > 1 ? 's' : ''}</span>
                    <span className="text-white/70">{formatPrice(pricePerPerson)} × {people}</span>
                  </div>
                </div>
                <div
                  className="flex justify-between px-4 py-4 border-t"
                  style={{ borderColor: `${accentColor}30`, backgroundColor: `${accentColor}08` }}
                >
                  <span className="text-white font-semibold">Total</span>
                  <span className="font-playfair text-xl font-bold" style={{ color: accentColor }}>
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              <p className="text-white/25 text-xs text-center leading-relaxed">
                En confirmant, vous acceptez que ce voyage est fictif et pédagogique.
                Aucun débit ne sera effectué.
              </p>
            </div>

            <div className="flex-shrink-0 p-6 border-t border-white/5">
              <button
                onClick={() => setStep(3)}
                className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg text-space-dark"
                style={{ backgroundColor: accentColor, boxShadow: `0 0 20px ${accentColor}40` }}
              >
                Confirmer la réservation
              </button>
            </div>
          </>
        )}

        {/* ── Step 3 : Confirmation ──────────────────────────────────────── */}
        {step === 3 && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${accentColor}20`, border: `2px solid ${accentColor}` }}
            >
              <CheckCircle className="w-10 h-10" style={{ color: accentColor }} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <p className="text-white/50 text-sm uppercase tracking-widest mb-2">Réservation confirmée</p>
              <h2 className="font-playfair text-3xl font-bold text-white mb-1">
                Bon voyage, {firstName} !
              </h2>
              <p className="text-white/40 text-sm">
                Destination : <span className="text-white/70">{name}</span>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass border border-white/10 rounded-2xl px-8 py-5 w-full max-w-xs"
            >
              <p className="text-white/30 text-xs uppercase tracking-widest mb-1">Référence de voyage</p>
              <p className="font-mono text-xl font-bold tracking-widest" style={{ color: accentColor }}>
                {bookingRef}
              </p>
              <div className="mt-3 pt-3 border-t border-white/5 text-xs text-white/30 space-y-1">
                <p className="capitalize">{formatDateFR(date)}</p>
                <p>{people} voyageur{people > 1 ? 's' : ''} · {formatPrice(total)}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col gap-3 w-full max-w-xs"
            >
              <p className="text-white/25 text-xs">
                Une confirmation a été envoyée à votre espace client.
              </p>
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl font-semibold text-sm text-space-dark transition-all duration-300 hover:opacity-90"
                style={{ backgroundColor: accentColor }}
              >
                Fermer
              </button>
            </motion.div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
