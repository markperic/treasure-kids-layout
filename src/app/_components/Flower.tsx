"use client";

import { motion, type MotionValue } from "motion/react";

// Radius of the solid coral area relative to the full graphic width. Hero uses
// this to work out how far to scale the flower so coral covers the viewport.
export const CORAL_INNER_RATIO = 0.27;

const BADGE_PATH = (() => {
  const steps = 240;
  const points: string[] = [];
  for (let i = 0; i < steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const r = 91 + 7 * Math.cos(12 * t);
    points.push(`${(r * Math.cos(t)).toFixed(2)},${(r * Math.sin(t)).toFixed(2)}`);
  }
  return `M${points.join("L")}Z`;
})();

const PETALS = Array.from({ length: 6 }, (_, i) => i * 60);

export default function Flower({ centerScale }: { centerScale: MotionValue<number> }) {
  return (
    <svg viewBox="-100 -100 200 200" className="block size-full overflow-visible" aria-hidden>
      <g className="tk-motion" style={{ animation: "tk-spin 48s linear infinite", transformOrigin: "0 0" }}>
        <path d={BADGE_PATH} fill="var(--color-cream)" />
        <circle r="56" fill="var(--color-coral)" />
        {PETALS.map((deg) => (
          <ellipse
            key={deg}
            cx="0"
            cy="-46"
            rx="25"
            ry="33"
            fill="var(--color-coral)"
            transform={`rotate(${deg})`}
          />
        ))}
      </g>
      <motion.g style={{ scale: centerScale, transformBox: "fill-box", transformOrigin: "center" }}>
        <circle r="27" fill="var(--color-sun)" />
        <circle cx="-8.5" cy="-5" r="3.6" fill="var(--color-ink)" />
        <circle cx="8.5" cy="-5" r="3.6" fill="var(--color-ink)" />
        <path
          d="M-11.5 4.5 Q0 16 11.5 4.5"
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth="3.6"
          strokeLinecap="round"
        />
      </motion.g>
    </svg>
  );
}
