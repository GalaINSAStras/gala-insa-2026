import type { ReactNode } from "react";
import { PageBackdrop } from "./PageBackdrop";
import { ButtonFleuron } from "@/components/ui/ButtonFleuron";

type PageHeroProps = {
  /** Sur-titre en petites capitales dorées (ex : « Édition 2026 ») */
  kicker?: string;
  /** Titre principal de la page */
  title: string;
  /** Accroche / sous-titre */
  subtitle?: string;
  /** Contenu optionnel (CTA, badges…) affiché sous l'accroche */
  children?: ReactNode;
};

/**
 * Hero de page orné — même langage visuel que HeroSoiree :
 * backdrop végétal + colonnes ioniques + sur-titre doré encadré de filets,
 * titre Playfair italic, fleuron, accroche.
 * Réutilisable sur toutes les pages intérieures (billetterie, infos pratiques…).
 */
export function PageHero({ kicker, title, subtitle, children }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden">
      <PageBackdrop />

      {/* Colonnes ioniques (masquées < 768px) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/ornaments/colonne_gauche.svg"
          alt=""
          className="absolute left-0 top-0 h-full w-[clamp(110px,14vw,210px)] object-contain object-bottom opacity-90"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/ornaments/colonne_droite.svg"
          alt=""
          className="absolute right-0 top-0 h-full w-[clamp(110px,15vw,210px)] object-contain object-bottom opacity-90"
        />
      </div>

      <div className="relative mx-auto max-w-[1180px] px-4 py-16 sm:px-6 sm:py-20 md:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Sur-titre */}
          {kicker && (
            <div className="flex items-center justify-center gap-4">
              <span
                aria-hidden
                className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--or-moyen)] md:w-20"
              />
              <span className="font-titre text-[clamp(.72rem,1.6vw,.9rem)] font-semibold uppercase tracking-[.32em] text-[var(--or-fonce)]">
                {kicker}
              </span>
              <span
                aria-hidden
                className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--or-moyen)] md:w-20"
              />
            </div>
          )}

          {/* Titre */}
          <h1
            className="mt-6 text-marine [text-wrap:balance] [text-shadow:0_2px_18px_rgba(44,62,92,.12)]"
            style={{ fontFamily: "var(--font-title)", fontSize: "clamp(2.5rem, 6.5vw, 4.75rem)", lineHeight: 1.05 }}
          >
            {title}
          </h1>

          {/* Filet + fleuron + filet */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <span
              aria-hidden
              className="h-px w-16 bg-gradient-to-r from-transparent to-[var(--or-moyen)] md:w-28"
            />
            <ButtonFleuron className="h-7 w-7 drop-shadow-[0_1px_2px_rgba(168,134,63,.35)]" />
            <span
              aria-hidden
              className="h-px w-16 bg-gradient-to-l from-transparent to-[var(--or-moyen)] md:w-28"
            />
          </div>

          {/* Accroche */}
          {subtitle && (
            <p className="mx-auto mt-6 max-w-[620px] text-ardoise leading-relaxed [text-wrap:balance]">
              {subtitle}
            </p>
          )}

          {children && <div className="mt-10">{children}</div>}
        </div>
      </div>
    </section>
  );
}
