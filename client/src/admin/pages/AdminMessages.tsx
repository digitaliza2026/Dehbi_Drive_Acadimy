import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Trash2, MailOpen, MailWarning } from 'lucide-react';
import { api } from '../api';

interface Message {
  id: string;
  nom: string;
  email: string;
  sujet: string;
  message: string;
  lu: boolean;
  createdAt: string;
}

export default function AdminMessages() {
  const [items, setItems] = useState<Message[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [opened, setOpened] = useState<string | null>(null);

  const load = async () => {
    const data = await api.get('/messages');
    setItems(data.sort((a: Message, b: Message) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
  };
  useEffect(() => { load(); }, []);

  const toggleRead = async (m: Message) => {
    await api.put(`/messages/${m.id}`, { lu: !m.lu });
    await load();
  };

  const remove = async (id: string) => {
    if (!confirm('Supprimer ce message ?')) return;
    await api.del(`/messages/${id}`);
    await load();
  };

  const filtered = filter === 'all' ? items : filter === 'unread' ? items.filter(i => !i.lu) : items.filter(i => i.lu);

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-brand-900">Messages</h1>
        <p className="text-brand-600 text-sm">Messages reçus via le formulaire de contact</p>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {[
          { v: 'all', label: 'Tous', count: items.length },
          { v: 'unread', label: 'Non lus', count: items.filter(i => !i.lu).length },
          { v: 'read', label: 'Lus', count: items.filter(i => i.lu).length }
        ].map(o => (
          <button
            key={o.v}
            onClick={() => setFilter(o.v as any)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === o.v
                ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-brand-900'
                : 'bg-white text-brand-700 border border-brand-200 hover:bg-brand-50'
            }`}
          >
            {o.label} <span className="ml-1 opacity-70">({o.count})</span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-brand-100 p-12 text-center text-brand-400">
          Aucun message
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className={`bg-white rounded-2xl border p-5 transition-shadow hover:shadow-md ${m.lu ? 'border-brand-100' : 'border-gold-300 bg-gold-50/30'}`}
            >
              <div className="flex items-start justify-between mb-3 gap-3 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${m.lu ? 'bg-brand-100 text-brand-600' : 'bg-gold-200 text-gold-700'}`}>
                    {m.lu ? <MailOpen size={18} /> : <Mail size={18} />}
                  </div>
                  <div>
                    <div className="font-semibold text-brand-900">{m.nom}</div>
                    <a href={`mailto:${m.email}`} className="text-sm text-brand-500 hover:text-gold-600">{m.email}</a>
                  </div>
                </div>
                {!m.lu && <span className="px-2 py-0.5 rounded-full bg-gold-500 text-brand-900 text-xs font-bold">NOUVEAU</span>}
              </div>

              <div className="font-semibold text-brand-900 mb-1">{m.sujet}</div>

              {opened === m.id ? (
                <p className="text-brand-700 text-sm whitespace-pre-wrap mb-3">{m.message}</p>
              ) : (
                <p className="text-brand-600 text-sm line-clamp-2 mb-3">{m.message}</p>
              )}

              <div className="flex flex-wrap gap-2 pt-3 border-t border-brand-100">
                <button
                  onClick={() => setOpened(opened === m.id ? null : m.id)}
                  className="px-3 py-1.5 rounded-lg bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-medium"
                >
                  {opened === m.id ? 'Réduire' : 'Voir tout'}
                </button>
                <button
                  onClick={() => toggleRead(m)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-medium"
                >
                  {m.lu ? <MailWarning size={14} /> : <MailOpen size={14} />}
                  {m.lu ? 'Marquer non lu' : 'Marquer lu'}
                </button>
                <a
                  href={`mailto:${m.email}?subject=Re: ${m.sujet}`}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-medium"
                >
                  <Mail size={14} /> Répondre
                </a>
                <button
                  onClick={() => remove(m.id)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 text-xs font-medium ml-auto"
                >
                  <Trash2 size={14} /> Supprimer
                </button>
              </div>

              <div className="text-xs text-brand-400 mt-2">
                Reçu le {new Date(m.createdAt).toLocaleString('fr-FR')}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
