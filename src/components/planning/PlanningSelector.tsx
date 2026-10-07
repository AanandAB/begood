"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { eventTypes, whatsapp, ctaMessages } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * "What are you planning?" — an interactive selector where each choice swaps
 * the accompanying visual world. Phase 1 renders the world as an accent-tinted
 * cinematic panel; real event imagery/stills slot into the marked layer.
 */
export default function PlanningSelector() {
  const [active, setActive] = useState(eventTypes[0].id);
  const current = eventTypes.find((t) => t.id === active) ?? eventTypes[0];

  return (
    <section id="what" className="bg-cream py-24 text-ink md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal">
          What are you planning?
        </p>
        <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight md:text-6xl">
          You bring the reason.
          <br />
          <span className="font-serif italic text-teal">
            We build the experience.
          </span>
        </h2>

        {/* Selector pills */}
        <div className="mt-12 flex flex-wrap gap-3" role="tablist" aria-label="Event type">
          {eventTypes.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={active === t.id}
              onClick={() => setActive(t.id)}
              className={cn(
                "rounded-full border px-5 py-2.5 text-sm font-medium transition-all",
                active === t.id
                  ? "border-navy bg-navy text-cream"
                  : "border-ink/15 text-ink/70 hover:border-ink/40 hover:text-ink",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Visual world */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35 }}
              className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-ink"
              style={{
                background: `radial-gradient(120% 120% at 20% 20%, ${current.accent} 0%, #050709 65%)`,
              }}
            >
              {/* Real event imagery/stills land in this layer. */}
              <span className="absolute left-6 top-6 text-[11px] uppercase tracking-[0.3em] text-cream/50">
                {current.label}
              </span>
              <span className="absolute bottom-6 left-6 max-w-md font-serif text-3xl italic leading-tight text-cream md:text-5xl">
                {current.tagline}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Summary + CTA */}
          <div className="flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-display text-2xl font-bold">
                  {current.label}
                </h3>
                <p className="mt-3 text-ink/70">{current.tagline}</p>
              </motion.div>
            </AnimatePresence>
            <a
              href={whatsapp(ctaMessages.plan(current.label))}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-navy px-7 py-4 text-sm font-semibold text-cream transition-colors hover:bg-brand"
            >
              Get a consultation
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
