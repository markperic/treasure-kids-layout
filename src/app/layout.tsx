import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./_components/SmoothScroll";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "daycare Early Learning | Layout Showcase",
  description:
    "A childcare and early-learning landing page layout, kept here as a reusable Capote Design starting point.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${quicksand.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream font-body font-semibold text-ink">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
