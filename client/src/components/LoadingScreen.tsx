import { motion } from 'framer-motion';
import { SpeedSign, WarningSign, StopSign } from './RoadSign';

const ROAD_DOTS = Array.from({ length: 10 });

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950 overflow-hidden"
      style={{ perspective: 1200 }}
    >
      {/* Ambient particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold-400 rounded-full"
            initial={{
              x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
              y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0,
              opacity: 0
            }}
            animate={{ y: [null, -100], opacity: [0, 1, 0] }}
            transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </div>

      {/* Floating road signs */}
      <motion.div
        className="absolute bottom-24 left-4 md:left-12 z-10"
        initial={{ opacity: 0, x: -40, y: 20 }}
        animate={{ opacity: 0.85, x: 0, y: 0 }}
        transition={{ delay: 0, duration: 0.6, ease: 'easeOut' }}
      >
        <SpeedSign speed={30} size={50} className="md:hidden" />
        <SpeedSign speed={30} size={70} className="hidden md:block" />
      </motion.div>
      <motion.div
        className="absolute bottom-32 right-4 md:right-16 z-10"
        initial={{ opacity: 0, x: 40, y: 20 }}
        animate={{ opacity: 0.85, x: 0, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
      >
        <WarningSign label="GO" size={50} className="md:hidden" />
        <WarningSign label="GO" size={70} className="hidden md:block" />
      </motion.div>
      <motion.div
        className="absolute top-16 right-4 md:top-20 md:right-20 z-10"
        initial={{ opacity: 0, x: 40, y: -20 }}
        animate={{ opacity: 0.85, x: 0, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
      >
        <SpeedSign speed={50} size={44} className="md:hidden" />
        <SpeedSign speed={50} size={60} className="hidden md:block" />
      </motion.div>
      <motion.div
        className="absolute top-20 left-4 md:left-20 z-10"
        initial={{ opacity: 0, x: -40, y: -20 }}
        animate={{ opacity: 0.85, x: 0, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6, ease: 'easeOut' }}
      >
        <StopSign size={44} className="md:hidden" />
        <StopSign size={60} className="hidden md:block" />
      </motion.div>

      {/* 3D Steering wheel with two layers */}
      <motion.div
        className="relative mb-10"
        style={{ transformStyle: 'preserve-3d' }}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        {/* Back layer — darker ring, lags */}
        <motion.svg
          width="140"
          height="140"
          viewBox="0 0 120 120"
          className="absolute top-1 left-1"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, ease: 'linear', repeat: Infinity }}
        >
          <circle cx="60" cy="60" r="52" fill="none" stroke="#8a5a14" strokeWidth="8" opacity="0.6" />
        </motion.svg>
        {/* Front layer — gold ring with 3D rotation */}
        <motion.svg
          width="140"
          height="140"
          viewBox="0 0 120 120"
          className="relative drop-shadow-[0_8px_16px_rgba(234,166,48,0.5)]"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: 360, rotateZ: 360 }}
          transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
        >
          <circle cx="60" cy="60" r="52" fill="none" stroke="#eaa630" strokeWidth="6" />
          <circle cx="60" cy="60" r="12" fill="#eaa630" />
          <line x1="60" y1="14" x2="60" y2="48" stroke="#eaa630" strokeWidth="6" strokeLinecap="round" />
          <line x1="60" y1="72" x2="60" y2="106" stroke="#eaa630" strokeWidth="6" strokeLinecap="round" />
          <line x1="14" y1="60" x2="48" y2="60" stroke="#eaa630" strokeWidth="6" strokeLinecap="round" />
          <line x1="72" y1="60" x2="106" y2="60" stroke="#eaa630" strokeWidth="6" strokeLinecap="round" />
        </motion.svg>

        {/* Reflection / shadow ellipse below */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 -bottom-6 w-32 h-3 rounded-full bg-gold-400/40 blur-md"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* 3D layered text */}
      <motion.h1
        className="font-display text-4xl md:text-5xl font-bold text-white mb-2 tracking-wide"
        style={{
          transformStyle: 'preserve-3d',
          textShadow:
            '1px 1px 0 #b86d10, 2px 2px 0 #a55e0e, 3px 3px 0 #925010, 4px 4px 8px rgba(0,0,0,0.4)'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, rotateX: [-3, 3, -3] }}
        transition={{
          opacity: { delay: 0.3, duration: 0.6 },
          y: { delay: 0.3, duration: 0.6 },
          rotateX: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
        }}
      >
        Dehbi <span className="text-gradient">Drive</span> Academy
      </motion.h1>

      <motion.p
        className="text-brand-200 text-sm md:text-base tracking-widest uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        30 ans d'excellence
      </motion.p>

      {/* 3D Loading bar */}
      <motion.div
        className="mt-8 w-56 h-2 rounded-full overflow-hidden bg-brand-700/60"
        style={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.div
          className="h-full"
          style={{
            background: 'linear-gradient(to right, #eaa630, #f5d88c)',
            boxShadow: '0 2px 8px rgba(234,166,48,0.6), inset 0 1px 0 rgba(255,255,255,0.3)'
          }}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Particle road — bottom marker dots scrolling right→left */}
      <div className="absolute bottom-6 left-0 right-0 h-2 overflow-hidden pointer-events-none">
        {ROAD_DOTS.map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 w-6 h-1 rounded-full bg-white/70"
            initial={{ x: '100vw' }}
            animate={{ x: '-100vw' }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear', delay: i * 0.3 }}
          />
        ))}
      </div>
    </motion.div>
  );
}
