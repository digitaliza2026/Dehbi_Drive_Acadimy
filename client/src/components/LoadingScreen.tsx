import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950"
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold-400 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0
            }}
            animate={{
              y: [null, -100],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Steering wheel */}
      <motion.div
        className="relative mb-8"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        <motion.svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, ease: 'linear', repeat: Infinity }}
        >
          {/* Outer ring */}
          <circle cx="60" cy="60" r="52" fill="none" stroke="#eaa630" strokeWidth="6" />
          {/* Inner hub */}
          <circle cx="60" cy="60" r="12" fill="#eaa630" />
          {/* Spokes */}
          <line x1="60" y1="14" x2="60" y2="48" stroke="#eaa630" strokeWidth="6" strokeLinecap="round" />
          <line x1="60" y1="72" x2="60" y2="106" stroke="#eaa630" strokeWidth="6" strokeLinecap="round" />
          <line x1="14" y1="60" x2="48" y2="60" stroke="#eaa630" strokeWidth="6" strokeLinecap="round" />
          <line x1="72" y1="60" x2="106" y2="60" stroke="#eaa630" strokeWidth="6" strokeLinecap="round" />
        </motion.svg>

        {/* Glowing effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gold-400/30 blur-2xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Logo text */}
      <motion.h1
        className="font-display text-4xl md:text-5xl font-bold text-white mb-2 tracking-wide"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
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

      {/* Loading bar */}
      <motion.div
        className="mt-8 w-48 h-1 bg-brand-700/50 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-gold-500 to-gold-300"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.div>
  );
}
