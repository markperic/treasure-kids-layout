"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

const DETAILS = [
  ["Find us", "23 Ipswich Street, Riverview QLD 4303"],
  ["Open", "Monday to Friday, 6:30am – 6:00pm"],
  ["Tours", "At a time that suits you"],
  ["Enquiries", "Join the waitlist any time"],
];

const HEADLINE = "come see us";
const SHAPES = ["dot", "flower", "dot", "sparkle"] as const;
const SHAPE_COLOURS = ["var(--color-coral)", "var(--color-magenta)", "var(--color-coral)", "var(--color-grape)"];
const ROWS = 3;
const COLS = 11;

export default function Visit() {
  const patternRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: patternRef, offset: ["start end", "end start"] });
  const spin = useTransform(scrollYProgress, [0, 1], [-90, 270]);

  return (
    <>
      <section className="bg-ink text-cream">
        <motion.h2
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.6 }}
          transition={{ staggerChildren: 0.035 }}
          aria-label={HEADLINE}
          className="flex justify-center overflow-hidden whitespace-nowrap px-2 pb-6 pt-14 font-title font-bold text-[13.5vw] leading-[1.05]"
        >
          {HEADLINE.split("").map((char, i) => (
            <motion.span
              key={i}
              aria-hidden
              variants={{ hidden: { y: "105%" }, shown: { y: "0%" } }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block"
            >
              {char === " " ? " " : char}
            </motion.span>
          ))}
        </motion.h2>
        <dl className="grid border-t border-cream/30 sm:grid-cols-2">
          {DETAILS.map(([label, value], i) => (
            <div
              key={label}
              className={`border-cream/30 px-4 py-4 sm:px-5 ${i < 2 ? "border-b" : "max-sm:border-b"} ${i % 2 === 0 ? "sm:border-r" : ""}`}
            >
              <dt className="text-[12px] font-bold uppercase tracking-[0.08em] text-cream/60">{label}</dt>
              <dd className="mt-1 text-[16px]">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="tour" className="scroll-mt-[52px] bg-sun text-ink">
        <a
          href="#tour"
          className="group flex items-center gap-4 border-b border-ink px-4 py-5 font-title font-bold text-[clamp(2.2rem,4.4vw,4.4rem)] lowercase leading-none sm:px-5"
        >
          Book a tour
          <span className="inline-block transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
            ↗
          </span>
        </a>
        <p className="px-4 pt-4 text-[15px] sm:px-5">
          The best way to know if we&apos;re right for your family is to visit.
          <br />
          We&apos;ll show you around, introduce the team, and answer every question.
        </p>
        <div
          ref={patternRef}
          aria-hidden
          className="grid gap-y-8 px-4 py-12 sm:px-5"
          style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: ROWS * COLS }, (_, i) => {
            const row = Math.floor(i / COLS);
            const kind = SHAPES[(i + row) % SHAPES.length];
            return (
              <div key={i} className="flex justify-center">
                <Shape kind={kind} colour={SHAPE_COLOURS[(i + row) % SHAPE_COLOURS.length]} spin={spin} reverse={i % 2 === 1} />
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

function Shape({
  kind,
  colour,
  spin,
  reverse,
}: {
  kind: (typeof SHAPES)[number];
  colour: string;
  spin: MotionValue<number>;
  reverse: boolean;
}) {
  const rotate = useTransform(spin, (v) => (reverse ? -v : v));
  return (
    <motion.svg viewBox="-10 -10 20 20" className="size-[clamp(14px,2.2vw,30px)]" style={{ rotate }}>
      {kind === "dot" && <circle r="9" fill={colour} />}
      {kind === "flower" && (
        <g fill={colour}>
          {[0, 72, 144, 216, 288].map((d) => (
            <circle key={d} cx="0" cy="-5" r="4.6" transform={`rotate(${d})`} />
          ))}
          <circle r="4" />
        </g>
      )}
      {kind === "sparkle" && (
        <path
          d="M0-10C1.2-3.2 3.2-1.2 10 0 3.2 1.2 1.2 3.2 0 10-1.2 3.2-3.2 1.2-10 0-3.2-1.2-1.2-3.2 0-10Z"
          fill={colour}
        />
      )}
    </motion.svg>
  );
}
