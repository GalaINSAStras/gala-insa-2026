import { CalendarDays, MapPin } from "lucide-react";
import { GALA } from "@/lib/hero-data";

export function HeroMeta() {
  return (
    <div className="mt-7 flex flex-col items-center justify-center gap-3 text-[clamp(.9rem,2vw,1.05rem)] text-ardoise sm:flex-row sm:gap-0 lg:mt-10">
      <span className="inline-flex items-center gap-2.5">
        <CalendarDays className="h-[1.15em] w-[1.15em] text-[var(--or-fonce)]" strokeWidth={1.7} />
        <time dateTime={GALA.dateISO} className="font-titre font-semibold tracking-wide">
          {GALA.date}
        </time>
      </span>

      <span aria-hidden className="mx-5 hidden h-5 w-px bg-ardoise/25 sm:block" />

      <a
        href={GALA.venueMapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2.5 whitespace-nowrap rounded text-[clamp(.8rem,1.9vw,1.05rem)] transition-colors hover:text-[var(--or-fonce)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--or-fonce)] focus-visible:ring-offset-2"
      >
        <MapPin className="h-[1.15em] w-[1.15em] shrink-0 text-[var(--or-fonce)]" strokeWidth={1.7} />
        <span className="font-titre tracking-[.06em]">{GALA.venue.toUpperCase()}</span>
      </a>
    </div>
  );
}
