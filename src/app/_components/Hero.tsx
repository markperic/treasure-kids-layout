"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import AnimatedLogo from "./AnimatedLogo";
import Flower, { CORAL_INNER_RATIO } from "./Flower";

// Fraction of the hero's pinned scroll distance over which the flower grows to fill the screen.
const FILL_END = 0.45;

const ROWS: [string, React.ReactNode][] = [
  ["12 Park Avenue, Meadowbank QLD 4000", "daycare Early Learning"],
  [
    "Now welcoming new families",
    <a key="tour" href="#tour" className="underline-offset-4 hover:underline">
      Book a tour
    </a>,
  ],
  ["Mon–Fri, 6:30am – 6:00pm", "Ask us anything"],
];

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const flowerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // How far the flower must scale for its coral centre to cover every corner of the viewport.
  const coverScale = useMotionValue(8);

  useEffect(() => {
    const measure = () => {
      const el = flowerRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const farthest = Math.max(
        Math.hypot(cx, cy),
        Math.hypot(w - cx, cy),
        Math.hypot(cx, h - cy),
        Math.hypot(w - cx, h - cy),
      );
      coverScale.set((farthest / (r.width * CORAL_INNER_RATIO)) * 1.08);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [coverScale]);

  const targetScale = useTransform(() => {
    const t = easeInOutCubic(clamp01(scrollYProgress.get() / FILL_END));
    return 1 + (coverScale.get() - 1) * t;
  });
  const springScale = useSpring(targetScale, { stiffness: 150, damping: 20, mass: 0.6 });
  const rotate = useTransform(scrollYProgress, [0, FILL_END], [0, 50]);
  const centerScale = useTransform(scrollYProgress, [0, FILL_END * 0.4], [1, 0]);
  const headingOpacity = useTransform(scrollYProgress, [FILL_END * 0.85, FILL_END + 0.12], [0, 1]);
  const headingY = useTransform(scrollYProgress, [FILL_END * 0.85, FILL_END + 0.12], [60, 0]);

  return (
    <section id="top" ref={sectionRef} className="relative h-[175vh]">
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden pt-[52px]">
        <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-cream px-4 py-[3vh] sm:px-5">
          <Image
            src="/images/adult-toddlers-alphabet-blocks.jpg"
            alt=""
            fill
            preload
            sizes="100vw"
            className="object-cover object-[50%_40%]"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 32% 38% at 50% 52%, rgb(43 31 53 / 0.55), rgb(43 31 53 / 0.25) 60%, rgb(43 31 53 / 0) 100%)",
            }}
          />
          <AnimatedLogo className="relative h-full w-full max-w-[860px] [&_svg]:h-full! [&_[data-group=early]_path]:fill-white! [&_[data-group=tagline]_path]:fill-white!" />
        </div>

        <div className="overflow-hidden border-t border-ink/80 bg-sun py-[0.4vh]">
          <Marquee />
        </div>

        <div className="relative bg-sun text-[12px] font-bold sm:text-[13px]">
          {ROWS.map(([left, right], i) => (
            <div
              key={i}
              className="flex h-9 items-center justify-between gap-4 border-t border-ink/80 px-4 sm:px-5"
            >
              <span className="truncate">{left}</span>
              <span className="shrink-0">{right}</span>
            </div>
          ))}

          <div
            ref={flowerRef}
            className="pointer-events-none absolute bottom-1 left-[80%] z-20 aspect-square w-[clamp(150px,24vw,380px)] -translate-x-1/2"
          >
            <motion.div
              className="size-full"
              style={{ scale: reduceMotion ? targetScale : springScale, rotate }}
            >
              <Flower centerScale={centerScale} />
            </motion.div>
          </div>
        </div>

        <div className="relative shrink-0 basis-[22%] overflow-hidden bg-ink px-4 pt-5 text-cream sm:px-5 sm:pt-6">
          <h1 className="max-w-[56ch] text-[clamp(1.2rem,2.5vw,2.6rem)] font-normal leading-[1.2]">
            <span className="font-title font-bold">Where every child is safe, seen and cared for.</span>{" "}
            <span className="font-semibold text-cream/75">
              We give your child the secure, loving start they deserve, and give you the peace of
              mind to walk out the door.
            </span>
          </h1>
        </div>

        <motion.p
          aria-hidden
          style={{ opacity: headingOpacity, y: headingY }}
          className="pointer-events-none absolute inset-x-0 bottom-0 top-[52px] z-30 flex items-center justify-center px-6 text-center font-title font-bold text-[clamp(2.6rem,7.4vw,8rem)] lowercase leading-[1.05] text-ink"
        >
          <span className="max-w-[14ch]">
            Where every child is <span className="text-sun">safe</span>,{" "}
            <span className="text-cream">seen</span> and{" "}
            <span className="text-grape">cared for</span>
          </span>
        </motion.p>
      </div>
    </section>
  );
}

function Marquee() {
  return (
    <div className="w-full overflow-hidden" aria-hidden>
      <div className="tk-motion flex w-max" style={{ animation: "tk-marquee 32s linear infinite" }}>
        {[0, 1].map((copy) => (
          <span
            key={copy}
            className="flex shrink-0 items-center whitespace-nowrap font-display font-bold text-[clamp(2.2rem,8vh,6.5rem)] leading-[1.35] tracking-[-0.01em]"
          >
            <span className="px-[0.12em]">daycare</span>
            <Sparkle />
            <span className="px-[0.12em]">early learning</span>
            <Sparkle />
          </span>
        ))}
      </div>
    </div>
  );
}

function Sparkle() {
  return (
    <svg viewBox="-10 -10 20 20" className="mx-[0.12em] size-[0.42em] shrink-0" aria-hidden>
      <path
        d="M0-10C1.2-3.2 3.2-1.2 10 0 3.2 1.2 1.2 3.2 0 10-1.2 3.2-3.2 1.2-10 0-3.2-1.2-1.2-3.2 0-10Z"
        fill="var(--color-coral)"
      />
    </svg>
  );
}
