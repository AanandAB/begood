import Reveal from "@/components/ui/Reveal";
import { statement } from "@/lib/site";

/** Full-width statement band: "GOOD EVENTS DON'T HAPPEN BY ACCIDENT." */
export default function Statement() {
  return (
    <section className="relative grid min-h-[72vh] place-items-center overflow-hidden bg-navy text-cream">
      <div
        className="absolute -bottom-[350px] -left-[250px] h-[700px] w-[700px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(57,168,165,.35), transparent 68%)",
        }}
      />
      <div className="relative mx-auto w-full max-w-[1180px] px-6 py-28 text-center">
        <Reveal>
          <p className="text-xs font-extrabold uppercase tracking-[0.17em] text-teal">
            {statement.kicker}
          </p>
          <h2 className="mt-3 font-display text-5xl font-bold leading-[0.88] tracking-tighter md:text-8xl">
            {statement.lines.map((l) => (
              <span key={l.text} className="block">
                {l.accent ? (
                  <em className="font-serif italic text-aqua">{l.text}</em>
                ) : (
                  l.text
                )}
              </span>
            ))}
          </h2>
          <p className="mx-auto mt-8 max-w-[650px] text-lg leading-relaxed text-cream/60">
            {statement.sub}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
