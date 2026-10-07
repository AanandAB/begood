"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { asset, brand, nav, whatsapp, ctaMessages, BASE_PATH } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Top navigation. Transparent over the dark hero, morphing into a compact
 * cream floating bar once the page scrolls. Mobile: full-screen navy menu.
 */
export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Light (navy) logo + dark text only once the bar is solid.
  const light = scrolled;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          light
            ? "border-b border-ink/10 bg-cream/95 py-3 backdrop-blur-md"
            : "bg-transparent py-5",
        )}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-6"
          aria-label="Primary"
        >
          <a href={`${BASE_PATH}/`} aria-label={brand.legalName}>
            <img
              src={asset(light ? "/logo-light.png" : "/logo-dark.png")}
              alt={brand.legalName}
              className="h-8 w-auto transition-all duration-500"
            />
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-9 md:flex">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  "text-sm font-medium tracking-wide transition-colors",
                  light
                    ? "text-ink hover:text-brand"
                    : "text-cream hover:text-teal-bright",
                )}
              >
                {item.label}
              </a>
            ))}
            <a
              href={whatsapp(ctaMessages.general)}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
                light
                  ? "bg-navy text-cream hover:bg-brand"
                  : "bg-cream text-ink hover:bg-teal-bright",
              )}
            >
              Plan an Event →
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full transition-colors md:hidden",
              open ? "text-cream" : light ? "text-ink" : "text-cream",
            )}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-navy text-cream md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between px-6 py-5">
              <img
                src={asset("/logo-dark.png")}
                alt={brand.legalName}
                className="h-8 w-auto"
              />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-full text-cream"
              >
                <X size={26} />
              </button>
            </div>

            <div className="flex flex-1 flex-col justify-center px-8">
              {nav.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                  className="border-b border-cream/10 py-5 text-4xl font-medium"
                >
                  <span className="mr-4 text-sm font-semibold text-teal-bright">
                    0{i + 1}
                  </span>
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href={whatsapp(ctaMessages.general)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-10 inline-flex w-fit items-center rounded-full bg-teal-bright px-8 py-4 text-lg font-semibold text-ink"
              >
                Plan Your Event →
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
