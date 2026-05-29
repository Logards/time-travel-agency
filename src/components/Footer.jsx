import { Clock, Mail, Phone, MapPin, Github } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const handleNavClick = (e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer id="contact" className="border-t border-white/5 bg-space-deep">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="#accueil" onClick={(e) => handleNavClick(e, '#accueil')} className="flex items-center gap-2.5 group w-fit">
              <div className="relative w-9 h-9 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-gold/30 group-hover:border-gold/60 transition-colors" />
                <Clock className="w-5 h-5 text-gold group-hover:rotate-180 transition-transform duration-700" />
              </div>
              <span className="font-playfair text-lg font-bold">
                <span className="gold-text">Time</span>
                <span className="text-white">Travel</span>
                <span className="text-white/40 text-xs font-inter font-normal ml-1 tracking-widest uppercase">Agency</span>
              </span>
            </a>
            <p className="mt-4 text-white/50 text-sm leading-relaxed max-w-sm">
              L'agence de voyage temporel de luxe. Nous vous emmenons là où personne d'autre ne peut vous conduire — dans le passé.
            </p>
            <div className="mt-6 flex flex-col gap-2 text-sm text-white/40">
              <div className="flex items-center gap-2 hover:text-gold transition-colors cursor-pointer">
                <Mail className="w-4 h-4" />
                <span>contact@timetravel.agency</span>
              </div>
              <div className="flex items-center gap-2 hover:text-gold transition-colors cursor-pointer">
                <Phone className="w-4 h-4" />
                <span>+33 1 88 XX XX XX</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Paris, France — et partout dans le temps</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white/80 font-semibold text-sm uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm text-white/45">
              {[
                ['#accueil', 'Accueil'],
                ['#agence', "L'Agence"],
                ['#destinations', 'Destinations'],
                ['#contact', 'Contact'],
              ].map(([href, label]) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => handleNavClick(e, href)}
                    className="hover:text-gold transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-white/80 font-semibold text-sm uppercase tracking-wider mb-4">Destinations</h4>
            <ul className="space-y-2 text-sm text-white/45">
              {[
                ['🗼', 'Paris 1889'],
                ['🦕', 'Crétacé −65M'],
                ['🎨', 'Florence 1504'],
              ].map(([icon, name]) => (
                <li key={name}>
                  <a
                    href="#destinations"
                    onClick={(e) => handleNavClick(e, '#destinations')}
                    className="hover:text-gold transition-colors duration-200 flex items-center gap-2"
                  >
                    <span>{icon}</span>
                    <span>{name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/30">
          <p>© {currentYear} TimeTravel Agency. Tous droits réservés.</p>
          <p className="flex items-center gap-1.5">
            <span>Projet pédagogique — M1/M2 Digital &amp; IA</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
