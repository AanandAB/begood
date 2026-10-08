import { cn } from "@/lib/utils";

/**
 * Seamless horizontal marquee — items are duplicated and the track translates
 * -50% for an infinite loop. Decorative, so hidden from assistive tech.
 */
export default function Marquee({
  items,
  className,
  itemClassName,
}: {
  items: string[];
  className?: string;
  itemClassName?: string;
}) {
  const doubled = [...items, ...items];
  return (
    <div className={cn("overflow-hidden", className)} aria-hidden="true">
      <div className="marquee-track flex w-max items-center">
        {doubled.map((it, i) => (
          <span key={i} className="flex items-center">
            <span className={cn("whitespace-nowrap px-6", itemClassName)}>
              {it}
            </span>
            <span className="text-teal-bright">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
