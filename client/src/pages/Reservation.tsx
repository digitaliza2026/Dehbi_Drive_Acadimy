import { useEffect, useRef, useState, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Calendar, Clock, User, Phone, Mail, BookOpen, CheckCircle2, AlertCircle } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import { DirectionSign } from '../components/RoadSign';

interface Formation { id: string; title: string; }
interface Creneau { id: string; day: string; time: string; available: boolean; }

function SlotSkeleton() {
  return (
    <div className="animate-pulse space-y-3">
      {[1, 2, 3].map(i => (
        <div key={i}>
          <div className="h-4 bg-white/20 rounded w-20 mb-2" />
          <div className="space-y-1">
            <div className="h-9 bg-white/10 rounded-lg" />
            <div className="h-9 bg-white/10 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

function FormSkeleton() {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border border-brand-100 animate-pulse">
      <div className="h-8 bg-brand-100 rounded w-48 mb-6" />
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="h-10 bg-brand-50 rounded-xl" />
        <div className="h-10 bg-brand-50 rounded-xl" />
      </div>
      <div className="h-10 bg-brand-50 rounded-xl mb-4" />
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="h-10 bg-brand-50 rounded-xl" />
        <div className="h-10 bg-brand-50 rounded-xl" />
      </div>
      <div className="h-10 bg-brand-50 rounded-xl mb-4" />
      <div className="h-24 bg-brand-50 rounded-xl mb-6" />
      <div className="h-14 bg-brand-100 rounded-xl" />
    </div>
  );
}

export default function Reservation() {
  const [formations, setFormations] = useState<Formation[]>([]);
  const [creneaux, setCreneaux] = useState<Creneau[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [form, setForm] = useState({
    nom: '',
    telephone: '',
    email: '',
    formation: '',
    creneau: '',
    date: '',
    notes: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    Promise.all([
      fetch('/api/formations').then(r => r.json()),
      fetch('/api/creneaux').then(r => r.json())
    ])
      .then(([formationsData, creneauxData]) => {
        setFormations(formationsData);
        setCreneaux(creneauxData);
      })
      .catch(() => {})
      .finally(() => setDataLoading(false));
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, status: 'en_attente' })
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setForm({ nom: '', telephone: '', email: '', formation: '', creneau: '', date: '', notes: '' });
    } catch {
      setStatus('error');
    }
  };

  const byDay = useMemo(() =>
    creneaux.reduce((acc, c) => {
      if (!acc[c.day]) acc[c.day] = [];
      acc[c.day].push(c);
      return acc;
    }, {} as Record<string, Creneau[]>),
    [creneaux]
  );

  const today = new Date().toISOString().split('T')[0];

  return (
    <div>
      {/* Header */}
      <ReservationHero />

      <section className="py-20">
        <div className="container-custom max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendar/Slots */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="bg-gradient-to-br from-brand-800 to-brand-900 rounded-3xl p-6 text-white sticky top-24">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar size={20} className="text-gold-400" />
                  <h3 className="font-display text-xl font-bold">Créneaux disponibles</h3>
                </div>
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                  {dataLoading ? (
                    <SlotSkeleton />
                  ) : Object.entries(byDay).map(([day, slots]) => (
                    <div key={day}>
                      <div className="text-gold-400 text-sm font-semibold mb-2">{day}</div>
                      <div className="space-y-1">
                        {slots.map(s => (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => setForm(f => ({ ...f, creneau: `${s.day} ${s.time}` }))}
                            disabled={!s.available}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                              form.creneau === `${s.day} ${s.time}`
                                ? 'bg-gold-500 text-brand-900 font-semibold'
                                : s.available
                                  ? 'bg-white/5 hover:bg-white/10'
                                  : 'bg-white/5 opacity-40 cursor-not-allowed'
                            }`}
                          >
                            <Clock size={12} className="inline mr-2" />
                            {s.time}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              {dataLoading ? (
                <FormSkeleton />
              ) : status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border-2 border-green-200 rounded-3xl p-12 text-center"
                >
                  <CheckCircle2 size={64} className="text-green-500 mx-auto mb-4" />
                  <h3 className="font-display text-2xl font-bold text-green-900 mb-2">
                    Réservation envoyée !
                  </h3>
                  <p className="text-green-700 mb-6">
                    Nous vous contacterons rapidement pour confirmer votre rendez-vous.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="btn-outline !border-green-600 !text-green-600 hover:!bg-green-600 hover:!text-white"
                  >
                    Faire une autre réservation
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={submit} className="bg-white rounded-3xl p-8 shadow-xl border border-brand-100">
                  <h3 className="font-display text-2xl font-bold text-brand-900 mb-6">
                    Vos informations
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-brand-700 mb-2">
                        <User size={14} className="inline mr-1 text-gold-500" /> Nom complet *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.nom}
                        onChange={e => setForm(f => ({ ...f, nom: e.target.value }))}
                        className="input-field"
                        placeholder="Votre nom"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-700 mb-2">
                        <Phone size={14} className="inline mr-1 text-gold-500" /> Téléphone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.telephone}
                        onChange={e => setForm(f => ({ ...f, telephone: e.target.value }))}
                        className="input-field"
                        placeholder="06XX XXX XXX"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-brand-700 mb-2">
                      <Mail size={14} className="inline mr-1 text-gold-500" /> Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="input-field"
                      placeholder="votre@email.com"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-brand-700 mb-2">
                        <BookOpen size={14} className="inline mr-1 text-gold-500" /> Formation *
                      </label>
                      <select
                        required
                        value={form.formation}
                        onChange={e => setForm(f => ({ ...f, formation: e.target.value }))}
                        className="input-field"
                      >
                        <option value="">Sélectionner...</option>
                        {formations.map(f => (
                          <option key={f.id} value={f.title}>{f.title}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-700 mb-2">
                        <Calendar size={14} className="inline mr-1 text-gold-500" /> Date souhaitée *
                      </label>
                      <input
                        type="date"
                        required
                        min={today}
                        value={form.date}
                        onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-brand-700 mb-2">
                      <Clock size={14} className="inline mr-1 text-gold-500" /> Créneau choisi
                    </label>
                    <input
                      type="text"
                      value={form.creneau}
                      onChange={e => setForm(f => ({ ...f, creneau: e.target.value }))}
                      placeholder="Sélectionnez un créneau à gauche"
                      className="input-field"
                      readOnly
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-brand-700 mb-2">
                      Notes additionnelles
                    </label>
                    <textarea
                      value={form.notes}
                      onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                      rows={3}
                      className="input-field resize-none"
                      placeholder="Information complémentaire..."
                    />
                  </div>

                  {status === 'error' && (
                    <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
                      <AlertCircle size={16} /> Erreur lors de l'envoi. Veuillez réessayer.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-primary w-full justify-center !py-4 disabled:opacity-60"
                  >
                    {status === 'sending' ? 'Envoi en cours...' : 'Confirmer la réservation'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ReservationHero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotY = useSpring(useTransform(mx, [-1, 1], [-5, 5]), { stiffness: 120, damping: 18 });
  const rotX = useSpring(useTransform(my, [-1, 1], [5, -5]), { stiffness: 120, damping: 18 });
  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };
  const onLeave = () => { mx.set(0); my.set(0); };
  return (
    <section
      ref={heroRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative pt-32 pb-16 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950 text-white overflow-hidden"
      style={{ perspective: 1200 }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(234,166,48,0.2),transparent_70%)]" />
      <div className="hidden md:block absolute top-28 right-10 pointer-events-none">
        <DirectionSign label="Réservation →" size={140} />
      </div>
      <motion.div
        style={{ rotateY: rotY, rotateX: rotX, transformStyle: 'preserve-3d' }}
        className="container-custom relative z-10 text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl md:text-6xl font-bold mb-4"
        >
          <span className="text-gradient">Réservez</span> votre leçon
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-brand-200 max-w-2xl mx-auto text-lg"
        >
          Choisissez votre créneau et commencez votre formation dès aujourd'hui
        </motion.p>
      </motion.div>
    </section>
  );
}
