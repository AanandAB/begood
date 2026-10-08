"use client";

import { useEffect, useRef } from "react";
import { motion, type Variants } from "motion/react";
import { ArrowRight, Play } from "lucide-react";
import { hero } from "@/lib/site";
import LightCanvas from "./LightCanvas";
import Marquee from "@/components/ui/Marquee";
import { usePlanModal } from "@/components/planning/PlanModal";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};
const rise: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * Cinematic hero — event photo under a navy scrim, the ambient light
 * installation, film grain, pointer parallax, a masked headline reveal and a
 * scrolling keyword marquee. The dummy photo swaps for real landscape footage
 * later (same layer).
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
        className="relative z-10 mx-auto flex w-full max-w-[1180px] flex-1 flex-col justify-center px-6 pb-12 pt-32"
      >
        <motion.p
          variants={item}
          className="mb-8 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-aqua"
        >
          <span className="h-px w-8 bg-aqua" />
          {hero.eyebrow}
        </motion.p>

        {/* Masked headline reveal */}
        <h1 className="max-w-[980px] font-display text-6xl font-extrabold leading-[0.82] tracking-[-0.06em] sm:text-7xl md:text-8xl lg:text-9xl">
          <span className="block overflow-hidden pb-2">
            <motion.span variants={rise} className="block">
              {hero.lines[0]}
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-2">
            <motion.span
              variants={rise}
              className="block font-serif italic tracking-[-0.05em] text-aqua"
            >
              {hero.lines[1]}
            </motion.span>
          </span>
        </h1>

        <motion.p
          variants={item}
          className="mt-9 max-w-[560px] text-lg leading-relaxed text-cream/80"
        >
          {hero.sub}
        </motion.p>

        {/* What we do — scannable service list */}
        <motion.div
          variants={item}
          className="mt-7 flex flex-wrap items-center gap-2.5"
        >
          {hero.services.map((s) => (
            <span
              key={s}
              className="rounded-full border border-cream/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-cream/75"
            >
              {s}
            </span>
          ))}
        </motion.div>

        <motion.div
          variants={item}
          className="mt-10 flex flex-wrap items-center gap-7"
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

          {/* Showreel — play button (currently scrolls to the work carousel). */}
          <a href="#work" className="group flex items-center gap-3">
            <span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-cream/25">
              <span
                className="absolute inset-0 rounded-full border border-aqua/60"
                style={{
                  animation: "ping-slow 2.2s cubic-bezier(0, 0, 0.2, 1) infinite",
                }}
              />
              <Play size={15} className="ml-0.5 fill-cream text-cream" />
            </span>
            <span className="text-sm font-bold uppercase tracking-widest text-cream/70 transition-colors group-hover:text-cream">
              {hero.secondaryCta}
            </span>
          </a>
        </motion.div>
      </motion.div>

      {/* Scrolling keyword marquee */}
      <Marquee
        items={hero.marquee}
        className="relative z-10 border-t border-cream/10 py-5"
        itemClassName="text-sm font-semibold uppercase tracking-[0.25em] text-cream/45"
      />
    </section>
  );
}
