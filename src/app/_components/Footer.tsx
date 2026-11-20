const LINKS = [
  { label: "Our rooms", href: "#rooms" },
  { label: "Safety", href: "#safety" },
  { label: "Getting started", href: "#start" },
  { label: "FAQs", href: "#faqs" },
  { label: "Our team", href: "#team" },
  { label: "Book a tour", href: "#tour" },
];

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-cream">
      <div className="grid gap-10 px-4 pb-12 pt-14 sm:px-5 lg:grid-cols-[1fr_24rem]">
        <nav className="flex flex-col items-start text-[clamp(2rem,4.2vw,3.6rem)] font-semibold leading-[1.15]">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-coral">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="text-[15px] leading-relaxed">
          <p>
            Treasure Early Learning is a childcare and early learning centre in Riverview, where
            your child&apos;s safety comes first.
          </p>
          <a
            href="#tour"
            className="mt-4 inline-flex items-center gap-2 rounded-[4px] bg-ink px-3 py-1.5 text-[13px] font-bold text-cream transition-colors hover:bg-coral"
          >
            Book a tour <span aria-hidden>↗</span>
          </a>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-ink px-4 py-3 text-[12px] font-bold sm:px-5">
        <span>© 2026 Treasure Early Learning</span>
        <span>23 Ipswich Street, Riverview QLD 4303</span>
        <span className="flex gap-4">
          <a href="#" className="hover:text-coral">Privacy</a>
          <a href="#" className="hover:text-coral">Child Safety Commitment</a>
        </span>
      </div>

      <p
        aria-hidden
        className="whitespace-nowrap border-t border-ink pt-3 text-center font-title font-bold text-[7vw] lowercase leading-[1.05]"
      >
        Explore · Discover · Grow
      </p>
    </footer>
  );
}
