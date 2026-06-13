import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { Car, Bike, BookOpen, Wrench, Shield, Award, Users, MapPin, ChevronRight, Star, Quote, ArrowRight } from 'lucide-react';
import AnimatedCounter from '../components/AnimatedCounter';
import SectionHeader from '../components/SectionHeader';
import { SpeedSign, PrioritySign, DirectionSign, StopSign, YieldSign, WarningSign } from '../components/RoadSign';
import { useSettings } from '../context/SettingsContext';
import { apiUrl } from '../lib/apiBase';
import { seedFormations, seedTemoignages } from '../lib/seedData';
import { useIsMobile } from '../lib/useIsMobile';

interface Formation { id: string; title: string; category: string; price: string; duration: string; description: string; icon: string; featured?: boolean; }
interface Testimonial { id: string; name: string; role: string; content: string; rating: number; }

const iconMap: Record<string, any> = { car: Car, motorcycle: Bike, book: BookOpen, wrench: Wrench, shield: Shield, lightning: Award };

export default function Home() {
  const settings = useSettings();
  const isMobile = useIsMobile();
  const [formations, setFormations] = useState<Formation[]>(seedFormations.filter(f => f.featured) as Formation[]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(seedTemoignages as Testimonial[]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, 250]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  // Hero parallax mouse tilt
  const heroRef = useRef<HTMLElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const heroRotY = useSpring(useTransform(mx, [-1, 1], [-5, 5]), { stiffness: 120, damping: 18 });
  const heroRotX = useSpring(useTransform(my, [-1, 1], [5, -5]), { stiffness: 120, damping: 18 });
  const onHeroMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };
  const onHeroLeave = () => { mx.set(0); my.set(0); };

  useEffect(() => {
    fetch(apiUrl('/api/formations'))
      .then(r => r.json())
      .then((d: Formation[]) => { if (Array.isArray(d) && d.length) setFormations(d.filter(f => f.featured)); })
      .catch(() => {});
    fetch(apiUrl('/api/temoignages'))
      .then(r => r.json())
      .then((d: Testimonial[]) => { if (Array.isArray(d) && d.length) setTestimonials(d); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const t = setInterval(() => setActiveTestimonial(i => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, [testimonials.length]);

  return (
    <div>
      {/* HERO */}
      <section
        ref={heroRef}
        onMouseMove={onHeroMove}
        onMouseLeave={onHeroLeave}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ perspective: 1200 }}
      >
        {/* Parallax background */}
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 z-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center scale-110"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1280&q=75)' }}
          />
          <div className="absolute inset-0 hero-gradient" />
        </motion.div>

        {/* Animated decorative elements */}
        <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gold-400/40 rounded-full"
              initial={{
                x: Math.random() * 100 + '%',
                y: Math.random() * 100 + '%',
              }}
              animate={{
                y: [null, '-20%'],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 4
              }}
            />
          ))}
        </div>

        <motion.div
          style={{ opacity: heroOpacity, rotateY: heroRotY, rotateX: heroRotX, transformStyle: 'preserve-3d' }}
          className="container-custom relative z-20 text-center text-white py-32"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-gold-500/20 border border-gold-400/30 text-gold-300 text-xs md:text-sm tracking-widest uppercase mb-6 backdrop-blur-sm">
              ★ Depuis {settings.stats.since} — {settings.stats.candidates.toLocaleString('fr-FR')}+ Diplômés
            </span>
          </motion.div>

          <motion.h1
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="text-gradient">30 ans</span> d'excellence<br />
            dans l'enseignement<br />
            de la conduite
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-brand-100 mb-10 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Plus de 10 000 candidats accompagnés vers la réussite de leur permis de conduire avec rigueur, patience et professionnalisme.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link to="/reservation" className="btn-primary">
              Réserver une leçon <ArrowRight size={18} />
            </Link>
            <Link to="/formations" className="btn-secondary">
              Nos formations
            </Link>
          </motion.div>
        </motion.div>

        {/* Road sign decorations */}
        <div className="absolute bottom-20 right-3 md:bottom-12 md:right-10 z-20 pointer-events-none">
          <SpeedSign speed={30} size={isMobile ? 56 : 90} />
        </div>
        <div className="absolute top-24 right-3 md:top-32 md:left-12 md:right-auto z-20 pointer-events-none opacity-80">
          <StopSign size={isMobile ? 50 : 80} />
        </div>
        <div className="hidden sm:block absolute bottom-32 left-8 z-20 pointer-events-none opacity-70">
          <DirectionSign label="Réussite →" size={120} />
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="py-20 bg-gradient-to-br from-brand-900 to-brand-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(234,166,48,0.15),transparent_50%)]" />
        <div className="absolute top-4 right-4 md:top-6 md:right-6 opacity-30 pointer-events-none">
          <PrioritySign size={isMobile ? 60 : 120} />
        </div>
        <div className="absolute bottom-4 left-4 md:bottom-10 md:left-10 opacity-25 pointer-events-none">
          <YieldSign size={isMobile ? 50 : 90} />
        </div>
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: settings.stats.years, suffix: '+', label: "Années d'expérience", icon: Award },
              { value: settings.stats.candidates, suffix: '+', label: 'Candidats réussis', icon: Users },
              { value: settings.stats.branches, suffix: '', label: 'Établissements', icon: MapPin },
              { value: settings.stats.since, suffix: '', label: 'Depuis', icon: Star, raw: true }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="text-center group"
              >
                <div className="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-500 to-gold-600 items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-gold-500/30">
                  <stat.icon size={28} className="text-brand-900" />
                </div>
                <div className="font-display text-4xl md:text-5xl font-bold text-gradient mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-brand-200 text-sm uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMATIONS */}
      <section className="py-24 bg-brand-50/50" style={{ perspective: 1000 }}>
        <div className="container-custom">
          <SectionHeader
            eyebrow="Nos Formations"
            title={<>Des formations <span className="text-gradient">adaptées</span> à tous</>}
            subtitle="Découvrez nos programmes conçus pour vous mener à la réussite avec une pédagogie éprouvée"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {formations.map((f, i) => {
              const Icon = iconMap[f.icon] || Car;
              return (
                <motion.div
                  key={f.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  whileHover={{ rotateY: 8, rotateX: -4, scale: 1.04, z: 40, y: -10 }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="card-base p-8 group cursor-pointer hover:shadow-[8px_16px_40px_rgba(30,49,99,0.2)]"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-700 to-brand-900 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <Icon size={26} className="text-gold-400" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-brand-900 mb-2">{f.title}</h3>
                  <p className="text-brand-600 mb-4 text-sm leading-relaxed">{f.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-brand-100">
                    <div>
                      <div className="text-gold-600 font-bold text-lg">{f.price}</div>
                      <div className="text-xs text-brand-500">{f.duration}</div>
                    </div>
                    <Link to="/formations" className="text-brand-700 group-hover:text-gold-600 transition-colors">
                      <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link to="/formations" className="btn-outline">
              Voir toutes les formations <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 bg-white relative overflow-hidden" style={{ perspective: 1000 }}>
        <div className="absolute top-8 right-4 md:right-12 opacity-30 pointer-events-none">
          <WarningSign label="Excellence" size={isMobile ? 56 : 100} />
        </div>
        <div className="container-custom relative z-10">
          <SectionHeader
            eyebrow="Pourquoi Nous Choisir"
            title={<>L'excellence au service de votre <span className="text-gradient">réussite</span></>}
            subtitle="Une approche unique forgée par 30 années d'expérience et de passion"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, title: '30 ans d\'expérience', desc: 'Fondateur formé à la première promotion d\'instructeurs au Maroc en 1994.' },
              { icon: Users, title: 'Pédagogie personnalisée', desc: 'Adaptation aux nouvelles générations avec rigueur et patience.' },
              { icon: BookOpen, title: 'Supports numériques', desc: 'Vidéos, applications et simulations pour le code de la route.' },
              { icon: Shield, title: 'Sécurité routière', desc: 'Maîtrise approfondie des normes et de la réglementation.' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ rotateY: 8, rotateX: -4, scale: 1.04, z: 40, y: -8 }}
                style={{ transformStyle: 'preserve-3d' }}
                className="text-center p-6 rounded-2xl hover:bg-brand-50/50 transition-colors hover:shadow-[8px_16px_40px_rgba(30,49,99,0.2)]"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                  className="inline-flex w-20 h-20 rounded-3xl bg-gradient-to-br from-gold-400 to-gold-600 items-center justify-center mb-5 shadow-xl shadow-gold-500/30"
                >
                  <item.icon size={36} className="text-brand-900" />
                </motion.div>
                <h3 className="font-display text-xl font-bold text-brand-900 mb-2">{item.title}</h3>
                <p className="text-brand-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="py-24 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(234,166,48,0.1),transparent_50%)]" />
          <div className="container-custom relative z-10">
            <SectionHeader
              eyebrow="Témoignages"
              title={<span className="text-white">Ils nous ont fait <span className="text-gradient">confiance</span></span>}
              subtitle="Plus de 10 000 réussites en 30 ans"
            />

            <div className="max-w-3xl mx-auto">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10"
              >
                <Quote className="text-gold-400 mb-4" size={40} />
                <p className="text-lg md:text-xl text-brand-100 leading-relaxed mb-6 italic">
                  "{testimonials[activeTestimonial]?.content}"
                </p>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonials[activeTestimonial]?.rating || 5)].map((_, i) => (
                    <Star key={i} size={18} className="fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <div>
                  <div className="font-bold text-white">{testimonials[activeTestimonial]?.name}</div>
                  <div className="text-sm text-brand-300">{testimonials[activeTestimonial]?.role}</div>
                </div>
              </motion.div>

              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === activeTestimonial ? 'w-8 bg-gold-400' : 'w-2 bg-white/30'
                    }`}
                    aria-label={`Témoignage ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-gold-50 to-brand-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-brand-800 to-brand-900 rounded-3xl p-12 md:p-16 text-center text-white overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-gold-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gold-500/20 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
                Prêt à <span className="text-gradient">conduire</span> votre avenir ?
              </h2>
              <p className="text-brand-100 mb-8 text-lg max-w-2xl mx-auto">
                Rejoignez les milliers de candidats qui nous ont fait confiance pour obtenir leur permis.
              </p>
              <Link to="/reservation" className="btn-primary !text-base">
                Commencer maintenant <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
