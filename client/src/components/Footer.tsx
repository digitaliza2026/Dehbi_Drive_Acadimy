import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Instagram, Facebook, ChevronRight } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export default function Footer() {
  const settings = useSettings();

  return (
    <footer className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950 text-brand-100 pt-16 pb-6 mt-20 relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-brand-500/20 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <svg width="40" height="40" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="28" fill="#1e3163" stroke="#eaa630" strokeWidth="3"/>
                <circle cx="32" cy="32" r="6" fill="#eaa630"/>
                <line x1="32" y1="10" x2="32" y2="26" stroke="#eaa630" strokeWidth="3" strokeLinecap="round"/>
                <line x1="32" y1="38" x2="32" y2="54" stroke="#eaa630" strokeWidth="3" strokeLinecap="round"/>
                <line x1="10" y1="32" x2="26" y2="32" stroke="#eaa630" strokeWidth="3" strokeLinecap="round"/>
                <line x1="38" y1="32" x2="54" y2="32" stroke="#eaa630" strokeWidth="3" strokeLinecap="round"/>
              </svg>
              <div>
                <div className="font-display font-bold text-xl text-white">{settings.schoolName}</div>
                <div className="text-xs text-brand-300 uppercase tracking-wider">Depuis {settings.stats.since}</div>
              </div>
            </div>
            <p className="text-brand-300 text-sm leading-relaxed">
              {settings.tagline}. Plus de {settings.stats.candidates.toLocaleString('fr-FR')} candidats accompagnés vers la réussite.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-white font-semibold mb-4 text-lg">Navigation</h4>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Accueil' },
                { to: '/formations', label: 'Formations' },
                { to: '/etablissements', label: 'Établissements' },
                { to: '/galerie', label: 'Galerie' },
                { to: '/about', label: 'À propos' }
              ].map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="flex items-center gap-1 text-brand-300 hover:text-gold-400 transition-colors text-sm group">
                    <ChevronRight size={14} className="text-gold-500 group-hover:translate-x-1 transition-transform" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-white font-semibold mb-4 text-lg">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-gold-500 flex-shrink-0 mt-0.5" />
                <span className="text-brand-300">{settings.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-gold-500 flex-shrink-0" />
                <a href={`tel:${settings.phone}`} className="text-brand-300 hover:text-gold-400">{settings.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-gold-500 flex-shrink-0" />
                <a href={`tel:${settings.phoneFixed}`} className="text-brand-300 hover:text-gold-400">{settings.phoneFixed}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-gold-500 flex-shrink-0" />
                <a href={`mailto:${settings.email}`} className="text-brand-300 hover:text-gold-400 break-all">{settings.email}</a>
              </li>
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-white font-semibold mb-4 text-lg">Suivez-nous</h4>
            <div className="flex gap-3 mb-4">
              <a href={settings.instagram} target="_blank" rel="noopener noreferrer"
                 className="w-10 h-10 rounded-full bg-brand-700/50 hover:bg-gold-500 flex items-center justify-center transition-all hover:scale-110">
                <Instagram size={18} />
              </a>
              <a href={settings.facebook} target="_blank" rel="noopener noreferrer"
                 className="w-10 h-10 rounded-full bg-brand-700/50 hover:bg-gold-500 flex items-center justify-center transition-all hover:scale-110">
                <Facebook size={18} />
              </a>
            </div>
            <div className="text-xs text-brand-400 space-y-1">
              <p>Instagram: {settings.instagramHandle}</p>
              <p>Facebook: {settings.facebookHandle}</p>
            </div>
          </motion.div>
        </div>

        <div className="pt-6 border-t border-brand-700/50 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-brand-400">
          <p>© {new Date().getFullYear()} {settings.schoolName}. Tous droits réservés.</p>
          <p>Conçu avec excellence pour la réussite de nos candidats.</p>
        </div>
      </div>
    </footer>
  );
}
