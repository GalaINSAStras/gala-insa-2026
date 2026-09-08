"use client";

import { useMemo, useRef, useState } from "react";
import {
  Bean,
  ChevronDown,
  Egg,
  Fish,
  Milk,
  Nut,
  Shrimp,
  Wheat,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { ButtonFleuron } from "@/components/ui/ButtonFleuron";
import { Grain } from "@/components/ornaments/Grain";
import type { Comptoir, Plat } from "@/lib/sanity/types";

const ALLERGEN_META: Record<
  string,
  { label: string; Icon: LucideIcon; bg: string; text: string; border: string }
> = {
  gluten: { label: "Gluten", Icon: Wheat, bg: "#F5DCE3", text: "#8A4A5C", border: "#E9C1CF" },
  lactose: { label: "Lactose", Icon: Milk, bg: "#E8EEF6", text: "#2C3E5C", border: "#C6D7E8" },
  oeufs: { label: "Œufs", Icon: Egg, bg: "#FDF6E3", text: "#8A6A1F", border: "#F0D9A6" },
  fruits_coque: { label: "Fruits à coque", Icon: Nut, bg: "#F5DCE3", text: "#8A4A5C", border: "#E9C1CF" },
  soja: { label: "Soja", Icon: Bean, bg: "#D6EDCF", text: "#2C3E5C", border: "#B6D2AE" },
  poisson: { label: "Poisson", Icon: Fish, bg: "#E8EEF6", text: "#2C3E5C", border: "#C6D7E8" },
  crustaces: { label: "Crustacés", Icon: Shrimp, bg: "#FDF6E3", text: "#8A6A1F", border: "#F0D9A6" },
};

/** Ordre d'affichage canonique (légende) */
const ALLERGEN_ORDER = [
  "gluten",
  "lactose",
  "oeufs",
  "fruits_coque",
  "soja",
  "poisson",
  "crustaces",
] as const;

const REGIME_LABELS: Record<string, string> = {
  vegetarien: "Végétarien",
  vegan: "Vegan",
  sans_gluten: "Sans gluten",
};

function AllergenPill({ code }: { code: string }) {
  const meta = ALLERGEN_META[code];
  if (!meta) return null;
  const Icon = meta.Icon;
  return (
    <span
      title={meta.label}
      aria-label={`Allergène : ${meta.label}`}
      className="group relative inline-flex h-6 w-6 items-center justify-center rounded-full border"
      style={{ background: meta.bg, color: meta.text, borderColor: meta.border }}
    >
      <Icon className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded-md bg-marine px-2 py-1 text-[11px] font-normal text-white opacity-0 transition-opacity group-hover:opacity-100"
      >
        {meta.label}
      </span>
    </span>
  );
}

export function Buffet({
  comptoirs,
  prixBuffet,
}: {
  comptoirs: Comptoir[];
  prixBuffet?: number;
}) {
  const [active, setActive] = useState<Set<string>>(new Set());

  const allAllergens = useMemo(() => {
    const set = new Set<string>();
    (comptoirs ?? []).forEach((c) =>
      (c.plats ?? []).forEach((p) =>
        (p.allergenes ?? []).forEach((a) => set.add(a))
      )
    );
    return Array.from(set);
  }, [comptoirs]);

  const legendAllergens = ALLERGEN_ORDER.filter((a) =>
    allAllergens.includes(a)
  );

  const toggle = (a: string) =>
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(a)) next.delete(a);
      else next.add(a);
      return next;
    });

  const isHidden = (plat: Plat) => {
    if (active.size === 0) return false;
    return (plat.allergenes ?? []).some((a) => active.has(a));
  };

  if (!comptoirs || comptoirs.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-bleuPale py-[clamp(3rem,7vw,6rem)]">
      {/* Dégradé doré partagé pour les frontons métalliques */}
      <svg width="0" height="0" aria-hidden className="absolute">
        <defs>
          <linearGradient id="gala-gold-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#F3DAA2" />
            <stop offset="0.5" stopColor="#D9A956" />
            <stop offset="1" stopColor="#B8893C" />
          </linearGradient>
        </defs>
      </svg>
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Le dîner"
          title="Buffet"
          subtitle="Un cocktail dînatoire raffiné, préparé avec soin par notre traiteur."
        />

        {prixBuffet != null && (
          <div className="mx-auto mt-8 max-w-md rounded-2xl border border-[var(--or-moyen)]/50 bg-[linear-gradient(135deg,var(--jaune-pale),#FBF0D6)] px-8 py-4 text-center shadow-[0_6px_24px_rgba(168,134,63,.14)]">
            <p className="font-garamond text-sm font-semibold italic text-[var(--or-fonce)]">
              Place buffet + soirée
            </p>
            <p className="font-garamond text-3xl font-semibold text-[var(--or-fonce)] tabular-nums">
              À partir de {prixBuffet} €
            </p>
          </div>
        )}

        {allAllergens.length > 0 && (
          <div className="mt-10 flex flex-col items-center gap-3">
            <div className="flex flex-wrap justify-center gap-2">
              {allAllergens.map((a) => {
                const meta = ALLERGEN_META[a];
                const on = active.has(a);
                return (
                  <button
                    key={a}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(a)}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                      on
                        ? "border-[var(--or-fonce)] text-[var(--or-fonce)]"
                        : "border-[var(--or-moyen)]/40 text-ardoise/80 hover:border-[var(--or-moyen)]"
                    }`}
                    style={on ? { background: meta?.bg } : undefined}
                  >
                    {meta?.label ?? a}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {comptoirs.map((comptoir, i) => (
            <Reveal key={comptoir._key} delay={i * 0.08} className="h-full">
              <ComptoirCard comptoir={comptoir} isHidden={isHidden} />
            </Reveal>
          ))}
        </div>

        {/* Légende des allergènes */}
        {legendAllergens.length > 0 && (
          <div className="mt-12 flex flex-col items-center gap-3">
            <p className="font-garamond text-xs font-semibold italic text-ardoise/60">
              Légende des allergènes
            </p>
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {legendAllergens.map((code) => {
                const meta = ALLERGEN_META[code];
                if (!meta) return null;
                const Icon = meta.Icon;
                return (
                  <li
                    key={code}
                    className="inline-flex items-center gap-1.5 text-sm text-ardoise/80"
                  >
                    <span
                      className="inline-flex h-6 w-6 items-center justify-center rounded-full border"
                      style={{
                        background: meta.bg,
                        color: meta.text,
                        borderColor: meta.border,
                      }}
                    >
                      <Icon className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                    </span>
                    {meta.label}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

function ComptoirCard({
  comptoir,
  isHidden,
}: {
  comptoir: Comptoir;
  isHidden: (p: Plat) => boolean;
}) {
  const [open, setOpen] = useState(false);
  const plats = comptoir.plats ?? [];
  const visiblePlats = plats.filter((p) => !isHidden(p));
  const hasHidden = visiblePlats.length < plats.length;

  // Défilement interne : référencé pour la zone scrollable
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <article
      className="relative flex flex-col overflow-hidden rounded-t-[120px] rounded-b-2xl pt-12 shadow-[0_10px_36px_rgba(63,91,118,.12)] sm:h-[520px]"
      style={{
        border: "2px solid transparent",
        background:
          "#FFFDF8 padding-box, linear-gradient(120deg,#F6E3B8,#D9A956 30%,#FDF0D0 48%,#B8893C 62%,#E8CFA0 80%,#D9A956) border-box",
      }}
    >
      {/* grain de papier */}
      <Grain opacity={0.22} />
      {/* double liseré doré */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-2 rounded-t-[112px] rounded-b-xl border border-[var(--or-clair)]/40"
      />

      {/* fronton ornemental */}
      <svg
        aria-hidden
        viewBox="0 0 200 44"
        className="pointer-events-none absolute left-1/2 top-0 h-11 w-44 -translate-x-1/2"
      >
        <path d="M14 40 C 50 10, 150 10, 186 40" fill="none" stroke="#B8893C" strokeWidth="1.8" />
        <path d="M26 40 C 58 16, 142 16, 174 40" fill="none" stroke="#E8CFA0" strokeWidth="0.8" />
        <path d="M100 6 l5 9 -5 9 -5 -9 Z" fill="url(#gala-gold-grad)" />
      </svg>

      <header className="relative px-6 text-center">
        <h3 className="font-heading text-2xl text-marine">
          {comptoir.nom}
        </h3>
        {comptoir.sousTitre && (
          <p className="mt-1 font-garamond text-sm font-semibold italic text-ardoise/70">
            {comptoir.sousTitre}
          </p>
        )}
      </header>

      {/* accordéon mobile */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="mx-6 mt-3 flex items-center justify-center gap-1 rounded-full border border-[var(--or-moyen)]/40 py-1.5 text-xs font-medium text-ardoise/80 sm:hidden"
      >
        {open ? "Replier" : "Voir les plats"}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      {/* Liste — défilement interne sur écrans ≥ sm */}
      <div
        ref={scrollRef}
        className={`relative mt-4 min-h-0 flex-1 px-6 pb-4 gala-scroll sm:overflow-y-auto ${open ? "block" : "hidden"} sm:block`}
      >
        {visiblePlats.length === 0 ? (
          <p className="text-sm italic text-ardoise/60">
            Aucun plat ne correspond à votre sélection.
          </p>
        ) : (
          <ul className="divide-y divide-dotted divide-[var(--or-moyen)]/40">
            {visiblePlats.map((plat, j) => (
              <li key={plat._key ?? j} className="py-3 first:pt-0 last:pb-0">
                <div className="flex items-start justify-between gap-3">
                  <span className="font-garamond font-semibold italic text-marine">{plat.nom}</span>
                  {plat.regime && (
                    <span className="shrink-0 rounded-full bg-[var(--rose-poudre)] px-2 py-0.5 text-[11px] font-medium text-[#8A4A5C]">
                      {REGIME_LABELS[plat.regime]}
                    </span>
                  )}
                </div>
                {plat.provenance && (
                  <p className="mt-1 text-sm italic text-ardoise/70">
                    {plat.provenance}
                  </p>
                )}
                {(plat.allergenes?.length ?? 0) > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {plat.allergenes!.map((a) => (
                      <AllergenPill key={a} code={a} />
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
        {hasHidden && (
          <p className="mt-3 text-xs italic text-ardoise/60">
            Certains plats sont masqués selon vos filtres.
          </p>
        )}
      </div>

      {/* Signature fleuron en pied de carte */}
      <div className="relative hidden items-center justify-center gap-3 px-6 pb-5 pt-2 sm:flex">
        <span aria-hidden className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--or-moyen)]" />
        <ButtonFleuron className="h-4 w-4" />
        <span aria-hidden className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--or-moyen)]" />
      </div>
    </article>
  );
}

