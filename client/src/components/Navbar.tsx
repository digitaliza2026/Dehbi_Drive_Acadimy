import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

const navItems = [
  { to: '/', label: 'Accueil' },
  { to: '/formations', label: 'Formations' },
  { to: '/etablissements', label: 'Établissements' },
  { to: '/galerie', label: 'Galerie' },
  { to: '/about', label: 'À propos' },
  { to: '/contact', label: 'Contact' }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const settings = useSettings();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group" style={{ perspective: 600 }}>
          <motion.div
            whileHover={{ rotateY: 360, rotateX: 15 }}
            transition={{ duration: 0.8, type: 'spring' }}
            style={{ transformStyle: 'preserve-3d' }}
            className="relative"
          >
            <svg width="40" height="40" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="28" fill={scrolled ? '#1e3163' : '#ffffff'} stroke="#eaa630" strokeWidth="3"/>
              <circle cx="32" cy="32" r="6" fill="#eaa630"/>
              <line x1="32" y1="10" x2="32" y2="26" stroke="#eaa630" strokeWidth="3" strokeLinecap="round"/>
              <line x1="32" y1="38" x2="32" y2="54" stroke="#eaa630" strokeWidth="3" strokeLinecap="round"/>
              <line x1="10" y1="32" x2="26" y2="32" stroke="#eaa630" strokeWidth="3" strokeLinecap="round"/>
              <line x1="38" y1="32" x2="54" y2="32" stroke="#eaa630" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </motion.div>
          <div>
            <div className={`font-display font-bold text-lg leading-none ${scrolled ? 'text-brand-900' : 'text-white'}`}>
              Dehbi <span className="text-gradient">Drive</span>
            </div>
            <div className={`text-xs tracking-wider uppercase ${scrolled ? 'text-brand-600' : 'text-brand-200'}`}>
              Academy
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? scrolled ? 'text-gold-600' : 'text-gold-300'
                    : scrolled ? 'text-brand-700 hover:text-gold-600' : 'text-white hover:text-gold-300'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 bg-gold-400"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <a href={`tel:${settings.phone.replace(/\s/g, '')}`}
             className={`flex items-center gap-2 text-sm font-medium ${scrolled ? 'text-brand-700' : 'text-white'}`}>
            <Phone size={16} className="text-gold-500" />
            {settings.phone}
          </a>
          <Link to="/reservation" className="btn-primary !py-2 !px-5 !text-sm">
            Réserver
          </Link>
        </div>

        {/* Mobile button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden p-2 rounded-lg ${scrolled ? 'text-brand-900' : 'text-white'}`}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-brand-100 shadow-xl overflow-hidden"
          >
            <div className="container-custom py-4 flex flex-col gap-1">
              {navItems.map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      isActive ? 'bg-gold-50 text-gold-700' : 'text-brand-700 hover:bg-brand-50'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <Link to="/reservation" className="btn-primary mt-2 w-full justify-center">
                Réserver une leçon
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
