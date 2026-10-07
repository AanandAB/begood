import Reveal from "@/components/ui/Reveal";
import { trust } from "@/lib/site";

/**
 * Trust — an honest quote + client-logo placeholders (explicitly marked as
 * placeholders; we never fabricate real clients or testimonials).
 */
export default function Trust() {
  return (
    <section className="bg-cream py-24 text-ink md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:gap-16">
          <Reveal>
            <p className="text-xs font-extrabold uppercase tracking-[0.17em] text-teal">
              05 · {trust.kicker}
            </p>
            <blockquote className="mt-4 font-display text-4xl font-bold leading-[1.02] tracking-tight md:text-5xl">
              {trust.quote.map((q) =>
                q.accent ? (
                  <span key={q.text} className="text-teal">
                    {q.text}
                  </span>
                ) : (
                  <span key={q.text}>{q.text}</span>
                ),
              )}
            </blockquote>
            <p className="mt-5 text-xs text-ink/50">{trust.disclaimer}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-px border border-ink/10 bg-ink/10 sm:grid-cols-3">
              {Array.from({ length: trust.logoCount }).map((_, i) => (
                <div
                  key={i}
                  className="grid min-h-[120px] place-items-center bg-cream px-4 text-center text-[13px] font-extrabold uppercase tracking-[0.08em] text-ink/30"
                >
                  Client logo
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
