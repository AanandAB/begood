import type { LegalDoc } from "@/lib/legal";

/** Shared shell for legal pages (privacy policy, terms). */
export default function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <div className="bg-cream pb-24 pt-36 text-ink">
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-xs font-bold uppercase tracking-[0.17em] text-teal">
          Legal
        </p>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight md:text-5xl">
          {doc.title}
        </h1>
        <p className="mt-3 text-sm text-ink/50">Last updated: {doc.updated}</p>

        {doc.intro && (
          <p className="mt-8 leading-relaxed text-ink/70">{doc.intro}</p>
        )}

        <div className="mt-10 space-y-10">
          {doc.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-display text-xl font-bold">{s.heading}</h2>
              <div className="mt-3 space-y-3">
                {s.body.map((p, i) => (
                  <p key={i} className="text-[15px] leading-relaxed text-ink/70">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
