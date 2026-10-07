import Reveal from "@/components/ui/Reveal";
import { details } from "@/lib/site";

/** "Details make the difference" — navy panel with hotspots over a photo. */
export default function Details() {
  return (
    <section className="bg-white py-24 text-ink md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="relative min-h-[560px] overflow-hidden rounded-[32px] bg-navy text-cream">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40"
              style={{ backgroundImage: `url(${details.photo})` }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, #071a36 0%, rgba(7,26,54,.75) 45%, rgba(7,26,54,.1))",
              }}
            />
            <div className="relative p-8 md:max-w-[720px] md:p-16">
              <p className="text-xs font-extrabold uppercase tracking-[0.17em] text-aqua">
                04 · {details.kicker}
              </p>
              <h2 className="mt-3 font-display text-4xl font-bold leading-[0.9] tracking-tight md:text-6xl">
                {details.title}
              </h2>
              <p className="mt-6 max-w-md text-cream/70">{details.sub}</p>
              <div className="mt-8 flex flex-wrap gap-2.5">
                {details.hotspots.map((h, i) => (
                  <button
                    key={h}
                    className="rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-cream hover:text-navy"
                  >
                    0{i + 1} · {h}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
