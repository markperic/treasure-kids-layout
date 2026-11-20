"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import Image from "next/image";
import { useRef, useSyncExternalStore } from "react";

type Panel = {
  label: string;
  title: string;
  meta: string;
  body: string;
  image: string;
  alt: string;
  bg: string;
  fg: string;
};

const PANELS: Panel[] = [
  {
    label: "Nursery",
    title: "Nursery",
    meta: "Around 6 weeks – 2 years",
    body: "Calm, cosy and unhurried. Gentle routines, lots of cuddles and sensory play, and a primary educator who gets to know your baby's rhythms.",
    image: "/images/anna-zwiefel-LgPGzbVmD-o-unsplash.jpg",
    alt: "Toddlers sitting on little wooden chairs in a bright room",
    bg: "bg-sun",
    fg: "text-ink",
  },
  {
    label: "Toddlers",
    title: "Toddlers",
    meta: "Around 2 – 3 years",
    body: "Big feelings and bigger curiosity. We nurture independence, language and friendship through play, messy projects and time outdoors.",
    image: "/images/anna-zwiefel-eg63-okc-yg-unsplash.jpg",
    alt: "Toddlers gathered around a small table",
    bg: "bg-leaf",
    fg: "text-cream",
  },
  {
    label: "Kindergarten",
    title: "Kindergarten",
    meta: "Around 3 – 5 years",
    body: "Confident, capable learners getting ready for school, with projects, early literacy and numeracy, and plenty of chances to grow their social skills.",
    image: "/images/jason-sung-xH04gkmk1sg-unsplash.jpg",
    alt: "A young girl drawing at a desk",
    bg: "bg-grape",
    fg: "text-cream",
  },
  {
    label: "How we learn",
    title: "Play is how children learn",
    meta: "Guided by the Early Years Learning Framework",
    body: "Children learn through play, relationships and discovery, and their interests shape what we do next. Child-led, educator-guided, and school-ready without being rushed.",
    image: "/images/group-diverse-cheerful-fun-happy-multiethnic-children.jpg",
    alt: "Three laughing children lying in the grass among daisies",
    bg: "bg-magenta",
    fg: "text-cream",
  },
  {
    label: "A day at Treasure",
    title: "The little things that make a big day",
    meta: "Meals · rest · outdoors · staying connected",
    body: "Nutritious meals and snacks, a quiet rest that follows your child's needs, daily time outside, and updates through the day so you don't have to wait until pick-up.",
    image: "/images/magnific_polynesian-and-white-children-aged-1_4RFZvs49Aa.jpg",
    alt: "A group of toddlers sitting together and laughing",
    bg: "bg-tangerine",
    fg: "text-ink",
  },
];

const N = PANELS.length;
// Strip thickness as a share of the stage: width on desktop, height on mobile.
const STRIP_DESKTOP = 4.6;
const STRIP_MOBILE = 6.5;
const START = 0.05;
const END = 0.97;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

const desktopQuery = "(min-width: 1024px)";
function subscribe(cb: () => void) {
  const mq = window.matchMedia(desktopQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

export default function Rooms() {
  const sectionRef = useRef<HTMLElement>(null);
  const isDesktop = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(desktopQuery).matches,
    () => true,
  );
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const strip = isDesktop ? STRIP_DESKTOP : STRIP_MOBILE;
  const unit = isDesktop ? "cqw" : "cqh";

  return (
    <section id="rooms" ref={sectionRef} className="relative h-[520vh]">
      <div className="sticky top-0 h-[100svh] pt-[52px]">
        <div className="relative h-full overflow-hidden bg-cream" style={{ containerType: "size" }}>
          <div
            className="absolute inset-0 flex flex-col justify-between px-4 pb-6 pt-8 sm:px-5"
            style={
              isDesktop
                ? { right: `${N * strip}${unit}` }
                : { bottom: `${N * strip}${unit}` }
            }
          >
            <h2 className="font-title font-bold text-[clamp(2.4rem,5vw,5rem)] lowercase leading-[1]">
              A space for
              <br />
              every stage
            </h2>
            <p className="max-w-[40rem] text-[clamp(1.25rem,2.6vw,2.6rem)] leading-[1.2]">
              Children grow fast. Our rooms are set up for where they are right now, with small
              groups, familiar faces and plenty to explore.
            </p>
          </div>

          {PANELS.map((panel, i) => (
            <RoomPanel
              // Remount on orientation change so Motion drops the old left/top inline style.
              key={`${panel.label}-${isDesktop ? "h" : "v"}`}
              panel={panel}
              index={i}
              progress={scrollYProgress}
              isDesktop={isDesktop}
              strip={strip}
              unit={unit}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function RoomPanel({
  panel,
  index,
  progress,
  isDesktop,
  strip,
  unit,
}: {
  panel: Panel;
  index: number;
  progress: MotionValue<number>;
  isDesktop: boolean;
  strip: number;
  unit: string;
}) {
  const expand = useTransform(progress, (p) => {
    const t = clamp01((p - START) / (END - START)) * N;
    return easeInOutCubic(clamp01((t - index) / 0.72));
  });
  const rest = 100 - (N - index) * strip;
  const final = index * strip;
  const offset = useTransform(expand, (e) => `${rest + (final - rest) * e}${unit}`);
  const contentOpacity = useTransform(expand, [0.55, 1], [0, 1]);
  const contentShift = useTransform(expand, [0.55, 1], [24, 0]);

  const stripSize = `${strip}${unit}`;
  const trailing = `calc(${(N - 1 - index) * strip}${unit} + 1.25rem)`;

  return (
    <motion.div
      className={`absolute ${panel.bg} ${panel.fg} ${isDesktop ? "inset-y-0 right-0" : "inset-x-0 bottom-0"}`}
      style={{ zIndex: 10 + index, ...(isDesktop ? { left: offset } : { top: offset }) }}
    >
      <div
        className={`absolute flex items-end text-[13px] font-bold uppercase tracking-[0.06em] ${
          isDesktop ? "inset-y-0 left-0 justify-center pb-5" : "inset-x-0 top-0 items-center px-4"
        }`}
        style={isDesktop ? { width: stripSize } : { height: stripSize }}
      >
        <span className={isDesktop ? "rotate-180 whitespace-nowrap [writing-mode:vertical-rl]" : ""}>
          {panel.label}
        </span>
      </div>

      <motion.div
        className={`absolute flex gap-6 ${isDesktop ? "inset-y-0 flex-row items-start py-8" : "inset-x-0 flex-col px-4 pb-4"}`}
        style={{
          opacity: contentOpacity,
          y: contentShift,
          ...(isDesktop
            ? { left: `calc(${stripSize} + 1.5rem)`, right: trailing }
            : { top: `calc(${stripSize} + 0.5rem)`, bottom: trailing }),
        }}
      >
        <div className={isDesktop ? "w-[42%] shrink-0" : ""}>
          <h3 className="font-title font-bold text-[clamp(2rem,4.4vw,4.6rem)] lowercase leading-[1]">
            {panel.title}
          </h3>
          <p className="mt-3 text-[13px] font-bold uppercase tracking-[0.06em] opacity-80">
            {panel.meta}
          </p>
          <p className="mt-4 max-w-[34rem] text-[clamp(1rem,1.25vw,1.2rem)] leading-relaxed">
            {panel.body}
          </p>
          <a
            href="#tour"
            className="mt-6 inline-flex items-center gap-2 text-[14px] font-bold"
          >
            <span className="grid size-9 place-items-center rounded-full bg-cream text-ink">↗</span>
            <span className="rounded-full bg-cream px-4 py-2 text-ink">Book a tour</span>
          </a>
        </div>
        <div
          className={`relative overflow-hidden rounded-[10px] ${isDesktop ? "h-full min-w-0 flex-1" : "min-h-0 flex-1"}`}
        >
          <Image
            src={panel.image}
            alt={panel.alt}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
