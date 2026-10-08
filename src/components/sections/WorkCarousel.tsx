"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { workItems } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Fixed card width so the 3D ring geometry is stable across breakpoints. */
const CARD_W = 300;

/**
 * 3D rotating carousel — the case studies are arranged in a ring (CSS 3D
 * rotateY + translateZ, no WebGL) and the ring spins to bring each card to the
 * front. Auto-rotates, pauses on hover, supports arrows, dots and drag/swipe,
 * and honours prefers-reduced-motion (auto-rotate off).
 */
export default function WorkCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const drag = useRef<{ x: number } | null>(null);

  const N = workItems.length;
  const angle = 360 / N;
  const radius = CARD_W / 2 / Math.tan(Math.PI / N);

  const go = (dir: number) => setIndex((i) => (i + dir + N) % N);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % N), 4000);
    return () => clearInterval(t);
  }, [paused, N]);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    drag.current = { x: e.clientX };
  };
  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    drag.current = null;
  };

  return (
    <section id="work" className="overflow-hidden bg-cream py-24 text-ink md:py-32">
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
            A rotating look at the experiences we&apos;ve produced. Drag, swipe
            or use the arrows.
          </p>
        </Reveal>
      </div>

      {/* 3D stage */}
      <Reveal className="mt-12">
        <div
          className="relative mx-auto h-[420px] w-full md:h-[480px]"
          style={{ perspective: "1400px" }}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerLeave={() => (drag.current = null)}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="absolute left-1/2 top-1/2 h-[360px] w-[300px] md:h-[400px]"
            style={{
              transformStyle: "preserve-3d",
              transform: `translate(-50%, -50%) rotateY(${-index * angle}deg)`,
              transition: "transform 0.9s cubic-bezier(0.2, 0.75, 0.2, 1)",
            }}
          >
            {workItems.map((item, i) => (
              <div
                key={item.id}
                className="absolute inset-0 overflow-hidden rounded-2xl bg-navy text-cream shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]"
                style={{
                  transform: `rotateY(${i * angle}deg) translateZ(${radius}px)`,
                  backfaceVisibility: "hidden",
                }}
              >
                <img
                  src={item.photo}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                <div className="absolute inset-x-5 bottom-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-bright">
                    {item.id} · {item.category}
                  </p>
                  <h3 className="mt-1 text-2xl font-bold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-0.5 text-sm text-cream/70">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-center gap-5">
          <button
            onClick={() => go(-1)}
            aria-label="Previous"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-white text-ink transition-colors hover:border-teal hover:text-teal"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            {workItems.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={cn(
                  "h-2 rounded-full transition-all",
                  i === index ? "w-6 bg-teal" : "w-2 bg-ink/20 hover:bg-ink/40",
                )}
              />
            ))}
          </div>
          <button
            onClick={() => go(1)}
            aria-label="Next"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-white text-ink transition-colors hover:border-teal hover:text-teal"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </Reveal>
    </section>
  );
}
