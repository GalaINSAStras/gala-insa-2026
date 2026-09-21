"use client";

import { useEffect, useState } from "react";
import { clientFetch, urlFor } from "@/lib/sanity/client";
import Image from "next/image";
import { ButtonFleuron } from "@/components/ui/ButtonFleuron";
import type { Partner } from "@/lib/sanity/types";

/**
 * Grille des partenaires — « plaques gravées » Art nouveau.
 * Cartes non-cliquables : fond blanc (absorbe le blanc des logos webp opaques),
 * double liseré doré, pastilles d'angle, fleuron, logo en haute résolution sans crop.
 */
export function PartnersGrid() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    clientFetch<Partner[]>(`*[_type == "partner"] | order(displayOrder asc)`)
      .then((data) => {
        if (!cancelled) {
          setPartners(data ?? []);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:gap-7 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-32 animate-pulse rounded-md border bg-muted sm:h-44" />
        ))}
      </div>
    );
  }

  if (!partners.length) {
    return <p className="text-muted-foreground italic">Aucun partenaire pour le moment.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-7 lg:grid-cols-3">
      {partners.map((p) => (
        <div
          key={p._id}
          className="relative flex flex-col items-center rounded-md border-[1.5px] border-[var(--or-moyen)]/55 bg-white px-3 pb-4 pt-5 shadow-[0_6px_20px_rgba(63,91,118,.07)] sm:px-7 sm:pb-6 sm:pt-8"
        >
          {/* Liseré intérieur doré */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-[5px] rounded-[4px] border border-[var(--or-clair)]/55"
          />

          {/* Pastilles d'angle */}
          <span
            aria-hidden
            className="absolute left-0 top-0 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[var(--or-moyen)]"
          />
          <span
            aria-hidden
            className="absolute right-0 top-0 h-[7px] w-[7px] -translate-y-1/2 translate-x-1/2 rotate-45 bg-[var(--or-moyen)]"
          />
          <span
            aria-hidden
            className="absolute bottom-0 left-0 h-[7px] w-[7px] -translate-x-1/2 translate-y-1/2 rotate-45 bg-[var(--or-moyen)]"
          />
          <span
            aria-hidden
            className="absolute bottom-0 right-0 h-[7px] w-[7px] translate-x-1/2 translate-y-1/2 rotate-45 bg-[var(--or-moyen)]"
          />

          {/* Fleuron sommet */}
          <ButtonFleuron className="h-4 w-4 drop-shadow-[0_1px_2px_rgba(168,134,63,.3)] sm:h-5 sm:w-5" />

          {/* Logo — haute résolution, sans crop */}
          <div className="relative mt-2 flex h-14 w-full items-center justify-center sm:mt-4 sm:h-20">
            {p.logo ? (
              <Image
                src={urlFor(p.logo).width(480).url()}
                alt={`Logo ${p.name}`}
                fill
                className="object-contain"
                sizes="(min-width:1024px) 220px, (min-width:640px) 300px, 45vw"
              />
            ) : (
              <span className="font-garamond text-sm font-semibold italic text-muted-foreground/60">
                {p.name}
              </span>
            )}
          </div>

          {/* Nom */}
          <p className="mt-2 text-center font-garamond text-xs font-semibold italic text-marine sm:mt-3 sm:text-[15px]">
            {p.name}
          </p>
        </div>
      ))}
    </div>
  );
}
