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
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.17em] text-ink/40">
              Trusted by
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {trust.clients.map((c) => (
                <div
                  key={c}
                  className="flex min-h-[92px] min-w-[168px] items-center justify-center rounded-2xl border border-ink/10 bg-white px-5 py-4 text-center text-sm font-bold uppercase tracking-[0.05em] text-ink/50 transition-colors hover:border-ink/20 hover:text-ink"
                >
                  {c}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
