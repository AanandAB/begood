"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { eventTypes } from "@/lib/site";
import { cn } from "@/lib/utils";
import { usePlanModal } from "@/components/planning/PlanModal";

/**
 * "What are you planning?" — a selector whose stage photo (and copy) swaps
 * with the chosen event type. Dummy photography; real event stills later.
 */
export default function PlanningSelector() {
  const [active, setActive] = useState(eventTypes[0].id);
  const current = eventTypes.find((t) => t.id === active) ?? eventTypes[0];
  const { open } = usePlanModal();

  return (
    <section id="services" className="bg-cream py-24 text-ink md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-xs font-extrabold uppercase tracking-[0.17em] text-teal">
          01 · What are you planning?
        </p>
        <h2 className="mt-3 max-w-[850px] font-display text-4xl font-bold leading-[0.93] tracking-tight md:text-6xl">
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

        {/* Stage + summary */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.4 }}
              className="relative aspect-[16/10] overflow-hidden rounded-[28px] bg-navy"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.2s]"
                style={{ backgroundImage: `url(${current.photo})` }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 30%, rgba(3,12,22,.85))",
                }}
              />
              <div className="absolute bottom-7 left-7 right-7 text-cream">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/60">
                  {current.note}
                </span>
                <p className="mt-2 max-w-md font-serif text-3xl italic leading-tight md:text-4xl">
                  {current.tagline}
                </p>
              </div>
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
                <p className="mt-1 text-sm text-ink/50">{current.note}</p>
                <p className="mt-3 text-ink/70">{current.tagline}</p>
              </motion.div>
            </AnimatePresence>
            <button
              onClick={() => open(current.label)}
              className="group mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-navy px-7 py-4 text-sm font-semibold text-cream transition-colors hover:bg-brand"
            >
              Plan a {current.label.toLowerCase()}
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
