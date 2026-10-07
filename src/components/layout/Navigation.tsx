"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { asset, brand, nav, BASE_PATH } from "@/lib/site";
import { cn } from "@/lib/utils";
import { usePlanModal } from "@/components/planning/PlanModal";

/**
 * Floating pill navigation (centered, glass). Dark glass over the hero,
 * morphing into a cream pill once the page scrolls. Mobile: full-screen menu.
 */
export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { open: openModal } = usePlanModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
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

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <nav
          aria-label="Primary"
          className={cn(
            "flex w-full max-w-[1180px] items-center justify-between rounded-full border py-2.5 pl-5 pr-2.5 transition-all duration-500",
            scrolled
              ? "border-ink/10 bg-cream/90 text-ink shadow-[0_15px_50px_rgba(0,0,0,0.08)] backdrop-blur-xl"
              : "border-white/15 bg-ink/50 text-cream backdrop-blur-xl",
          )}
        >
          <a href={`${BASE_PATH}/`} aria-label={brand.legalName}>
            <img
              src={asset(scrolled ? "/logo-light.png" : "/logo-dark.png")}
              alt={brand.legalName}
              className="h-7 w-auto transition-all duration-500"
            />
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[13px] font-semibold opacity-80 transition-opacity hover:opacity-100"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => openModal()}
              className={cn(
                "hidden rounded-full px-4 py-2 text-[13px] font-bold transition-colors md:inline-flex",
                scrolled
                  ? "bg-navy text-cream hover:bg-brand"
                  : "bg-cream text-navy hover:bg-aqua",
              )}
            >
              Plan an event →
            </button>
            <button
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="flex h-9 w-9 items-center justify-center rounded-full md:hidden"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
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
                  <span className="mr-4 text-sm font-semibold text-aqua">
                    0{i + 1}
                  </span>
                  {item.label}
                </motion.a>
              ))}
              <motion.button
                onClick={() => {
                  setOpen(false);
                  openModal();
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-10 inline-flex w-fit items-center rounded-full bg-aqua px-8 py-4 text-lg font-semibold text-navy"
              >
                Plan Your Event →
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
