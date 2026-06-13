import { motion } from 'framer-motion';
import { useId } from 'react';

interface BaseProps {
  className?: string;
  size?: number;
}

const floatAnim = {
  animate: { y: [0, -6, 0], rotate: [-1, 1, -1] },
  transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' as const }
};

function SignDefs({ uid }: { uid: string }) {
  return (
    <defs>
      <linearGradient id={`pole-${uid}`} x1="0" x2="1" y1="0" y2="0">
        <stop offset="0%" stopColor="#6b7280" />
        <stop offset="50%" stopColor="#d1d5db" />
        <stop offset="100%" stopColor="#6b7280" />
      </linearGradient>
      <filter id={`shadow-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="3" stdDeviation="2" floodColor="#000" floodOpacity="0.35" />
      </filter>
    </defs>
  );
}

function Pole({
  uid,
  x = 50,
  width = 4,
  height = 28,
  top = 78
}: {
  uid: string;
  x?: number;
  width?: number;
  height?: number;
  top?: number;
}) {
  return (
    <>
      <rect x={x - width / 2} y={top} width={width} height={height} fill={`url(#pole-${uid})`} />
      <ellipse cx={x} cy={top + height} rx={width * 1.8} ry={1.5} fill="rgba(0,0,0,0.25)" />
    </>
  );
}

export function SpeedSign({ speed = 50, className = '', size = 100 }: BaseProps & { speed?: number }) {
  const uid = useId().replace(/:/g, '');
  return (
    <motion.svg
      width={size}
      height={size * 1.1}
      viewBox="0 0 100 110"
      className={className}
      {...floatAnim}
    >
      <SignDefs uid={uid} />
      <g filter={`url(#shadow-${uid})`}>
        <circle cx="50" cy="38" r="32" fill="#ffffff" stroke="#dc2626" strokeWidth="7" />
        <text
          x="50"
          y="50"
          textAnchor="middle"
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight="900"
          fontSize="28"
          fill="#1f2937"
        >
          {speed}
        </text>
      </g>
      <Pole uid={uid} top={70} />
    </motion.svg>
  );
}

export function DirectionSign({ label = 'Direction', className = '', size = 140 }: BaseProps & { label?: string }) {
  const uid = useId().replace(/:/g, '');
  const w = size;
  const h = size * 0.85;
  return (
    <motion.svg
      width={w}
      height={h}
      viewBox="0 0 140 120"
      className={className}
      {...floatAnim}
    >
      <SignDefs uid={uid} />
      <g filter={`url(#shadow-${uid})`}>
        <rect x="8" y="14" width="124" height="56" rx="4" fill="#1d4ed8" stroke="#ffffff" strokeWidth="3" />
        <text
          x="70"
          y="48"
          textAnchor="middle"
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight="700"
          fontSize="14"
          fill="#ffffff"
        >
          {label}
        </text>
      </g>
      <Pole uid={uid} x={70} top={70} height={40} />
    </motion.svg>
  );
}

export function WarningSign({ label = 'Attention', className = '', size = 100 }: BaseProps & { label?: string }) {
  const uid = useId().replace(/:/g, '');
  return (
    <motion.svg
      width={size}
      height={size * 1.1}
      viewBox="0 0 100 110"
      className={className}
      {...floatAnim}
    >
      <SignDefs uid={uid} />
      <g filter={`url(#shadow-${uid})`}>
        <polygon points="50,6 92,72 8,72" fill="#fbbf24" stroke="#1f2937" strokeWidth="5" strokeLinejoin="round" />
        <text
          x="50"
          y="58"
          textAnchor="middle"
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight="700"
          fontSize="13"
          fill="#1f2937"
        >
          {label}
        </text>
      </g>
      <Pole uid={uid} top={72} />
    </motion.svg>
  );
}

export function PrioritySign({ className = '', size = 100 }: BaseProps) {
  const uid = useId().replace(/:/g, '');
  return (
    <motion.svg
      width={size}
      height={size * 1.15}
      viewBox="0 0 100 115"
      className={className}
      {...floatAnim}
    >
      <SignDefs uid={uid} />
      <g filter={`url(#shadow-${uid})`}>
        <polygon points="50,6 92,40 50,74 8,40" fill="#fbbf24" stroke="#ffffff" strokeWidth="5" />
        <polygon points="50,18 80,40 50,62 20,40" fill="none" stroke="#1f2937" strokeWidth="2.5" />
      </g>
      <Pole uid={uid} top={74} height={36} />
    </motion.svg>
  );
}
