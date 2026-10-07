"use client";

import { useEffect, useRef } from "react";
import { motion, type Variants } from "motion/react";
import { ArrowRight } from "lucide-react";
import { hero } from "@/lib/site";
import LightCanvas from "./LightCanvas";
import MagneticLink from "@/components/ui/MagneticLink";
import { usePlanModal } from "@/components/planning/PlanModal";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
};

/**
 * Cinematic hero — a real event photo under a navy scrim, the ambient light
 * installation, film grain, and a subtle pointer parallax. The dummy photo is
 * swapped for the client's landscape footage later (same layer).
 */
export default function Hero() {
  const mediaRef = useRef<HTMLDivElement>(null);
  const { open } = usePlanModal();

  // Subtle photo parallax on pointer move (desktop, no reduced-motion).
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = mediaRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 8;
      el.style.transform = `scale(1.05) translate(${x}px, ${y}px)`;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden bg-ink text-cream">
      {/* Event photo + cinematic scrim (landscape footage slots in here). */}
      <div
        ref={mediaRef}
        className="absolute -inset-[5%] will-change-transform"
        style={{ transform: "scale(1.05)" }}
      >
        <img
          src={hero.photo}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: "saturate(0.8)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(120deg, rgba(3,12,25,.96) 5%, rgba(4,21,38,.72) 48%, rgba(6,72,75,.5))",
          }}
        />
      </div>

      {/* Signature event-light installation */}
      <LightCanvas />

      {/* Film grain */}
      <div className="grain" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex w-full max-w-[1180px] flex-1 flex-col justify-center px-6 pb-20 pt-32"
      >
        <motion.p
          variants={item}
          className="mb-8 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-aqua"
        >
          <span className="h-px w-8 bg-aqua" />
          {hero.eyebrow}
        </motion.p>

        <motion.h1
          variants={item}
          className="max-w-[980px] font-display text-6xl font-extrabold leading-[0.82] tracking-[-0.06em] sm:text-7xl md:text-8xl lg:text-9xl"
        >
          <span className="block">{hero.lines[0]}</span>
          <span className="block font-serif italic tracking-[-0.05em] text-aqua">
            {hero.lines[1]}
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-9 max-w-[520px] text-lg leading-relaxed text-cream/70"
        >
          {hero.sub}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-wrap items-center gap-5"
        >
          <button
            onClick={() => open()}
            className="group rounded-full bg-cream px-7 py-4 text-sm font-bold text-navy transition-all hover:-translate-y-0.5 hover:bg-aqua"
          >
            {hero.primaryCta}
            <ArrowRight
              size={18}
              className="ml-2 inline transition-transform group-hover:translate-x-1"
            />
          </button>
          <MagneticLink
            href="#work"
            className="group text-sm font-bold uppercase tracking-widest text-cream/80 transition-colors hover:text-cream"
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
        className="relative z-10 mx-auto mb-8 flex flex-col items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-cream/50"
      >
        Scroll to enter
        <span className="h-10 w-px animate-pulse bg-gradient-to-b from-aqua to-transparent" />
      </motion.div>
    </section>
  );
}
