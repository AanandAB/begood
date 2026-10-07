import Reveal from "@/components/ui/Reveal";
import { processSteps } from "@/lib/site";

/** "From first idea to final applause" — the four-step process timeline. */
export default function Process() {
  return (
    <section id="about" className="bg-[#e5e1d8] py-24 text-ink md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.17em] text-teal">
              03 · How we work
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold leading-[0.93] tracking-tight md:text-6xl">
              From first idea
              <br />
              to final applause.
            </h2>
          </div>
          <p className="max-w-[320px] text-ink/60">
            One team. One accountable process. No gaps between the idea and
            what guests actually experience.
          </p>
        </Reveal>

        <div className="mt-16 border-t border-ink/10">
          {processSteps.map((s) => (
            <Reveal key={s.num}>
              <div className="group grid grid-cols-[45px_1fr] items-start gap-x-4 gap-y-2 border-b border-ink/10 py-9 transition-all duration-300 hover:pl-4 md:grid-cols-[80px_1fr_1.4fr] md:gap-x-8">
                <span className="text-xs font-extrabold tracking-[0.15em] text-teal">
                  {s.num}
                </span>
                <h3 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                  {s.title}
                </h3>
                <p className="col-start-2 max-w-[480px] text-ink/60 md:col-start-3">
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
