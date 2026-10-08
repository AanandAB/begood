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
            <div className="mt-8 border-t border-ink/10 pt-6">
              <p className="text-xs font-extrabold uppercase tracking-[0.17em] text-ink/40">
                {trust.notable.label}
              </p>
              <p className="mt-3 font-display text-xl font-bold tracking-tight text-ink md:text-2xl">
                {trust.notable.names.join("  ·  ")}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.17em] text-ink/40">
              Trusted by
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {trust.clients.map((c) => (
                <div
                  key={c.name}
                  className="flex min-h-[88px] min-w-[150px] items-center justify-center gap-2.5 rounded-2xl border border-ink/10 bg-white px-5 py-3 transition-colors hover:border-ink/20"
                >
                  {c.logo ? (
                    <img
                      src={c.logo}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-7 w-7 object-contain"
                    />
                  ) : null}
                  <span className="text-sm font-bold uppercase tracking-[0.04em] text-ink/55">
                    {c.name}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
