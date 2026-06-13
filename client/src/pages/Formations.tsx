import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Car, Bike, BookOpen, Wrench, Shield, Award, Clock, Tag, Check } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import { Link } from 'react-router-dom';

interface Formation { id: string; title: string; category: string; price: string; duration: string; description: string; icon: string; }

const iconMap: Record<string, any> = { car: Car, motorcycle: Bike, book: BookOpen, wrench: Wrench, shield: Shield, lightning: Award };

const categories = [
  { value: 'all', label: 'Toutes' },
  { value: 'voiture', label: 'Voiture' },
  { value: 'moto', label: 'Moto' },
  { value: 'code', label: 'Code' },
  { value: 'mecanique', label: 'Mécanique' }
];

export default function Formations() {
  const [formations, setFormations] = useState<Formation[]>([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetch('/api/formations').then(r => r.json()).then(setFormations);
  }, []);

  const filtered = filter === 'all' ? formations : formations.filter(f => f.category === filter);

  return (
    <div>
      {/* Page header */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(234,166,48,0.2),transparent_70%)]" />
        <div className="container-custom relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-block text-gold-400 text-sm tracking-widest uppercase mb-3"
          >
            Nos Formations
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-6xl font-bold mb-4"
          >
            Choisissez votre <span className="text-gradient">parcours</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-brand-200 max-w-2xl mx-auto text-lg"
          >
            Des formations sur mesure adaptées à votre rythme et à vos objectifs
          </motion.p>
        </div>
      </section>

      {/* Filter */}
      <section className="py-12 bg-white sticky top-0 z-30 border-b border-brand-100 shadow-sm">
        <div className="container-custom">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(cat => (
              <motion.button
                key={cat.value}
                onClick={() => setFilter(cat.value)}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-full font-medium text-sm transition-all ${
                  filter === cat.value
                    ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-brand-900 shadow-lg shadow-gold-500/30'
                    : 'bg-brand-50 text-brand-700 hover:bg-brand-100'
                }`}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((f, i) => {
              const Icon = iconMap[f.icon] || Car;
              return (
                <motion.div
                  key={f.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: (i % 6) * 0.1, duration: 0.5 }}
                  whileHover={{ y: -10 }}
                  className="card-base p-8 relative overflow-hidden group"
                >
                  {/* Decorative gradient */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-gold-100 to-transparent rounded-full -translate-y-20 translate-x-20 opacity-50 group-hover:scale-150 transition-transform duration-700" />

                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-700 to-brand-900 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 shadow-lg">
                      <Icon size={30} className="text-gold-400" />
                    </div>

                    <span className="inline-block px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs uppercase tracking-wider mb-3">
                      {f.category}
                    </span>

                    <h3 className="font-display text-2xl font-bold text-brand-900 mb-3">{f.title}</h3>
                    <p className="text-brand-600 mb-6 text-sm leading-relaxed">{f.description}</p>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-sm text-brand-700">
                        <Tag size={16} className="text-gold-500" />
                        <span className="font-semibold">Prix : {f.price}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-brand-700">
                        <Clock size={16} className="text-gold-500" />
                        <span>Durée : {f.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-brand-700">
                        <Check size={16} className="text-gold-500" />
                        <span>Suivi personnalisé</span>
                      </div>
                    </div>

                    <Link to="/reservation" className="btn-primary w-full justify-center !py-3 !text-sm">
                      Réserver maintenant
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-brand-500">
              Aucune formation trouvée dans cette catégorie.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
