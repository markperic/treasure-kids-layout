"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const STEPS = [
  {
    title: "Book a tour",
    body: "Come and see the centre, meet the team and ask whatever's on your mind.",
    block: "bg-coral",
    circle: "bg-sun",
  },
  {
    title: "Join the waitlist",
    body: "Tell us about your child and when you'd like to start.",
    block: "bg-sun",
    circle: "bg-coral",
  },
  {
    title: "Accept your place",
    body: "When a spot opens, we'll confirm days and fees and help with your Child Care Subsidy paperwork.",
    block: "bg-leaf",
    circle: "bg-sun",
  },
  {
    title: "Settle in",
    body: "We'll arrange a gentle start so your child (and you) feel comfortable from day one.",
    block: "bg-grape",
    circle: "bg-tangerine",
  },
];

export default function Steps() {
  return (
    <section id="start" className="bg-cream">
      <div className="flex justify-between px-4 pt-16 text-[13px] font-bold sm:px-5">
        <span>Getting started</span>
        <span>Four simple steps</span>
      </div>
      <h2 className="px-4 pb-10 pt-6 text-center font-title font-bold text-[15vw] lowercase leading-[0.95] tracking-[-0.02em] sm:px-5 lg:whitespace-nowrap lg:text-[8.6vw]">
        Joining is simple
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, i) => (
          <StepBlock key={step.title} step={step} index={i} />
        ))}
      </div>
    </section>
  );
}

function StepBlock({ step, index }: { step: (typeof STEPS)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["45%", "0%"]);

  return (
    <div
      ref={ref}
      className={`group relative h-[108vw] overflow-hidden sm:h-[56vw] lg:h-[29vw] ${step.block}`}
      style={{ containerType: "inline-size" }}
    >
      <div className="absolute left-1/2 top-1/2 aspect-square w-[92%] -translate-x-1/2 -translate-y-1/2">
        <motion.div
          style={{ y }}
          className={`flex size-full flex-col items-center justify-center rounded-full px-[13%] text-center text-ink transition-colors duration-500 ease-out group-hover:bg-cream ${step.circle}`}
        >
          <div className="flex flex-col items-center transition-transform duration-500 ease-out group-hover:scale-105">
            <span className="text-[4cqw] font-bold">0{index + 1}</span>
            <h3 className="mt-[2cqw] font-title font-bold text-[8cqw] leading-[1.05]">{step.title}</h3>
            <p className="mt-[3cqw] max-w-[60cqw] text-[4.3cqw] leading-snug">{step.body}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
