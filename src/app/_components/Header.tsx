"use client";

import { useEffect, useState } from "react";

const NAV = [
  { label: "Safety", href: "#safety" },
  { label: "Our rooms", href: "#rooms" },
  { label: "Getting started", href: "#start" },
  { label: "FAQs", href: "#faqs" },
  { label: "Our team", href: "#team" },
];

const clockFormat = new Intl.DateTimeFormat("en-AU", {
  timeZone: "Australia/Brisbane",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

function RiverviewClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => setTime(clockFormat.format(new Date()));
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  return (
    <span className="tabular-nums" suppressHydrationWarning>
      {time || "--:--:--"}
    </span>
  );
}

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-[52px] items-center justify-between border-b border-ink/80 bg-cream px-4 sm:px-5">
      <a href="#top" aria-label="Treasure Early Learning home" className="shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/treasure-wordmark.svg" alt="Treasure" className="h-6 w-auto sm:h-7" />
      </a>

      <nav className="absolute left-1/2 hidden -translate-x-1/2 gap-7 text-[15px] font-bold lg:flex">
        {NAV.map((item) => (
          <a key={item.href} href={item.href} className="transition-colors hover:text-coral">
            {item.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-4 text-[13px] font-bold">
        <span className="hidden items-center gap-1.5 md:flex">
          <ClockIcon />
          <RiverviewClock />
        </span>
        <span className="hidden items-center gap-1.5 md:flex">
          <PinIcon />
          Riverview, QLD
        </span>
        <a
          href="#tour"
          className="flex items-center gap-2 rounded-[4px] bg-ink px-3 py-1.5 text-cream transition-colors hover:bg-coral"
        >
          Book a tour
          <span aria-hidden className="grid size-4 place-items-center rounded-[2px] bg-cream text-[10px] text-ink">
            ↗
          </span>
        </a>
      </div>
    </header>
  );
}

function ClockIcon() {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="8" cy="8" r="6.3" />
      <path d="M8 4.5V8l2.3 1.6" strokeLinecap="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M8 14.5s4.8-4.4 4.8-8.1a4.8 4.8 0 1 0-9.6 0c0 3.7 4.8 8.1 4.8 8.1Z" />
      <circle cx="8" cy="6.4" r="1.7" />
    </svg>
  );
}
