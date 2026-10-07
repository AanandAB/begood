/**
 * Single source of truth for all site content.
 *
 * Copy, contact details, navigation and the event-type catalogue live here so
 * the components stay presentational. Edit this file — not the components —
 * when content changes.
 */

/** GitHub Pages project-path prefix (see next.config.ts). */
export const BASE_PATH = "/begood";

/** Prefix a public/ asset path with the base path for GitHub Pages hosting. */
export const asset = (path: string) => `${BASE_PATH}${path}`;

export const brand = {
  name: "BE GOOD",
  legalName: "Be Good Event Consulting",
  tagline: "Event Consulting",
  /** Keep current — static export bakes this at build time. */
  copyrightYear: 2026,
  phoneDisplay: "+91 97454 04433",
  /** Digits only — used for tel: and wa.me links. */
  phoneRaw: "919745404433",
  address: {
    line1: "TC-1380",
    line2: "Kulathoor Post",
    city: "Thiruvananthapuram",
    state: "Kerala",
    pincode: "695583",
  },
};

/** Build a WhatsApp deep-link with a prefilled message. */
export const whatsapp = (message: string) =>
  `https://wa.me/${brand.phoneRaw}?text=${encodeURIComponent(message)}`;

export const nav = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export const hero = {
  eyebrow: "Event Consulting",
  lines: ["MAKE IT", "A MOMENT."],
  sub: "Events that move people, brands and businesses forward.",
  categories: ["Corporate Events", "Startup Events", "Brand Experiences"],
  primaryCta: "Plan Your Event",
  secondaryCta: "Explore Our Work",
};

export type EventType = {
  id: string;
  label: string;
  tagline: string;
  /** Accent colour used for the selected "visual world" wash. */
  accent: string;
};

export const eventTypes: EventType[] = [
  {
    id: "corporate",
    label: "Corporate",
    tagline: "Conferences, offsites and summits that actually land.",
    accent: "#071A36",
  },
  {
    id: "conference",
    label: "Conference",
    tagline: "Rooms full of people, fully present.",
    accent: "#123E78",
  },
  {
    id: "launch",
    label: "Product Launch",
    tagline: "The reveal people talk about afterwards.",
    accent: "#39A8A5",
  },
  {
    id: "startup",
    label: "Startup",
    tagline: "Launch days that look bigger than your headcount.",
    accent: "#287E82",
  },
  {
    id: "brand",
    label: "Brand Experience",
    tagline: "A feeling people can't scroll past.",
    accent: "#123E78",
  },
  {
    id: "exhibition",
    label: "Exhibition",
    tagline: "Spaces that make people stop and step in.",
    accent: "#071A36",
  },
  {
    id: "celebration",
    label: "Celebration",
    tagline: "Milestones that deserve more than a party.",
    accent: "#39A8A5",
  },
  {
    id: "other",
    label: "Other",
    tagline: "Tell us what you're imagining — we'll build it.",
    accent: "#287E82",
  },
];

/** Shared WhatsApp openers for the two main CTAs. */
export const ctaMessages = {
  general: "Hi Be Good — I'd like to plan an event.",
  plan: (type: string) => `Hi Be Good — I'm planning a ${type} and I'd like a consultation.`,
};
