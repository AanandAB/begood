"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { workItems } from "@/lib/site";
import { cn } from "@/lib/utils";

const AUTO_MS = 6000;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Featured-work carousel: one large card with a smooth crossfade + directional
 * slide between items, a staggered text reveal, a progress bar, a counter,
 * arrows, a clickable thumbnail rail and drag/swipe. Auto-advances, pauses on
 * hover, and honours prefers-reduced-motion.
 */
export default function WorkCarousel() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const dragX = useRef<number | null>(null);

  const N = workItems.length;
  const current = workItems[index];

  const go = useCallback(
    (delta: number) => {
      setDir(delta >= 0 ? 1 : -1);
      setIndex((i) => (i + delta + N) % N);
    },
    [N],
  );

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (paused) return;
    const t = setInterval(() => go(1), AUTO_MS);
    return () => clearInterval(t);
  }, [paused, go]);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    dragX.current = e.clientX;
    setPaused(true);
  };
  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (dragX.current == null) return;
    const dx = e.clientX - dragX.current;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
    dragX.current = null;
    setPaused(false);
  };

  return (
    <section id="work" className="bg-cream py-24 text-ink md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.17em] text-teal">
              02 · Selected experiences
            </p>
            <h2 className="mt-3 max-w-[850px] font-display text-4xl font-bold leading-[0.93] tracking-tight md:text-6xl">
              The room is only
              <br />
              the beginning.
            </h2>
          </div>
          <p className="max-w-[320px] text-ink/60">
            A closer look at the experiences we&apos;ve produced — drag, swipe,
            or use the arrows.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <div
            className="relative overflow-hidden rounded-3xl bg-navy text-cream"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerLeave={() => {
              dragX.current = null;
              setPaused(false);
            }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Featured stage */}
            <div className="relative h-[440px] sm:h-[520px] md:h-[580px]">
              <AnimatePresence initial={false}>
                <motion.div
                  key={index}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.08, x: dir * 70 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 1.03 }}
                  transition={{ duration: 0.7, ease: EASE }}
                >
                  <img
                    src={current.photo}
                    alt={current.title}
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-ink/5" />
                  <div className="absolute inset-x-0 bottom-0 p-6 pb-10 md:p-10 md:pb-14">
                    <motion.p
                      initial={{ y: 16, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
                      className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-bright"
                    >
                      {current.category}
                    </motion.p>
                    <motion.h3
                      initial={{ y: 24, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.22, duration: 0.6, ease: "easeOut" }}
                      className="mt-1 font-display text-3xl font-bold tracking-tight md:text-5xl"
                    >
                      {current.title}
                    </motion.h3>
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
                      className="mt-2 max-w-md text-cream/70"
                    >
                      {current.desc}
                    </motion.p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Counter */}
              <div className="absolute right-5 top-5 z-10 flex items-baseline gap-1 md:right-8 md:top-8">
                <span className="font-display text-3xl font-bold md:text-4xl">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-cream/50">
                  / {String(N).padStart(2, "0")}
                </span>
              </div>

              {/* Arrows */}
              <button
                onClick={() => go(-1)}
                aria-label="Previous"
                className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-ink/30 text-cream backdrop-blur-md transition-colors hover:bg-teal-bright hover:text-ink md:left-6"
              >
                <ArrowLeft size={20} />
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Next"
                className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-ink/30 text-cream backdrop-blur-md transition-colors hover:bg-teal-bright hover:text-ink md:right-6"
              >
                <ArrowRight size={20} />
              </button>

              {/* Progress bar */}
              <div className="absolute inset-x-0 bottom-0 z-10 h-1 bg-cream/15">
                <div
                  key={index}
                  className="progress-bar h-full bg-teal-bright"
                  style={{
                    animationPlayState: paused ? "paused" : "running",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Thumbnail rail */}
          <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
            {workItems.map((w, i) => (
              <button
                key={w.id}
                onClick={() => go(i - index)}
                aria-label={`Go to ${w.title}`}
                className={cn(
                  "relative h-16 w-24 shrink-0 overflow-hidden rounded-xl transition-all",
                  i === index
                    ? "ring-2 ring-teal ring-offset-2 ring-offset-cream"
                    : "opacity-55 hover:opacity-100",
                )}
              >
                <img
                  src={w.photo}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
