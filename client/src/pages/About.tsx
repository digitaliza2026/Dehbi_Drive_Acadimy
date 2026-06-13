import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Award, BookOpen, Shield, Heart, Target, Users } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import { SpeedSign, StopSign, PrioritySign } from '../components/RoadSign';
import { useSettings } from '../context/SettingsContext';
import { useIsMobile } from '../lib/useIsMobile';

const timeline = [
  { year: '1994', title: 'Formation à Casablanca', desc: "Intégration de l'Institut Supérieur Industriel de Casablanca — première promotion au Maroc pour la formation spécialisée des moniteurs de conduite. Condition d'accès : diplôme de Technicien Spécialisé en Mécanique Automobile." },
  { year: '1996', title: 'Première auto-école', desc: 'Création de la première auto-école avec une pédagogie axée sur la rigueur, la patience et le professionnalisme.' },
  { year: '2014', title: 'Auto-école Maroc Conduite', desc: 'Ouverture à Karia Ba Mohammed, Province de Taounate.' },
  { year: '2020', title: 'Auto-école Mehdi Dehbi', desc: 'Ouverture à Bouchabel, Province de Taounate.' },
  { year: '2021', title: 'Auto-école Dehbi', desc: 'Ouverture à Oulja, Province de Taounate.' },
  { year: '2022', title: 'Auto-école Code Dehbi', desc: 'Ouverture à Hamria, Province de Moulay Yaacoub.' },
  { year: '2024', title: 'Dehbi Drive Academy 1', desc: "Ouverture au centre-ville de Fès — début d'une nouvelle ère." },
  { year: '2025', title: 'Dehbi Drive Academy 2', desc: 'Ouverture à Ras El Mae, Fès — 7ème établissement.' }
];

const values = [
  { icon: Award, title: 'Rigueur', desc: 'Une exigence constante dans la qualité de notre enseignement.' },
  { icon: Heart, title: 'Patience', desc: "Chaque candidat avance à son rythme, dans un climat bienveillant." },
  { icon: Target, title: 'Professionnalisme', desc: 'Une approche structurée et des résultats mesurables.' },
  { icon: Users, title: 'Adaptation', desc: 'Méthodes pédagogiques évolutives, adaptées aux nouvelles générations.' },
  { icon: BookOpen, title: 'Innovation', desc: 'Supports numériques modernes : vidéos, applications, simulations.' },
  { icon: Shield, title: 'Sécurité', desc: 'Maîtrise approfondie des normes et de la réglementation routière.' }
];

export default function About() {
  const settings = useSettings();
  const isMobile = useIsMobile();

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
    <div>
      {/* Header */}
      <section
        ref={heroRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative pt-32 pb-16 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950 text-white overflow-hidden"
        style={{ perspective: 1200 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(234,166,48,0.2),transparent_70%)]" />
        <div className="absolute top-24 right-3 md:top-28 md:right-10 opacity-60 pointer-events-none z-10">
          <PrioritySign size={isMobile ? 60 : 110} />
        </div>
        <motion.div
          style={{ rotateY: rotY, rotateX: rotX, transformStyle: 'preserve-3d' }}
          className="container-custom relative z-20 text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-6xl font-bold mb-4"
          >
            À <span className="text-gradient">propos</span> de nous
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-brand-200 max-w-3xl mx-auto text-lg"
          >
            Un parcours de 30 années dédié à l'excellence dans l'enseignement de la conduite au Maroc
          </motion.p>
        </motion.div>
      </section>

      {/* Founder story */}
      <section className="py-20 bg-brand-50/50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-gold-600 font-semibold text-sm tracking-widest uppercase mb-3">
                Notre Histoire
              </span>
              <h2 className="section-title">
                Un parcours <span className="text-gradient">d'exception</span>
              </h2>
              <div className="space-y-4 text-brand-700 leading-relaxed">
                <p>
                  Notre aventure a commencé en <strong className="text-brand-900">1994</strong>, avec l'intégration de l'Institut Supérieur Industriel de Casablanca — la <strong className="text-brand-900">première promotion au Maroc</strong> dédiée à la formation spécialisée des moniteurs de conduite.
                </p>
                <p>
                  La condition d'accès à cette formation prestigieuse : un diplôme de Technicien Spécialisé en Mécanique Automobile. Cette double expertise — pédagogique et technique — constitue le socle de notre approche unique.
                </p>
                <p>
                  En <strong className="text-brand-900">1996</strong>, nous avons créé notre première auto-école avec une pédagogie axée sur trois piliers fondamentaux : <strong className="text-gold-600">la rigueur, la patience et le professionnalisme</strong>.
                </p>
                <p>
                  Trente ans plus tard, c'est avec fierté que nous avons accompagné <strong className="text-brand-900">plus de {settings.stats.candidates.toLocaleString('fr-FR')} candidats</strong> vers la réussite de leur permis de conduire à travers nos {settings.stats.branches} établissements et nos partenariats sur tout le territoire marocain.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80"
                  alt="Histoire Dehbi Drive Academy"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                className="absolute -bottom-6 -right-6 bg-gradient-to-br from-gold-500 to-gold-600 rounded-2xl p-6 text-brand-900 shadow-2xl"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ y: [0, -8, 0], rotateX: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="font-display text-4xl font-bold">30+</div>
                <div className="text-sm uppercase tracking-wider">Années</div>
              </motion.div>
              <motion.div
                className="absolute -top-6 -left-6 bg-white rounded-2xl p-6 shadow-2xl"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ y: [0, -8, 0], rotateX: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              >
                <div className="font-display text-4xl font-bold text-brand-900">10K+</div>
                <div className="text-sm uppercase tracking-wider text-brand-600">Diplômés</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Nos Valeurs"
            title={<>Ce qui fait notre <span className="text-gradient">différence</span></>}
            subtitle="Six piliers fondamentaux qui guident chacune de nos actions au quotidien"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="card-base p-6"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                  className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 items-center justify-center mb-4 shadow-lg"
                >
                  <v.icon size={26} className="text-brand-900" />
                </motion.div>
                <h3 className="font-display text-xl font-bold text-brand-900 mb-2">{v.title}</h3>
                <p className="text-brand-600 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(234,166,48,0.1),transparent_70%)]" />
        <div className="container-custom relative z-10">
          <SectionHeader
            eyebrow="Notre Parcours"
            title={<span className="text-white">30 ans de <span className="text-gradient">développement</span></span>}
            subtitle="De 1994 à aujourd'hui, retracez les étapes clés de notre histoire"
          />

          <div className="relative max-w-4xl mx-auto mt-16">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-gold-500 via-gold-400 to-gold-500 md:-translate-x-1/2" />

            {timeline.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6 }}
                  className={`relative pl-12 md:pl-0 mb-10 md:flex ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}
                >
                  <div className={`md:w-5/12 ${isLeft ? 'md:pr-8 md:text-right' : 'md:pl-8'} relative`}>
                    {item.year === '1994' && (
                      <div className="absolute -top-2 right-2 md:-top-4 md:-right-12 opacity-80 pointer-events-none">
                        <SpeedSign speed={94} size={isMobile ? 42 : 56} />
                      </div>
                    )}
                    {item.year === '2024' && (
                      <div className="absolute -top-2 right-2 md:-top-4 md:-right-12 opacity-70 pointer-events-none">
                        <StopSign size={isMobile ? 42 : 56} />
                      </div>
                    )}
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-gold-400/50 transition-colors">
                      <div className="font-display text-3xl text-gradient font-bold mb-2">{item.year}</div>
                      <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                      <p className="text-brand-300 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                  <div className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 w-5 h-5 rounded-full bg-gold-400 ring-4 ring-brand-900 z-10" />
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-16 bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 max-w-3xl mx-auto"
          >
            <p className="text-brand-100 text-lg italic">
              "Présents dans tout le Maroc grâce à nos collaborations avec de nombreuses auto-écoles, nous continuons à œuvrer pour l'excellence dans l'enseignement de la conduite."
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
