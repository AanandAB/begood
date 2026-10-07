"use client";

import { MapPin, Phone, Mail } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { brand, contact } from "@/lib/site";
import { usePlanModal } from "@/components/planning/PlanModal";

/** "Plan your moment" — contact band with address, phone and email. */
export default function Contact() {
  const a = brand.address;
  const { open } = usePlanModal();

  return (
    <section id="contact" className="relative overflow-hidden bg-navy text-cream">
      <div
        className="absolute -right-[400px] -top-[250px] h-[800px] w-[800px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(58,169,165,.34), transparent 65%)",
        }}
      />
      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 py-24 md:grid-cols-[1.2fr_0.8fr] md:py-32">
        <Reveal>
          <p className="text-xs font-extrabold uppercase tracking-[0.17em] text-aqua">
            06 · {contact.kicker}
          </p>
          <h2 className="mt-3 font-display text-6xl font-bold leading-[0.84] tracking-tight md:text-8xl">
            {contact.lines.map((l) => (
              <span key={l.text} className="block">
                {l.accent ? (
                  <em className="font-serif italic text-aqua">{l.text}</em>
                ) : (
                  l.text
                )}
              </span>
            ))}
          </h2>
          <p className="mt-8 max-w-[600px] text-lg leading-relaxed text-cream/60">
            {contact.sub}
          </p>
          <button
            onClick={() => open()}
            className="mt-8 rounded-full bg-cream px-7 py-4 font-bold text-navy transition-colors hover:bg-aqua"
          >
            {contact.cta} →
          </button>
        </Reveal>

        <Reveal delay={0.1} className="self-end border-t border-white/15 pt-6">
          <div className="space-y-7">
            <div>
              <span className="text-[11px] uppercase tracking-[0.15em] text-cream/40">
                Be Good Event Consulting
              </span>
              <p className="mt-2 text-lg leading-snug">
                {a.line1}, {a.line2}
                <br />
                {a.city} {a.pincode}
                <br />
                {a.state}, India
              </p>
            </div>
            <div className="space-y-2">
              <a
                href={`tel:+${brand.phoneRaw}`}
                className="flex items-center gap-3 text-lg transition-colors hover:text-aqua"
              >
                <Phone size={18} className="text-aqua" />
                {brand.phoneDisplay}
              </a>
              <a
                href={`mailto:${brand.email}`}
                className="flex items-center gap-3 text-lg transition-colors hover:text-aqua"
              >
                <Mail size={18} className="text-aqua" />
                {brand.email}
              </a>
            </div>
            <p className="flex items-start gap-2 text-sm text-cream/50">
              <MapPin size={16} className="mt-0.5 shrink-0 text-aqua" />
              Based in Thiruvananthapuram. Built for wherever the event takes us.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
