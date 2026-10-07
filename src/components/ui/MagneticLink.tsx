"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * An <a> that subtly translates toward the cursor on hover ("magnetic" feel).
 * Used for CTAs. Respects prefers-reduced-motion.
 */
export default function MagneticLink({
  href,
  onClick,
  className,
  children,
  target,
  rel,
  ariaLabel,
}: {
  href: string;
  onClick?: () => void;
  className?: string;
  children: ReactNode;
  target?: string;
  rel?: string;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transition = "transform 0.15s ease-out";
    el.style.transform = `translate(${x * 0.2}px, ${y * 0.25}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)";
    el.style.transform = "";
  };

  return (
    <a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      className={cn("inline-flex items-center justify-center", className)}
    >
      {children}
    </a>
  );
}
