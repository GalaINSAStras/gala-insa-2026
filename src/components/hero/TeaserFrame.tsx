import type { ReactNode } from "react";
import { FloralEdge } from "@/components/ornaments/FloralEdge";

function Corner({
  className,
  flipX,
  flipY,
}: {
  className: string;
  flipX?: boolean;
  flipY?: boolean;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 60 60"
      className={className}
      style={{ transform: `${flipX ? "scaleX(-1)" : ""} ${flipY ? "scaleY(-1)" : ""}` }}
    >
      <path d="M2 58 L2 18 C2 9 9 2 18 2 L58 2" fill="none" stroke="var(--or-fonce)" strokeWidth="1.6" />
      <path d="M8 58 L8 20 C8 13 13 8 20 8 L58 8" fill="none" stroke="var(--or-moyen)" strokeWidth=".9" opacity=".8" />
      <circle cx="20" cy="20" r="2.6" fill="var(--or-moyen)" />
      <path d="M20 20 L34 14 M20 20 L14 34" stroke="var(--or-moyen)" strokeWidth="1" />
    </svg>
  );
}

export function TeaserFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      {/* Passe-partout ivoire */}
      <div className="relative rounded-[10px] bg-[var(--ivoire)] p-[clamp(10px,1.6vw,22px)] shadow-[0_14px_40px_-18px_rgba(63,91,118,.35)]">
        {/* liseré doré */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-[6px] rounded-[8px] ring-1 ring-[var(--or-moyen)]/55"
        />
        {/* coins */}
        <Corner className="pointer-events-none absolute left-1 top-1 h-8 w-8 md:h-11 md:w-11" flipY />
        <Corner className="pointer-events-none absolute right-1 top-1 h-8 w-8 md:h-11 md:w-11" flipX flipY />
        <Corner className="pointer-events-none absolute bottom-1 left-1 h-8 w-8 md:h-11 md:w-11" />
        <Corner className="pointer-events-none absolute bottom-1 right-1 h-8 w-8 md:h-11 md:w-11" flipX />

        {/* média */}
        <div className="relative overflow-hidden rounded-[4px] bg-ardoise">{children}</div>
      </div>

      {/* bouquets qui débordent */}
      <FloralEdge className="pointer-events-none absolute -left-6 -top-8 h-28 w-28 md:h-40 md:w-40" flipY />
      <FloralEdge className="pointer-events-none absolute -right-6 -top-8 h-28 w-28 md:h-40 md:w-40" flipX flipY scale={0.95} />
      <FloralEdge className="pointer-events-none absolute -bottom-8 -left-6 h-28 w-28 md:h-40 md:w-40" scale={1.05} />
      <FloralEdge className="pointer-events-none absolute -bottom-8 -right-6 h-28 w-28 md:h-40 md:w-40" flipX />
    </div>
  );
}
