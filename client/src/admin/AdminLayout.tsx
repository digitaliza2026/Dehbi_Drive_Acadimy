import { ReactNode, useState } from 'react';
import { Link, NavLink, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Image, BookOpen, MapPin, MessageSquare,
  Calendar, Settings, LogOut, Menu, X, Quote, Camera, Clock, Home
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const menu = [
  { to: '/admin', label: 'Tableau de bord', icon: LayoutDashboard, end: true },
  { to: '/admin/hero', label: 'Hero', icon: Image },
  { to: '/admin/formations', label: 'Formations', icon: BookOpen },
  { to: '/admin/etablissements', label: 'Établissements', icon: MapPin },
  { to: '/admin/temoignages', label: 'Témoignages', icon: Quote },
  { to: '/admin/galerie', label: 'Galerie', icon: Camera },
  { to: '/admin/creneaux', label: 'Créneaux', icon: Clock },
  { to: '/admin/reservations', label: 'Réservations', icon: Calendar },
  { to: '/admin/messages', label: 'Messages', icon: MessageSquare },
  { to: '/admin/parametres', label: 'Paramètres', icon: Settings }
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, logout, username } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  if (!isAuthenticated) return <Navigate to="/admin/login" replace state={{ from: location }} />;

  return (
    <div className="min-h-screen bg-brand-50/30 flex">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-gradient-to-b from-brand-900 to-brand-950 text-white transition-transform lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6 border-b border-white/10">
          <Link to="/admin" className="flex items-center gap-3">
            <svg width="36" height="36" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="28" fill="#1e3163" stroke="#eaa630" strokeWidth="3"/>
              <circle cx="32" cy="32" r="6" fill="#eaa630"/>
              <line x1="32" y1="10" x2="32" y2="26" stroke="#eaa630" strokeWidth="3" strokeLinecap="round"/>
              <line x1="32" y1="38" x2="32" y2="54" stroke="#eaa630" strokeWidth="3" strokeLinecap="round"/>
              <line x1="10" y1="32" x2="26" y2="32" stroke="#eaa630" strokeWidth="3" strokeLinecap="round"/>
              <line x1="38" y1="32" x2="54" y2="32" stroke="#eaa630" strokeWidth="3" strokeLinecap="round"/>
            </svg>
            <div>
              <div className="font-display font-bold text-white">Dehbi Drive</div>
              <div className="text-xs text-brand-300 uppercase tracking-wider">Admin</div>
            </div>
          </Link>
        </div>

        <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100vh-180px)]">
          {menu.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-brand-900 shadow-lg'
                    : 'text-brand-200 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-white/10 bg-brand-950">
          <div className="px-3 py-2 text-xs text-brand-300 mb-2">
            Connecté en tant que <strong className="text-white">{username}</strong>
          </div>
          <Link to="/" className="flex items-center gap-3 px-4 py-2 rounded-xl text-sm text-brand-200 hover:bg-white/5">
            <Home size={16} /> Voir le site
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm text-red-300 hover:bg-red-500/10"
          >
            <LogOut size={16} /> Déconnexion
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0">
        <header className="bg-white border-b border-brand-100 sticky top-0 z-30">
          <div className="px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-brand-50"
            >
              <Menu size={20} />
            </button>
            <div className="font-display text-xl font-bold text-brand-900">
              {menu.find(m => m.end ? location.pathname === m.to : location.pathname.startsWith(m.to))?.label || 'Admin'}
            </div>
            <div className="text-sm text-brand-500">{new Date().toLocaleDateString('fr-FR', { dateStyle: 'long' })}</div>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
