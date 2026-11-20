"use client";

import { motion, useMotionValue, useScroll, useTransform } from "motion/react";
import { useEffect, useRef } from "react";

const FAQS = [
  {
    q: "What ages do you care for?",
    a: "We welcome children from around 6 weeks old through to school age, across our Nursery, Toddler and Kindergarten rooms.",
  },
  {
    q: "What are your hours and fees?",
    a: "We're open Monday to Friday, 6:30am to 6:00pm. Fees depend on your child's room and days, so get in touch and we'll walk you through how the Child Care Subsidy can reduce them.",
  },
  {
    q: "What is the Child Care Subsidy?",
    a: "It's government support that helps families with the cost of care. Your entitlement is set by Services Australia, and we'll help you understand how it applies to you.",
  },
  {
    q: "How do you keep children safe?",
    a: "Safety is where we start: secure entry, strict pick-up rules, checked and trained educators, and active supervision all day. Ask us anything on your tour.",
  },
  {
    q: "How do you handle illness?",
    a: "We follow national health guidance on exclusion periods to keep every child and educator well, and we'll call you if your child is unwell.",
  },
  {
    q: "What's your educator-to-child ratio?",
    a: "We meet or exceed the ratios required in Queensland under the National Regulations.",
  },
  {
    q: "Can we visit before enrolling?",
    a: "Yes, we encourage it. Book a tour at a time that suits you and come and see Treasure for yourself.",
  },
];

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

// Scroll window (as a share of the section) for the cards, then for the shrink-away.
const CARDS_START = 0.02;
const CARDS_END = 0.82;
const SHRINK_START = 0.84;

export default function Faqs() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const stageH = useMotionValue(800);
  const cardsH = useMotionValue(2400);

  useEffect(() => {
    const cards = cardsRef.current;
    if (!cards) return;
    const measure = () => {
      stageH.set(window.innerHeight);
      cardsH.set(cards.offsetHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(cards);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [stageH, cardsH]);

  const cardsY = useTransform(() => {
    const t = clamp01((scrollYProgress.get() - CARDS_START) / (CARDS_END - CARDS_START));
    return stageH.get() - t * (stageH.get() + cardsH.get());
  });
  const lineOneX = useTransform(scrollYProgress, [0, 1], ["0%", "-38%"]);
  const lineTwoX = useTransform(scrollYProgress, [0, 1], ["-38%", "0%"]);
  const clipPath = useTransform(scrollYProgress, (p) => {
    const e = easeInOutCubic(clamp01((p - SHRINK_START) / (1 - SHRINK_START)));
    return `inset(0% 0% ${64 * e}% ${80 * e}%)`;
  });

  return (
    <section id="faqs" ref={sectionRef} className="relative h-[520vh] bg-cream">
      <div className="sticky top-0 h-[100svh] overflow-hidden pt-[52px]">
        <motion.div
          className="relative h-full overflow-hidden bg-grape text-cream"
          style={{ clipPath }}
        >
          <div
            aria-hidden
            className="absolute inset-x-0 top-[7%] font-title font-bold text-[clamp(3.4rem,18vh,15rem)] lowercase leading-[1.05]"
          >
            <motion.p style={{ x: lineOneX }} className="whitespace-nowrap">
              Questions? ✦ Questions? ✦ Questions?
            </motion.p>
            <motion.p style={{ x: lineTwoX }} className="whitespace-nowrap">
              Ask us anything ✦ Ask us anything
            </motion.p>
          </div>
          <h2 className="sr-only">Frequently asked questions</h2>

          <p className="absolute bottom-6 left-4 z-0 max-w-[30rem] pr-4 text-[clamp(1.15rem,1.6vw,1.5rem)] leading-[1.3] sm:left-5">
            Still wondering about something? Ask us anything on your tour. We&apos;d love you to.
          </p>

          <motion.div
            ref={cardsRef}
            style={{ y: cardsY }}
            className="absolute inset-x-0 top-0 z-10 flex flex-col gap-[6vh] px-4 sm:px-5 lg:px-0"
          >
            {FAQS.map((faq, i) => (
              <article
                key={faq.q}
                className={`w-[min(100%,30rem)] rounded-[6px] bg-sun p-5 text-ink shadow-[0_18px_40px_-20px_rgba(43,31,53,0.6)] sm:p-6 lg:w-[34vw] ${
                  i % 2 === 0 ? "self-end lg:mr-[10.5vw]" : "self-start lg:ml-[10.5vw]"
                }`}
              >
                <h3 className="font-title font-bold text-[clamp(1.45rem,2.2vw,2.1rem)] leading-[1.05]">
                  {faq.q}
                </h3>
                <p className="mt-3 text-[16px] leading-relaxed">{faq.a}</p>
              </article>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
