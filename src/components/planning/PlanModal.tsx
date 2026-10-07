"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import Link from "next/link";
import { brand, eventTypes, whatsapp } from "@/lib/site";

type PlanModalContextValue = {
  /** Open the modal, optionally pre-selecting an event type. */
  open: (eventType?: string) => void;
  close: () => void;
};

const PlanModalContext = createContext<PlanModalContextValue | null>(null);

/** Open the "plan your event" modal from anywhere (nav, hero, contact). */
export function usePlanModal() {
  const ctx = useContext(PlanModalContext);
  if (!ctx) throw new Error("usePlanModal must be used within PlanModalProvider");
  return ctx;
}

export function PlanModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialType, setInitialType] = useState("");
  const open = (eventType?: string) => {
    setInitialType(eventType ?? "");
    setIsOpen(true);
  };
  const close = () => setIsOpen(false);

  // Lock body scroll + close on Escape while open.
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  return (
    <PlanModalContext.Provider value={{ open, close }}>
      {children}
      <AnimatePresence>
        {isOpen && <PlanModal initialType={initialType} onClose={close} />}
      </AnimatePresence>
    </PlanModalContext.Provider>
  );
}

function PlanModal({
  initialType,
  onClose,
}: {
  initialType: string;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState(initialType);
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  // Build a WhatsApp message from the form (no backend — routes to wa.me).
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const lines = [
      "*New event enquiry — Be Good*",
      "",
      `*Name:* ${name}`,
      `*Email:* ${email}`,
      phone ? `*Phone:* ${phone}` : "",
      type ? `*Event type:* ${type}` : "",
      message ? `*Details:* ${message}` : "",
    ].filter(Boolean);
    window.open(whatsapp(lines.join("\n")), "_blank");
    onClose();
  };

  const field =
    "w-full rounded-2xl border border-ink/10 bg-white px-4 py-3.5 outline-none transition-colors focus:border-teal";

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/70 p-5 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Plan your event"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative max-h-[90vh] w-full max-w-[680px] overflow-auto rounded-[30px] bg-cream p-8 text-ink md:p-9"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-mist transition-colors hover:bg-mist/70"
        >
          <X size={20} />
        </button>

        <p className="text-xs font-bold uppercase tracking-[0.17em] text-teal">
          Plan your event
        </p>
        <h2 className="mt-2 font-display text-4xl font-bold tracking-tight md:text-5xl">
          Let&apos;s make it happen.
        </h2>
        <p className="mt-3 text-ink/60">
          A short brief is all we need to start. We&apos;ll follow up with the
          right questions.
        </p>

        <form onSubmit={submit} className="mt-6 grid gap-3">
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className={field}
          />
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Work email"
            className={field}
          />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone / WhatsApp"
            className={field}
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={field}
          >
            <option value="">What are you planning?</option>
            {eventTypes.map((t) => (
              <option key={t.id} value={t.label}>
                {t.label}
              </option>
            ))}
          </select>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us a little about the event, date or audience"
            rows={4}
            className={`${field} resize-y`}
          />
          <label className="flex items-start gap-3 text-sm text-ink/60">
            <input
              type="checkbox"
              required
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 accent-navy"
            />
            <span>
              I consent to Be Good contacting me about this enquiry and agree
              to the{" "}
              <Link href="/privacy" className="text-teal underline">
                Privacy Policy
              </Link>
              .
            </span>
          </label>
          <button
            type="submit"
            className="mt-1 rounded-full bg-navy px-6 py-4 font-bold text-cream transition-colors hover:bg-brand"
          >
            Send enquiry →
          </button>
          <p className="text-center text-xs text-ink/40">
            Opens WhatsApp to {brand.phoneDisplay} — no data is stored.
          </p>
        </form>
      </motion.div>
    </motion.div>
  );
}
