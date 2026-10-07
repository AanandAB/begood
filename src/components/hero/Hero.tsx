"use client";

import { Fragment } from "react";
import { motion, type Variants } from "motion/react";
import { ArrowRight } from "lucide-react";
import { hero, whatsapp, ctaMessages } from "@/lib/site";
import LightCanvas from "./LightCanvas";
import MagneticLink from "@/components/ui/MagneticLink";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
};

/**
 * Cinematic hero — "the event comes alive". A near-black base with an ambient
 * light installation and film grain; the landscape footage the client is
 * supplying slots in as a background layer between the gradient and the
 * lights (see comment below).
 */
export default function Hero() {
  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden bg-ink text-cream">
      {/* Cinematic base. Landscape footage/stills slot in HERE as an absolutely
          positioned <video>/<img> layer, before <LightCanvas/>. */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-ink to-ink" />

      {/* Signature event-light installation */}
      <LightCanvas />

      {/* Film grain */}
      <div className="grain" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 pb-20 pt-28"
      >
        <motion.p
          variants={item}
          className="mb-8 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-teal-bright"
        >
          <span className="h-px w-10 bg-teal-bright" />
          {hero.eyebrow}
        </motion.p>

        <motion.h1
          variants={item}
          className="font-display text-6xl font-bold leading-[0.9] tracking-tight sm:text-7xl md:text-8xl lg:text-9xl"
        >
          <span className="block">{hero.lines[0]}</span>
          <span className="block font-serif italic text-teal-bright">
            {hero.lines[1]}
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-8 max-w-xl text-lg text-cream/80 md:text-xl"
        >
          {hero.sub}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm uppercase tracking-[0.2em] text-cream/50"
        >
          {hero.categories.map((c, i) => (
            <Fragment key={c}>
              {i > 0 && <span className="text-teal-bright">·</span>}
              <span>{c}</span>
            </Fragment>
          ))}
        </motion.div>

        <motion.div
          variants={item}
          className="mt-12 flex flex-wrap items-center gap-6"
        >
          <MagneticLink
            href={whatsapp(ctaMessages.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-full bg-teal-bright px-8 py-4 text-sm font-semibold text-ink transition-colors hover:bg-cream"
          >
            {hero.primaryCta}
            <ArrowRight
              size={18}
              className="ml-2 transition-transform group-hover:translate-x-1"
            />
          </MagneticLink>
          <MagneticLink
            href="#work"
            className="group text-sm font-semibold uppercase tracking-widest text-cream/80 transition-colors hover:text-cream"
          >
            {hero.secondaryCta}
            <span className="ml-2 inline-block h-px w-8 bg-cream/40 transition-all group-hover:w-12 group-hover:bg-cream" />
          </MagneticLink>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="relative z-10 mx-auto mb-8 flex flex-col items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-cream/40"
      >
        Scroll
        <span className="h-10 w-px animate-pulse bg-gradient-to-b from-teal-bright to-transparent" />
      </motion.div>
    </section>
  );
}
