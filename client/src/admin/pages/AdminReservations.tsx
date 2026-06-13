import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Phone, Mail, Trash2, Check, X, Clock } from 'lucide-react';
import { api } from '../api';

interface Reservation {
  id: string;
  nom: string;
  telephone: string;
  email: string;
  formation: string;
  creneau: string;
  date: string;
  notes: string;
  status: string;
  createdAt: string;
}

export default function AdminReservations() {
  const [items, setItems] = useState<Reservation[]>([]);
  const [filter, setFilter] = useState<'all' | 'en_attente' | 'confirmee' | 'annulee'>('all');

  const load = async () => {
    const data = await api.get('/reservations');
    setItems(data.sort((a: Reservation, b: Reservation) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
  };
  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await api.put(`/reservations/${id}`, { status });
    await load();
  };

  const remove = async (id: string) => {
    if (!confirm('Supprimer cette réservation ?')) return;
    await api.del(`/reservations/${id}`);
    await load();
  };

  const filtered = filter === 'all' ? items : items.filter(i => i.status === filter);

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-brand-900">Réservations</h1>
        <p className="text-brand-600 text-sm">Gérez les demandes de réservation de leçons</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { v: 'all', label: 'Toutes', count: items.length },
          { v: 'en_attente', label: 'En attente', count: items.filter(i => i.status === 'en_attente').length },
          { v: 'confirmee', label: 'Confirmées', count: items.filter(i => i.status === 'confirmee').length },
          { v: 'annulee', label: 'Annulées', count: items.filter(i => i.status === 'annulee').length }
        ].map(opt => (
          <button
            key={opt.v}
            onClick={() => setFilter(opt.v as any)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === opt.v
                ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-brand-900'
                : 'bg-white text-brand-700 border border-brand-200 hover:bg-brand-50'
            }`}
          >
            {opt.label} <span className="ml-1 opacity-70">({opt.count})</span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-brand-100 p-12 text-center text-brand-400">
          Aucune réservation
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="bg-white rounded-2xl border border-brand-100 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
                <div>
                  <div className="font-semibold text-brand-900 text-lg">{r.nom}</div>
                  <div className="text-sm text-brand-500">{r.formation}</div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  r.status === 'confirmee' ? 'bg-emerald-100 text-emerald-700' :
                  r.status === 'annulee' ? 'bg-red-100 text-red-700' :
                  'bg-amber-100 text-amber-700'
                }`}>
                  {r.status === 'confirmee' ? '✓ Confirmée' : r.status === 'annulee' ? '✗ Annulée' : '⏳ En attente'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm mb-3">
                <div className="flex items-center gap-2 text-brand-600">
                  <Phone size={14} className="text-gold-500" /> {r.telephone}
                </div>
                {r.email && (
                  <div className="flex items-center gap-2 text-brand-600">
                    <Mail size={14} className="text-gold-500" /> {r.email}
                  </div>
                )}
                <div className="flex items-center gap-2 text-brand-600">
                  <Calendar size={14} className="text-gold-500" /> {r.date}
                </div>
                {r.creneau && (
                  <div className="flex items-center gap-2 text-brand-600">
                    <Clock size={14} className="text-gold-500" /> {r.creneau}
                  </div>
                )}
              </div>

              {r.notes && (
                <div className="bg-brand-50 rounded-lg p-3 text-sm text-brand-600 mb-3 italic">
                  "{r.notes}"
                </div>
              )}

              <div className="flex flex-wrap gap-2 pt-3 border-t border-brand-100">
                <button
                  onClick={() => updateStatus(r.id, 'confirmee')}
                  disabled={r.status === 'confirmee'}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-medium disabled:opacity-40"
                >
                  <Check size={14} /> Confirmer
                </button>
                <button
                  onClick={() => updateStatus(r.id, 'annulee')}
                  disabled={r.status === 'annulee'}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 text-xs font-medium disabled:opacity-40"
                >
                  <X size={14} /> Annuler
                </button>
                <button
                  onClick={() => updateStatus(r.id, 'en_attente')}
                  disabled={r.status === 'en_attente'}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-medium disabled:opacity-40"
                >
                  <Clock size={14} /> En attente
                </button>
                <button
                  onClick={() => remove(r.id)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-medium ml-auto"
                >
                  <Trash2 size={14} /> Supprimer
                </button>
              </div>

              <div className="text-xs text-brand-400 mt-2">
                Reçue le {new Date(r.createdAt).toLocaleString('fr-FR')}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
