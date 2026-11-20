"use client";

import { motion } from "motion/react";

const QUALITIES = [
  "Kindness first",
  "Familiar faces",
  "Small groups",
  "Qualified team",
  "Blue Card checked",
  "First aid & CPR",
  "Child safe trained",
  "Always learning",
];

const HOVER_FILLS = [
  "hover:bg-sun",
  "hover:bg-coral",
  "hover:bg-leaf hover:text-cream",
  "hover:bg-grape hover:text-cream",
  "hover:bg-tangerine",
  "hover:bg-magenta hover:text-cream",
];

export default function Educators() {
  return (
    <section id="team" className="relative z-10 -mt-[55vh] bg-cream pb-20">
      <div className="flex justify-between px-4 pt-6 text-[13px] font-bold sm:px-5">
        <span>Our educators</span>
        <span>The heart of the centre</span>
      </div>
      <div className="grid gap-6 px-4 pb-12 pt-10 sm:px-5 lg:grid-cols-[1.1fr_1fr] lg:items-end">
        <h2 className="font-title font-bold text-[clamp(2.4rem,5.4vw,5.6rem)] lowercase leading-[1]">
          The people who make Treasure shine
        </h2>
        <p className="max-w-[36rem] text-[clamp(1.05rem,1.4vw,1.3rem)] leading-relaxed lg:justify-self-end">
          Our educators are qualified, caring and passionate about early childhood, and they keep
          learning through ongoing training. We hire for kindness first, because skills can be
          taught but warmth can&apos;t.
        </p>
      </div>

      <ul className="flex flex-wrap justify-center gap-2 px-3 sm:gap-3">
        {QUALITIES.map((quality, i) => (
          <motion.li
            key={quality}
            initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ type: "spring", stiffness: 220, damping: 16, delay: i * 0.06 }}
            className={`grid aspect-square w-[clamp(132px,22vw,210px)] place-items-center rounded-full border border-ink/25 bg-cream p-4 text-center font-title font-bold text-[clamp(1.05rem,1.6vw,1.45rem)] leading-tight transition-colors duration-300 lg:w-[clamp(150px,11.6vw,210px)] ${HOVER_FILLS[i % HOVER_FILLS.length]}`}
          >
            {quality}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
