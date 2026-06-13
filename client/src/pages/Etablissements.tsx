import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MapPin, Calendar, Star, ArrowRight } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';

interface Etab { id: string; name: string; city: string; province: string; year: number; description: string; featured?: boolean; }

export default function Etablissements() {
  const [items, setItems] = useState<Etab[]>([]);

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

  useEffect(() => {
    fetch('/api/etablissements')
      .then(r => r.json())
      .then((data: Etab[]) => setItems(data.sort((a, b) => a.year - b.year)));
  }, []);

  return (
    <div>
      {/* Header */}
      <section
        ref={heroRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative pt-32 pb-16 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950 text-white overflow-hidden"
        style={{ perspective: 1200 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(234,166,48,0.2),transparent_70%)]" />
        <motion.div
          style={{ rotateY: rotY, rotateX: rotX, transformStyle: 'preserve-3d' }}
          className="container-custom relative z-10 text-center"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-block text-gold-400 text-sm tracking-widest uppercase mb-3"
          >
            Notre Réseau
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-6xl font-bold mb-4"
          >
            Nos <span className="text-gradient">établissements</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-brand-200 max-w-2xl mx-auto text-lg"
          >
            7 centres répartis à travers le Maroc — présents partout grâce à nos collaborations avec de nombreuses auto-écoles
          </motion.p>
        </motion.div>
      </section>

      {/* Map-style network */}
      <section className="py-20 bg-brand-50/50">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Présence Nationale"
            title={<>Une expansion <span className="text-gradient">progressive</span></>}
            subtitle="De Casablanca en 1996 à Fès aujourd'hui, suivez notre parcours"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: 1200 }}>
            {items.map((etab, i) => (
              <motion.div
                key={etab.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: (i % 6) * 0.1, duration: 0.5 }}
                className="relative h-72 group"
                style={{ perspective: 1200 }}
              >
                <div
                  className="relative w-full h-full transition-transform duration-700 group-hover:[transform:rotateY(180deg)]"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Front face */}
                  <div
                    className={`card-base p-7 absolute inset-0 flex flex-col justify-center ${etab.featured ? 'ring-2 ring-gold-400 shadow-2xl' : ''}`}
                    style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                  >
                    {etab.featured && (
                      <div className="absolute -top-3 right-6">
                        <span className="inline-flex items-center gap-1 bg-gradient-to-r from-gold-500 to-gold-400 text-brand-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                          <Star size={12} className="fill-brand-900" /> Phare
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-700 to-brand-900 flex items-center justify-center flex-shrink-0">
                        <MapPin size={22} className="text-gold-400" />
                      </div>
                      <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gold-50 text-gold-700 text-xs font-bold">
                        <Calendar size={12} /> {etab.year}
                      </div>
                    </div>
                    <h3 className="font-display text-xl font-bold text-brand-900 mb-2">{etab.name}</h3>
                    <div className="text-brand-700 font-semibold mb-1">{etab.city}</div>
                    <div className="text-brand-500 text-sm">{etab.province}</div>
                  </div>

                  {/* Back face */}
                  <div
                    className="card-base p-7 absolute inset-0 flex flex-col justify-between bg-gradient-to-br from-brand-800 to-brand-950 text-white"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <div>
                      <h3 className="font-display text-lg font-bold text-gold-300 mb-3">{etab.name}</h3>
                      <p className="text-brand-100 text-sm leading-relaxed">{etab.description}</p>
                    </div>
                    <a
                      href="#timeline"
                      className="inline-flex items-center gap-1 mt-4 text-gold-300 hover:text-gold-200 text-sm font-semibold"
                    >
                      En savoir plus <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline visualization */}
      <section id="timeline" className="py-20 bg-gradient-to-br from-brand-900 to-brand-950 text-white">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Chronologie"
            title={<span className="text-white">De <span className="text-gradient">1996</span> à <span className="text-gradient">2025</span></span>}
            subtitle="30 ans de développement continu"
          />

          <div className="relative max-w-4xl mx-auto mt-12">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-gold-500 via-gold-400 to-gold-500 -translate-x-1/2 hidden md:block" />

            {items.map((etab, i) => (
              <motion.div
                key={etab.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
                className={`relative mb-10 md:flex ${i % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}
              >
                <div className={`md:w-5/12 ${i % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-gold-400/50 transition-colors">
                    <div className="font-display text-3xl text-gradient font-bold mb-2">{etab.year}</div>
                    <h3 className="font-semibold text-lg mb-1">{etab.name}</h3>
                    <div className="text-brand-300 text-sm">{etab.city} • {etab.province}</div>
                  </div>
                </div>
                <div className="hidden md:block absolute left-1/2 top-6 -translate-x-1/2 w-5 h-5 rounded-full bg-gold-400 ring-4 ring-brand-900" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
