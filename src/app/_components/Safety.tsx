"use client";

import { motion } from "motion/react";
import Image from "next/image";

const PILLARS = [
  {
    title: "A secure front door",
    body: "Only families and approved people come and go. Every visitor signs in and out, and we check ID for anyone we don't know.",
    image: "/images/adult-toddlers-alphabet-blocks.jpg",
    alt: "An educator playing with alphabet blocks with two toddlers",
  },
  {
    title: "Only the right people collect your child",
    body: "You tell us who is authorised to pick up. If someone isn't on the list, your child doesn't leave with them. No exceptions.",
    image: "/images/circle-time-teacher.jpg",
    alt: "An educator leading circle time with a small group of children",
  },
  {
    title: "Educators you can trust",
    body: "Every team member holds a current Blue Card, police and reference checks, and first aid, CPR and anaphylaxis training.",
    image: "/images/teacher-floor-with-kids.jpg",
    alt: "An educator sitting on the floor with toddlers gathered around her",
  },
  {
    title: "Eyes on every child, always",
    body: "Educators position themselves so every child is in sight, with head counts through the day and spaces designed without blind spots.",
    image: "/images/teacher-preschool-students-playing-with-balls-sitting-floor-kindergarten.jpg",
    alt: "A teacher and toddlers playing with colourful balls on the floor",
  },
  {
    title: "Child-safe by culture",
    body: "We follow the National Child Safe Principles. Our team is trained to recognise and report concerns, and it's easy for families and children to speak up.",
    image: "/images/siblings-hug-field.jpg",
    alt: "Two young children sharing a big hug outdoors",
  },
  {
    title: "Privacy for your family",
    body: "Photos and videos stay on approved centre devices, educators don't use personal phones around children, and your information is only shared with consent.",
    image: "/images/little-kids-playing-toys-learning-center.jpg",
    alt: "Two toddlers stacking colourful cups at a table",
  },
];

export default function Safety() {
  return (
    <section
      id="safety"
      className="relative bg-coral lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]"
    >
      <div className="relative px-4 pb-14 pt-16 sm:px-5 lg:sticky lg:top-[52px] lg:flex lg:h-[calc(100svh-52px)] lg:flex-col lg:justify-center lg:py-10">
        <h2 className="sr-only">Safe and secure</h2>
        <p className="max-w-[38rem] text-[clamp(1.5rem,2.6vw,2.6rem)] leading-[1.22]">
          Your child&apos;s safety is where we start, not something we add on. We believe you
          shouldn&apos;t have to wonder, so here&apos;s what keeps children safe at daycare, in plain
          language.
        </p>
      </div>

      <div className="bg-cream px-4 pb-4 pt-9 sm:px-5 lg:border-l lg:border-ink lg:pt-12">
        <p className="font-title font-bold text-[clamp(2.3rem,4.1vw,4.3rem)] lowercase leading-[1.02] tracking-[-0.02em]">
          Keeping
          <br />
          them safe
        </p>

        <div className="mt-8 flex flex-col gap-12 lg:mt-10">
          {PILLARS.map((pillar, i) => (
            <motion.article
              key={pillar.title}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="group relative aspect-[4/3] overflow-hidden rounded-[10px] bg-ink/10">
                <Image
                  src={pillar.image}
                  alt={pillar.alt}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <span className="absolute left-3 top-3 grid size-9 place-items-center rounded-full bg-cream font-title font-bold text-sm">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-4 font-title font-bold text-[clamp(1.3rem,1.8vw,1.7rem)] leading-tight">
                {pillar.title}
              </h3>
              <p className="mt-2 max-w-[46ch] text-[16px] leading-relaxed text-ink/80">
                {pillar.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
