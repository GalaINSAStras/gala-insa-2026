import type { ReactNode } from "react";

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

      {/* motifs floraux qui débordent (4 coins) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/ornaments/motif_floral.svg"
        alt=""
        aria-hidden
        style={{ transform: "rotate(180deg)" }}
        className="pointer-events-none absolute -left-2 -top-4 md:-left-6 md:-top-8 h-20 w-20 object-contain md:h-40 md:w-40"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/ornaments/motif_floral.svg"
        alt=""
        aria-hidden
        style={{ transform: "scaleX(-1) rotate(180deg)" }}
        className="pointer-events-none absolute -right-2 -top-4 md:-right-6 md:-top-8 h-20 w-20 object-contain md:h-40 md:w-40"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/ornaments/motif_floral.svg"
        alt=""
        aria-hidden
        style={{ transform: "scaleX(1)" }}
        className="pointer-events-none absolute -bottom-4 -right-2 md:-bottom-8 md:-right-6 h-20 w-20 object-contain md:h-40 md:w-40"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/ornaments/motif_floral.svg"
        alt=""
        aria-hidden
        style={{ transform: "scaleX(-1)" }}
        className="pointer-events-none absolute -bottom-4 -left-2 md:-bottom-8 md:-left-6 h-20 w-20 object-contain md:h-40 md:w-40"
      />
    </div>
  );
}
