import type { Metadata } from "next";
import { getInfosPratiques, getEvent } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/client";
import Image from "next/image";
import { MapSection } from "./map-section";

export const metadata: Metadata = {
  title: "Infos Pratiques",
  description:
    "Horaires, tarifs, accès, accessibilité et protocoles de la Team Stop VSS pour le Gala INSA Strasbourg 2026.",
};

export const revalidate = 60;

export default async function InfosPratiquesPage() {
  const [infos, event] = await Promise.all([getInfosPratiques(), getEvent()]);

  return (
    <div className="flex flex-col">
      {/* === Hero === */}
      <section className="flex min-h-[30vh] items-center justify-center bg-gradient-to-br from-gala-primary via-gala-primary-dark to-gala-primary px-4 text-white">
        <div className="text-center max-w-3xl">
          <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Infos Pratiques
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Tout ce qu'il faut savoir pour le Gala INSA Strasbourg 2026
          </p>
        </div>
      </section>

      {/* === Horaires & Tarifs === */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Horaires */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-gala-primary md:text-3xl">
                Horaires
              </h2>
              <div className="mt-6 space-y-4">
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
                <div className="mt-6 p-4 rounded-xl border border-border bg-card">
                  <pre className="whitespace-pre-wrap font-sans text-sm text-muted-foreground leading-relaxed">
                    {infos.tarifs}
                  </pre>
                </div>
              ) : (
                <p className="mt-6 text-muted-foreground italic">
                  Les tarifs seront bientôt communiqués.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* === Plan & Carte interactive === */}
      <section className="py-20 md:py-28 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-heading text-3xl font-bold text-gala-primary md:text-4xl">
            Plan d'accès
          </h2>
          <p className="mt-2 text-muted-foreground">
            L'Illiade — {event?.address ?? "1 Rue de l'Illiade, 67400 Illkirch-Graffenstaden"}
          </p>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {/* Carte interactive */}
            <MapSection
              lat={infos?.mapLat ?? 48.5239}
              lng={infos?.mapLng ?? 7.7152}
            />

            {/* Plan téléchargeable */}
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border p-8 text-center">
              {infos?.planImage ? (
                <div className="relative w-full max-w-sm h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={urlFor(infos.planImage).width(600).height(400).fit("crop").url()}
                    alt="Plan de L'Illiade"
                    fill
                    className="object-cover"
                    sizes="600px"
                  />
                </div>
              ) : (
                <div className="w-full max-w-sm h-48 mb-4 rounded-lg bg-muted flex items-center justify-center">
                  <svg className="w-12 h-12 text-muted-foreground/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
                  </svg>
                </div>
              )}
              {infos?.planPDF?.asset.url ? (
                <a
                  href={infos.planPDF.asset.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-gala-primary px-6 py-3 text-sm font-medium text-white hover:bg-gala-primary-light transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Télécharger le plan (PDF)
                </a>
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  Le plan sera bientôt disponible.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* === Accessibilité === */}
      {infos?.accessibilite && (
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="font-heading text-3xl font-bold text-gala-primary md:text-4xl">
              Accessibilité
            </h2>
            <div className="mt-6 max-w-2xl p-6 rounded-xl border border-border bg-card">
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
        <section className="py-20 md:py-28 bg-muted/50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="font-heading text-3xl font-bold text-gala-primary md:text-4xl">
              {infos.stopVSSTitle ?? "Team Stop VSS"}
            </h2>
            <div className="mt-6 max-w-3xl p-6 rounded-xl border border-pink-200 bg-pink-50 dark:border-pink-900 dark:bg-pink-950/30">
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
