import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MessageSquare, BookOpen, Users, TrendingUp, Clock } from 'lucide-react';
import { api } from './api';

interface Stat { label: string; value: number; icon: any; color: string; }

export default function AdminDashboard() {
  const [stats, setStats] = useState({ reservations: 0, messages: 0, formations: 0, creneaux: 0 });
  const [recent, setRecent] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([
      api.get('/reservations'),
      api.get('/messages'),
      api.get('/formations'),
      api.get('/creneaux')
    ]).then(([r, m, f, c]) => {
      setStats({ reservations: r.length, messages: m.filter((x: any) => !x.lu).length, formations: f.length, creneaux: c.filter((x: any) => x.available).length });
      const allActivity = [
        ...r.slice(-5).map((x: any) => ({ type: 'reservation', label: `Réservation : ${x.nom}`, date: x.createdAt, detail: x.formation })),
        ...m.slice(-5).map((x: any) => ({ type: 'message', label: `Message de ${x.nom}`, date: x.createdAt, detail: x.sujet }))
      ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 8);
      setRecent(allActivity);
    });
  }, []);

  const cards: Stat[] = [
    { label: 'Réservations totales', value: stats.reservations, icon: Calendar, color: 'from-blue-500 to-blue-600' },
    { label: 'Messages non lus', value: stats.messages, icon: MessageSquare, color: 'from-pink-500 to-pink-600' },
    { label: 'Formations actives', value: stats.formations, icon: BookOpen, color: 'from-purple-500 to-purple-600' },
    { label: 'Créneaux disponibles', value: stats.creneaux, icon: Clock, color: 'from-emerald-500 to-emerald-600' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-brand-900">Bienvenue 👋</h1>
        <p className="text-brand-600">Aperçu de l'activité de votre auto-école</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-brand-100 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center text-white shadow-lg`}>
                <c.icon size={22} />
              </div>
              <TrendingUp className="text-emerald-500" size={18} />
            </div>
            <div className="text-3xl font-bold text-brand-900 font-display">{c.value}</div>
            <div className="text-sm text-brand-500 mt-1">{c.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-brand-100"
        >
          <h2 className="font-display text-xl font-bold text-brand-900 mb-4">Activité récente</h2>
          {recent.length === 0 ? (
            <div className="text-center py-12 text-brand-400">
              Aucune activité récente
            </div>
          ) : (
            <div className="space-y-3">
              {recent.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-brand-50 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    item.type === 'reservation' ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'
                  }`}>
                    {item.type === 'reservation' ? <Calendar size={18} /> : <MessageSquare size={18} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-brand-900 text-sm">{item.label}</div>
                    <div className="text-xs text-brand-500 truncate">{item.detail}</div>
                  </div>
                  <div className="text-xs text-brand-400 whitespace-nowrap">
                    {new Date(item.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-brand-900 to-brand-800 rounded-2xl p-6 text-white"
        >
          <div className="flex items-center gap-2 mb-3">
            <Users className="text-gold-400" size={20} />
            <h2 className="font-display text-xl font-bold">Bienvenue, Admin !</h2>
          </div>
          <p className="text-brand-200 text-sm mb-4">
            Gérez l'ensemble du site Dehbi Drive Academy depuis ce panneau de contrôle.
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
              <span>Total candidats</span>
              <span className="font-bold text-gold-400">10 000+</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
              <span>Années d'activité</span>
              <span className="font-bold text-gold-400">30+</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
              <span>Établissements</span>
              <span className="font-bold text-gold-400">7</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
