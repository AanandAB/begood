import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { workItems } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Selected experiences — a staggered case-study grid. Photos and titles are
 * dummy placeholders; real event photography + results replace them later.
 */
export default function WorkGrid() {
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
            A visual case-study system ready for your real event photography,
            results and client stories.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {workItems.map((w, i) => (
            <Reveal
              key={w.id}
              delay={(i % 2) * 0.1}
              className={cn(i % 2 === 1 && "md:mt-24")}
            >
              <article className="group relative min-h-[520px] overflow-hidden rounded-[26px] bg-navy text-cream">
                <img
                  src={w.photo}
                  alt={w.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 30%, rgba(0,0,0,.82))",
                  }}
                />
                <span className="absolute right-6 top-6 flex h-14 w-14 items-center justify-center rounded-full bg-white/15 backdrop-blur-md">
                  <ArrowUpRight size={22} />
                </span>
                <div className="absolute inset-x-7 bottom-7">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/65">
                    {w.id} · {w.category}
                  </p>
                  <h3 className="mt-2 font-display text-4xl font-bold tracking-tight">
                    {w.title}
                  </h3>
                  <p className="mt-1 text-cream/70">{w.desc}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
