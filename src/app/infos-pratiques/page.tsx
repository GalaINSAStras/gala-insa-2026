import type { Metadata } from "next";
import { getInfosPratiques, getEvent } from "@/lib/sanity/queries";
import { MapSection } from "./map-section";
import { DownloadPlanButton } from "./download-plan-button";
import { TransportInfo } from "./transport-info";

export const metadata: Metadata = {
  title: "Infos Pratiques",
  description:
    "Horaires, tarifs, accès, accessibilité et protocoles de la Team Stop VSS pour le Gala INSA Strasbourg 2026.",
};

export const revalidate = 60;

export default async function InfosPratiquesPage() {
  const [infos, event] = await Promise.all([
    getInfosPratiques().catch(() => null),
    getEvent().catch(() => null),
  ]);
  const venueAddress = (event?.address ?? "11 Allée François Mitterrand, 67400 Illkirch-Graffenstaden").replace(
    /^L['']Illiade[\s,-]*/i,
    ""
  );
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(venueAddress)}`;

  return (
    <div className="flex flex-col">
      {/* === Hero === */}
      <section className="flex min-h-[30vh] items-center justify-center bg-gradient-to-br from-gala-primary via-gala-primary-dark to-gala-primary px-5 text-white">
        <div className="text-center max-w-3xl">
          <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Infos Pratiques
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Tout ce que vous devez savoir avant le grand soir
          </p>
        </div>
      </section>

      {/* === Horaires & Tarifs === */}
      <section className="py-10 sm:py-14 md:py-20">
        <div className="container mx-auto px-5 md:px-6">
          <div className="grid gap-8 md:gap-12 md:grid-cols-2">
            {/* Horaires */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-gala-primary md:text-3xl">
                Horaires
              </h2>
              <div className="mt-4 md:mt-6 space-y-3 md:space-y-4">
                {infos?.openingTime && (
                  <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card">
                    <div className="w-10 h-10 rounded-full bg-gala-primary/10 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-gala-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Ouverture</p>
                      <p className="text-lg font-semibold text-foreground">{infos.openingTime}</p>
                    </div>
                  </div>
                )}
                {infos?.closingTime && (
                  <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card">
                    <div className="w-10 h-10 rounded-full bg-gala-primary/10 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-gala-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Fermeture</p>
                      <p className="text-lg font-semibold text-foreground">{infos.closingTime}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Tarifs */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-gala-primary md:text-3xl">
                Tarifs
              </h2>
              {infos?.tarifs ? (
                <div className="mt-4 md:mt-6 p-4 rounded-xl border border-border bg-card">
                  <pre className="whitespace-pre-wrap font-sans text-sm text-muted-foreground leading-relaxed">
                    {infos.tarifs}
                  </pre>
                </div>
              ) : (
                <p className="mt-4 md:mt-6 text-muted-foreground italic">
                  Les tarifs seront bientôt communiqués.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* === Plan & Carte interactive === */}
      <section className="py-10 sm:py-14 md:py-20 bg-muted/50">
        <div className="container mx-auto px-5 md:px-6">
          <h2 className="font-heading text-3xl font-bold text-gala-primary md:text-4xl">
            Plan d'accès
          </h2>
          <p className="mt-2 text-muted-foreground">
            L'Illiade — {venueAddress}
          </p>

          <div className="mt-6 md:mt-8 grid gap-6 md:grid-cols-2 md:gap-16">
            {/* Colonne gauche : carte seule */}
            <MapSection
              lat={infos?.mapLat ?? 48.528954680638776}
              lng={infos?.mapLng ?? 7.707054682944534}
              address={venueAddress}
            />

            {/* Colonne droite : boutons + transports */}
            <div className="flex flex-col justify-center gap-5 md:gap-6">
              {/* Boutons d'action */}
              <div className="flex gap-3">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 md:px-6 md:py-3 text-sm md:text-base font-medium text-foreground hover:bg-muted transition-colors"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                  </svg>
                  Voir l'itinéraire
                </a>
                <DownloadPlanButton />
              </div>

              {/* Informations transports */}
              <TransportInfo />
            </div>
          </div>
        </div>
      </section>

      {/* === Accessibilité === */}
      {infos?.accessibilite && (
        <section className="py-10 sm:py-14 md:py-20">
          <div className="container mx-auto px-5 md:px-6">
            <h2 className="font-heading text-3xl font-bold text-gala-primary md:text-4xl">
              Accessibilité
            </h2>
            <div className="mt-4 md:mt-6 max-w-2xl p-6 rounded-xl border border-border bg-card">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gala-primary/10 flex items-center justify-center shrink-0 mt-1">
                  <svg className="w-5 h-5 text-gala-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12l2 2 4-4" />
                  </svg>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                  {infos.accessibilite}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* === Team Stop VSS === */}
      {infos?.stopVSS && (
        <section className="py-10 sm:py-14 md:py-20 bg-muted/50">
          <div className="container mx-auto px-5 md:px-6">
            <h2 className="font-heading text-3xl font-bold text-gala-primary md:text-4xl">
              {infos.stopVSSTitle ?? "Team Stop VSS"}
            </h2>
            <div className="mt-4 md:mt-6 max-w-3xl p-6 rounded-xl border border-pink-200 bg-pink-50 dark:border-pink-900 dark:bg-pink-950/30">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900 flex items-center justify-center shrink-0 mt-1">
                  <svg className="w-5 h-5 text-pink-600 dark:text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                    {infos.stopVSS}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}