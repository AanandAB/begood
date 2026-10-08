/**
 * Single source of truth for all site content.
 *
 * Copy, contact details, navigation, the event-type catalogue and every
 * section's text live here so the components stay presentational. Edit this
 * file — not the components — when content changes.
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
  /** Placeholder — confirm the real business email before launch. */
  email: "hello@begood.events",
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
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

/** Dummy event photography (Unsplash) — swap for real event photography later. */
export const photos = {
  hero: asset("/photos/hero.webp"),
  corporate: asset("/photos/corporate.webp"),
  conference: asset("/photos/conference.webp"),
  startup: asset("/photos/startup.webp"),
  brand: asset("/photos/brand.webp"),
  leadership: asset("/photos/leadership.webp"),
  celebration: asset("/photos/celebration.webp"),
  stage: asset("/photos/stage.webp"),
};

export const hero = {
  eyebrow: "Event consulting · Thiruvananthapuram",
  lines: ["MAKE IT", "A MOMENT."],
  sub: "From corporate experiences to startup launches, Be Good brings strategy, creativity and precise execution together to create events people remember.",
  primaryCta: "Plan your event",
  secondaryCta: "Explore our work",
  photo: photos.hero,
};

export type EventType = {
  id: string;
  label: string;
  /** Short subtitle shown on the selector card. */
  note: string;
  tagline: string;
  /** Accent colour (fallback + panel tint). */
  accent: string;
  /** Dummy stage photo for this event type. */
  photo: string;
};

export const eventTypes: EventType[] = [
  {
    id: "corporate",
    label: "Corporate",
    note: "Conferences · Summits",
    tagline:
      "Strategic events designed around business goals, executive audiences and memorable brand moments.",
    accent: "#071A36",
    photo: photos.corporate,
  },
  {
    id: "conference",
    label: "Conference",
    note: "Large rooms · Audiences",
    tagline: "Rooms full of people, fully present — flow, production and audience energy.",
    accent: "#123E78",
    photo: photos.conference,
  },
  {
    id: "launch",
    label: "Product Launch",
    note: "Reveal · Media",
    tagline:
      "A reveal built around story, anticipation, production and the moment your product takes the room.",
    accent: "#39A8A5",
    photo: photos.hero,
  },
  {
    id: "startup",
    label: "Startup",
    note: "Launches · Meetups",
    tagline:
      "High-energy launches and founder-led experiences that make new brands impossible to ignore.",
    accent: "#287E82",
    photo: photos.startup,
  },
  {
    id: "brand",
    label: "Brand Experience",
    note: "Activation · Pop-up",
    tagline:
      "Immersive experiences that connect people with a brand through space, content, sound and interaction.",
    accent: "#123E78",
    photo: photos.brand,
  },
  {
    id: "exhibition",
    label: "Exhibition",
    note: "Stands · Showcases",
    tagline: "Spaces that make people stop, step in and remember what they saw.",
    accent: "#071A36",
    photo: photos.leadership,
  },
  {
    id: "celebration",
    label: "Celebration",
    note: "Milestones · Receptions",
    tagline: "Milestones that deserve more than a party — atmosphere, story and the details that linger.",
    accent: "#39A8A5",
    photo: photos.celebration,
  },
  {
    id: "other",
    label: "Other",
    note: "Tell us more",
    tagline: "Tell us what you're imagining — we'll build the experience around it.",
    accent: "#287E82",
    photo: photos.stage,
  },
];

export const statement = {
  kicker: "The Be Good approach",
  lines: [
    { text: "GOOD EVENTS", accent: false },
    { text: "DON'T HAPPEN", accent: false },
    { text: "BY ACCIDENT.", accent: true },
  ],
  sub: "Every detail has a job: the idea, the room, the rhythm, the people and the final applause.",
};

/** Sample case studies — generic placeholders, not real client work. */
export const workItems = [
  {
    id: "01",
    category: "Corporate",
    title: "Leadership Summit",
    desc: "Strategy, production & guest experience",
    photo: photos.leadership,
  },
  {
    id: "02",
    category: "Brand",
    title: "Brand Experience",
    desc: "Concept to immersive execution",
    photo: photos.brand,
  },
  {
    id: "03",
    category: "Conference",
    title: "The Big Room",
    desc: "Flow, production & audience energy",
    photo: photos.conference,
  },
  {
    id: "04",
    category: "Startup",
    title: "Launch Night",
    desc: "Story, reveal & community",
    photo: photos.stage,
  },
];

export const processSteps = [
  {
    num: "01",
    title: "Strategy",
    desc: "Understand the objective, audience, budget, timing and the outcome the event needs to create.",
  },
  {
    num: "02",
    title: "Concept",
    desc: "Turn the objective into a clear creative direction, guest journey, environment and content story.",
  },
  {
    num: "03",
    title: "Production",
    desc: "Coordinate venue, vendors, staging, sound, lighting, branding, logistics and every moving part.",
  },
  {
    num: "04",
    title: "Experience",
    desc: "Run the room with calm precision so guests feel the energy — not the complexity behind it.",
  },
];

export const details = {
  kicker: "The details",
  title: "Details make the difference.",
  sub: "Great events are a sequence of small decisions that add up to one effortless experience.",
  hotspots: ["Light", "Sound", "Flow", "Brand", "Timing", "People"],
  photo: photos.conference,
};

export const trust = {
  kicker: "Trust",
  quote: [
    { text: "Your event should feel ", accent: false },
    { text: "effortless.", accent: true },
    { text: " Our job is to make sure it is.", accent: false },
  ],
  clients: [
    "Allianz Technologies",
    "CareStack",
    "Experion",
    "Seqato",
    "TCS",
    "Applexus Technologies",
    "Acsia Technologies",
  ],
};

export const contact = {
  kicker: "Let's make something happen",
  lines: [
    { text: "PLAN YOUR", accent: false },
    { text: "MOMENT.", accent: true },
  ],
  sub: "Tell us what you are building. We'll help shape the experience, the plan and the next step.",
  cta: "Start a conversation",
};

/** Shared WhatsApp openers. */
export const ctaMessages = {
  general: "Hi Be Good — I'd like to plan an event.",
  plan: (type: string) =>
    `Hi Be Good — I'm planning a ${type} and I'd like a consultation.`,
};
