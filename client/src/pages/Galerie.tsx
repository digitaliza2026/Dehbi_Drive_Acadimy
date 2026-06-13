import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

interface Photo { id: string; url: string; title: string; category: string; }

export default function Galerie() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selected, setSelected] = useState<Photo | null>(null);

  useEffect(() => {
    fetch('/api/galerie').then(r => r.json()).then(setPhotos);
  }, []);

  return (
    <div>
      {/* Header */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_50%,rgba(234,166,48,0.2),transparent_70%)]" />
        <div className="container-custom relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-6xl font-bold mb-4"
          >
            Notre <span className="text-gradient">galerie</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-brand-200 max-w-2xl mx-auto text-lg"
          >
            Découvrez nos centres, nos véhicules et nos moments de formation
          </motion.p>
        </div>
      </section>

      {/* Masonry */}
      <section className="py-20">
        <div className="container-custom">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {photos.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: (i % 9) * 0.05, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelected(p)}
                className="break-inside-avoid relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg"
              >
                <img
                  src={p.url}
                  alt={p.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900/80 via-brand-900/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5">
                  <div className="text-white font-display text-lg font-bold">{p.title}</div>
                  <div className="text-gold-300 text-xs uppercase tracking-wider mt-1">{p.category}</div>
                  <ZoomIn className="absolute top-4 right-4 text-white" size={24} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[9000] bg-brand-950/95 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
            >
              <X size={24} />
            </button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={e => e.stopPropagation()}
              src={selected.url}
              alt={selected.title}
              className="max-h-[85vh] max-w-[90vw] rounded-2xl shadow-2xl"
            />
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-white">
              <div className="font-display text-2xl font-bold">{selected.title}</div>
              <div className="text-gold-300 text-sm uppercase tracking-wider mt-1">{selected.category}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
