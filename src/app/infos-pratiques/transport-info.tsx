"use client";

import { Bus, TrainFront, Car } from "lucide-react";

/**
 * Bloc d'informations transports — icônes dans des médaillons dorés
 * (clin d'œil aux médaillons de la timeline), carte au liseré doré.
 */
export function TransportInfo() {
  return (
    <div className="relative flex flex-col justify-center rounded-2xl border border-[var(--or-moyen)]/50 bg-white/60 p-6 shadow-[0_6px_20px_rgba(63,91,118,.06)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-2 rounded-xl border border-[var(--or-clair)]/40"
      />
      <h3 className="relative font-heading text-xl text-marine">
        Transports
      </h3>
      <div className="relative mt-4 space-y-4 text-sm text-ardoise/80 leading-relaxed">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--or-fonce)]/40 bg-[linear-gradient(180deg,var(--or-clair),var(--or-moyen))] shadow-[0_2px_8px_rgba(168,134,63,.3)]">
            <Bus className="h-4 w-4 text-[var(--marine)]" strokeWidth={2} />
          </span>
          <div>
            <p className="font-garamond font-semibold italic text-marine">En bus</p>
            <p>Ligne 67, direction Plobsheim Est, arrêt Cours de l&rsquo;Illiade</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--or-fonce)]/40 bg-[linear-gradient(180deg,var(--or-clair),var(--or-moyen))] shadow-[0_2px_8px_rgba(168,134,63,.3)]">
            <TrainFront className="h-4 w-4 text-[var(--marine)]" strokeWidth={2} />
          </span>
          <div>
            <p className="font-garamond font-semibold italic text-marine">En tram</p>
            <p>Ligne A, direction Illkirch Graffenstaden, arrêt Cours de l&rsquo;Illiade</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--or-fonce)]/40 bg-[linear-gradient(180deg,var(--or-clair),var(--or-moyen))] shadow-[0_2px_8px_rgba(168,134,63,.3)]">
            <Car className="h-4 w-4 text-[var(--marine)]" strokeWidth={2} />
          </span>
          <div>
            <p className="font-garamond font-semibold italic text-marine">En voiture</p>
            <p>Depuis l&rsquo;autoroute A35, sorties Illkirch Nord ou Vigie, Ostwald</p>
          </div>
        </div>
      </div>
      <div className="relative mt-5 rounded-xl border border-[var(--or-fonce)]/45 bg-[var(--jaune-pale)]/70 p-4 shadow-[0_4px_14px_rgba(168,134,63,.12)]">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--or-fonce)]/40 bg-[linear-gradient(180deg,var(--or-clair),var(--or-moyen))]">
            <Bus className="h-4 w-4 text-[var(--marine)]" strokeWidth={2} />
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <p className="font-garamond font-semibold italic text-marine">
                Navettes retour vers l&rsquo;INSA
              </p>
              <p className="font-garamond text-lg font-semibold text-[var(--or-fonce)]">
                5&nbsp;&euro; / place
              </p>
            </div>
            <p className="mt-1 text-sm text-ardoise/85">
              2 navettes &agrave; 2h et 2 navettes &agrave; 3h pour rentrer apr&egrave;s la soir&eacute;e.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
