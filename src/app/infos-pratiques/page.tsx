import type { Metadata } from "next";
import { getInfosPratiques, getEvent } from "@/lib/sanity/queries";
import { pdfDownloadUrl } from "@/lib/sanity/pdf";
import { MapSection } from "./map-section";
import { DownloadPlanButton } from "./download-plan-button";
import { DocumentsSection } from "./documents-section";
import { TransportInfo } from "./transport-info";
import { PageHero } from "@/components/ornaments/PageHero";
import { FloralSeparator } from "@/components/ornaments/FloralSeparator";
import { SectionHeading } from "@/components/soiree/SectionHeading";
import { ButtonFleuron } from "@/components/ui/ButtonFleuron";
import { CartoucheButton } from "@/components/ui/CartoucheButton";

export const metadata: Metadata = {
  title: "Infos Pratiques",
  description:
    "Horaires, accès, accessibilité et protocoles de la Team Stop VSS pour le Gala INSA Strasbourg 2026.",
};

export const revalidate = 60;

export default async function InfosPratiquesPage() {
  const [infos, event] = await Promise.all([
    getInfosPratiques().catch(() => null),
    getEvent().catch(() => null),
  ]);
  // Plan PDF servi sous son nom d'origine via /documents/<nom-du-fichier>?download=1
  // (masqué tant que le plan n'est pas uploadé dans Sanity)
  const planPdfHref = infos?.planPDF ? pdfDownloadUrl(infos.planPDF) : null;
  const venueAddress = (event?.address ?? "11 Allée François Mitterrand, 67400 Illkirch-Graffenstaden").replace(
    /^L['']Illiade[\s,-]*/i,
    ""
  );
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(venueAddress)}`;

  const hasHoraires = Boolean(infos?.openingTime || infos?.closingTime);

  return (
    <div className="flex flex-col">
      {/* === Hero orné === */}
      <PageHero
        kicker="Édition 2026"
        title="Infos Pratiques"
        subtitle="Tout ce que vous devez savoir avant le grand soir."
      />

      {/* Séparateur floral */}
      <FloralSeparator />

      {/* === Horaires & Accessibilité === */}
      <section className="bg-ivoire py-[clamp(3rem,7vw,6rem)]">
        <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
          <SectionHeading kicker="Le jour J" title="Horaires & accès" />

          <div className="mt-10 grid gap-5 sm:gap-6 md:mt-12 md:grid-cols-2">
            {/* Horaires */}
            <article className="group relative flex h-full flex-col rounded-2xl border border-[var(--or-moyen)]/50 bg-white/65 p-6 shadow-[0_8px_28px_rgba(63,91,118,.08)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(63,91,118,.13)] sm:p-7">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-2 rounded-xl border border-[var(--or-clair)]/40"
              />
              <div className="relative flex items-center gap-3">
                <ButtonFleuron className="h-5 w-5" />
                <h2 className="font-heading text-xl text-marine">
                  Horaires
                </h2>
              </div>
              <div className="relative mt-5 space-y-4">
                {hasHoraires ? (
                  <>
                    {infos?.openingTime && (
                      <div className="flex items-baseline justify-between gap-4 border-b border-dotted border-[var(--or-moyen)]/40 pb-3">
                        <p className="font-garamond text-xs font-semibold italic text-[var(--or-fonce)] max-sm:text-lg">
                          Ouverture
                        </p>
                        <p className="font-garamond text-2xl font-semibold text-ardoise tabular-nums">
                          {infos.openingTime}
                        </p>
                      </div>
                    )}
                    {infos?.closingTime && (
                      <div className="flex items-baseline justify-between gap-4">
                        <p className="font-garamond text-xs font-semibold italic text-[var(--or-fonce)] max-sm:text-lg">
                          Fermeture
                        </p>
                        <p className="font-garamond text-2xl font-semibold text-ardoise tabular-nums">
                          {infos.closingTime}
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="italic text-ardoise/60">
                    Les horaires seront annoncés prochainement.
                  </p>
                )}
              </div>
            </article>

            {/* Accessibilité */}
            {infos?.accessibilite && (
              <article className="group relative flex h-full flex-col rounded-2xl border border-[var(--or-moyen)]/50 bg-white/65 p-6 shadow-[0_8px_28px_rgba(63,91,118,.08)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(63,91,118,.13)] sm:p-7">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-2 rounded-xl border border-[var(--or-clair)]/40"
                />
                <div className="relative flex items-center gap-3">
                  <ButtonFleuron className="h-5 w-5" />
                  <h2 className="font-heading text-xl text-marine">
                    Accessibilité
                  </h2>
                </div>
                <p className="relative mt-5 whitespace-pre-line text-ardoise/85 leading-relaxed">
                  {infos.accessibilite}
                </p>
              </article>
            )}
          </div>
        </div>
      </section>

      {/* === Plan & Carte interactive === */}
      <section className="bg-bleuPale py-[clamp(3rem,7vw,6rem)]">
        <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Nous trouver"
            title="Plan d'accès"
            subtitle={`L'Illiade — ${venueAddress}`}
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-16">
            {/* Colonne gauche : carte seule */}
            <MapSection
              lat={infos?.mapLat ?? 48.528954680638776}
              lng={infos?.mapLng ?? 7.707054682944534}
              address={venueAddress}
            />

            {/* Colonne droite : boutons + transports */}
            <div className="flex flex-col justify-center gap-6">
              <div className="flex flex-wrap items-center gap-3">
                <CartoucheButton href={directionsUrl} external variant="marine" size="sm">
                  Voir l&rsquo;itinéraire
                </CartoucheButton>
                {planPdfHref && <DownloadPlanButton href={planPdfHref} />}
              </div>

              <TransportInfo />
            </div>
          </div>
        </div>
      </section>

      {/* === Team Stop VSS === */}
      {infos?.stopVSS && (
        <section className="bg-ivoire py-[clamp(3rem,7vw,6rem)]">
          <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
            <SectionHeading
              kicker="Prévention"
              title={infos.stopVSSTitle ?? "Team Stop VSS"}
            />

            <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-[var(--or-moyen)]/40 bg-[var(--rose-poudre)]/40 p-7 shadow-[0_8px_28px_rgba(63,91,118,.06)]">
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--rose-moyen)]/30">
                  <svg
                    className="h-5 w-5 text-[#8A4A5C]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </span>
                <p className="whitespace-pre-line text-ardoise/85 leading-relaxed">
                  {infos.stopVSS}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* === Documents officiels (CGV) === */}
      <DocumentsSection />
    </div>
  );
}
