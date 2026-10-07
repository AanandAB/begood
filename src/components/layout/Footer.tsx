import { MapPin, Phone, Mail } from "lucide-react";
import { asset, brand, nav, whatsapp, ctaMessages, BASE_PATH } from "@/lib/site";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

/**
 * Footer skeleton — Phase 1 ships brand, nav, and the "come say hello"
 * contact block. Later phases add the journal/social links.
 */
export default function Footer() {
  const a = brand.address;
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-3">
        {/* Brand */}
        <div className="space-y-4">
          <img
            src={asset("/logo-dark.png")}
            alt={brand.legalName}
            className="h-8 w-auto"
          />
          <p className="max-w-xs text-sm leading-relaxed text-cream/70">
            We don&apos;t just manage events. We create moments people
            remember.
          </p>
        </div>

        {/* Nav */}
        <nav aria-label="Footer" className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-bright">
            Explore
          </p>
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="block text-sm text-cream/80 transition-colors hover:text-teal-bright"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Contact */}
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-bright">
            Come say hello
          </p>
          <address className="space-y-1 text-sm not-italic text-cream/80">
            <span className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-teal-bright" />
              <span>
                {brand.legalName}
                <br />
                {a.line1}, {a.line2}
                <br />
                {a.city}, {a.state} {a.pincode}
              </span>
            </span>
          </address>
          <a
            href={`tel:+${brand.phoneRaw}`}
            className="flex items-center gap-2 text-sm text-cream/80 transition-colors hover:text-teal-bright"
          >
            <Phone size={16} className="text-teal-bright" />
            {brand.phoneDisplay}
          </a>
          <a
            href={`mailto:${brand.email}`}
            className="flex items-center gap-2 text-sm text-cream/80 transition-colors hover:text-teal-bright"
          >
            <Mail size={16} className="text-teal-bright" />
            {brand.email}
          </a>
          <a
            href={whatsapp(ctaMessages.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-teal-bright px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-cream"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp Be Good
          </a>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-cream/50 sm:flex-row">
          <p>
            © {brand.copyrightYear} {brand.legalName}. All rights reserved.
          </p>
          <p>Cinematic. Precise. Human. Kerala-born, world-ready.</p>
        </div>
      </div>
    </footer>
  );
}
