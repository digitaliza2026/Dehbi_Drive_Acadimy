import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, Instagram, Facebook, CheckCircle2, AlertCircle } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { apiUrl } from '../lib/apiBase';

export default function Contact() {
  const settings = useSettings();
  const [form, setForm] = useState({ nom: '', email: '', sujet: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(apiUrl('/api/messages'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, lu: false })
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setForm({ nom: '', email: '', sujet: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <div>
      {/* Header */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_50%,rgba(234,166,48,0.2),transparent_70%)]" />
        <div className="container-custom relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-6xl font-bold mb-4"
          >
            <span className="text-gradient">Contactez</span>-nous
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-brand-200 max-w-2xl mx-auto text-lg"
          >
            Une question ? Notre équipe est à votre disposition
          </motion.p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-4"
            >
              <h2 className="font-display text-3xl font-bold text-brand-900 mb-6">
                Nos coordonnées
              </h2>

              <div className="card-base p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-700 to-brand-900 flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} className="text-gold-400" />
                </div>
                <div>
                  <div className="font-semibold text-brand-900 mb-1">Adresse</div>
                  <p className="text-brand-600 text-sm">{settings.address}</p>
                </div>
              </div>

              <div className="card-base p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-700 to-brand-900 flex items-center justify-center flex-shrink-0">
                  <Phone size={20} className="text-gold-400" />
                </div>
                <div>
                  <div className="font-semibold text-brand-900 mb-1">Téléphone</div>
                  <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="block text-brand-600 text-sm hover:text-gold-600">
                    {settings.phone} (Mobile)
                  </a>
                  <a href={`tel:${settings.phoneFixed.replace(/\s/g, '')}`} className="block text-brand-600 text-sm hover:text-gold-600">
                    {settings.phoneFixed} (Fixe)
                  </a>
                </div>
              </div>

              <div className="card-base p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-700 to-brand-900 flex items-center justify-center flex-shrink-0">
                  <Mail size={20} className="text-gold-400" />
                </div>
                <div>
                  <div className="font-semibold text-brand-900 mb-1">Email</div>
                  <a href={`mailto:${settings.email}`} className="text-brand-600 text-sm hover:text-gold-600 break-all">
                    {settings.email}
                  </a>
                </div>
              </div>

              <div className="card-base p-6">
                <div className="font-semibold text-brand-900 mb-3">Suivez-nous</div>
                <div className="flex gap-3">
                  <a
                    href={settings.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 text-white text-sm hover:scale-105 transition-transform"
                  >
                    <Instagram size={16} /> Instagram
                  </a>
                  <a
                    href={settings.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white text-sm hover:scale-105 transition-transform"
                  >
                    <Facebook size={16} /> Facebook
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border-2 border-green-200 rounded-3xl p-12 text-center"
                >
                  <CheckCircle2 size={64} className="text-green-500 mx-auto mb-4" />
                  <h3 className="font-display text-2xl font-bold text-green-900 mb-2">Message envoyé !</h3>
                  <p className="text-green-700 mb-6">Nous vous répondrons dans les plus brefs délais.</p>
                  <button onClick={() => setStatus('idle')} className="btn-outline !border-green-600 !text-green-600 hover:!bg-green-600 hover:!text-white">
                    Envoyer un autre message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={submit} className="bg-white rounded-3xl p-8 shadow-xl border border-brand-100">
                  <h2 className="font-display text-3xl font-bold text-brand-900 mb-6">Envoyez un message</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-brand-700 mb-2">Nom *</label>
                      <input type="text" required value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} className="input-field" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-700 mb-2">Email *</label>
                      <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="input-field" />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-brand-700 mb-2">Sujet *</label>
                    <input type="text" required value={form.sujet} onChange={e => setForm({ ...form, sujet: e.target.value })} className="input-field" />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-brand-700 mb-2">Message *</label>
                    <textarea required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={6} className="input-field resize-none" />
                  </div>

                  {status === 'error' && (
                    <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
                      <AlertCircle size={16} /> Erreur lors de l'envoi. Veuillez réessayer.
                    </div>
                  )}

                  <button type="submit" disabled={status === 'sending'} className="btn-primary w-full justify-center !py-4 disabled:opacity-60">
                    {status === 'sending' ? 'Envoi...' : <>Envoyer le message <Send size={18} /></>}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="pb-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden shadow-xl border border-brand-100"
          >
            <iframe
              src="https://www.google.com/maps?q=Espace+Rihab+F%C3%A8s,+Av+Allal+Ben+Abdellah,+F%C3%A8s,+Maroc&output=embed"
              width="100%"
              height="450"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title="Localisation Dehbi Drive Academy"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
