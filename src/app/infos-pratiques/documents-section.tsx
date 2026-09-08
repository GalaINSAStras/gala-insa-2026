import { APP_URLS } from "@/lib/constants";
import { SectionHeading } from "@/components/soiree/SectionHeading";
import { CartoucheButton } from "@/components/ui/CartoucheButton";

/**
 * Section « Documents » — documents officiels téléchargeables.
 * S'appuie sur la route /documents/[filename] qui sert les PDF Sanity
 * sous leur nom d'origine (ouverture inline ou téléchargement forcé).
 */
export function DocumentsSection() {
  return (
    <section className="bg-bleuPale py-[clamp(3rem,7vw,6rem)]">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="À télécharger"
          title="Documents"
          subtitle="Les documents officiels liés à la billetterie et à la soirée."
        />

        <div className="mx-auto mt-10 max-w-3xl">
          <article className="relative flex flex-col gap-6 rounded-2xl border border-[var(--or-moyen)]/50 bg-white/70 p-7 shadow-[0_8px_28px_rgba(63,91,118,.08)] md:flex-row md:items-center md:justify-between">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-2 rounded-xl border border-[var(--or-clair)]/40"
            />

            <div className="relative flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--or-moyen)]/50 bg-[var(--bleu-pale)] text-marine">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                  <path d="M16 13H8M16 17H8M10 9H8" />
                </svg>
              </span>
              <div>
                <h3 className="font-heading text-xl text-marine">
                  Conditions Générales de Vente
                </h3>
                <p className="mt-1 text-sm text-ardoise/70">
                  Les CGV des billets du Gala — 72<sup>e</sup> édition.
                </p>
              </div>
            </div>

            <div className="relative flex flex-wrap items-center gap-3 md:justify-end">
              <CartoucheButton
                href={APP_URLS.cgv}
                external
                variant="marine"
                size="sm"
              >
                Consulter
              </CartoucheButton>
              <a
                href={APP_URLS.cgvDownload}
                download
                className="inline-flex items-center gap-2 rounded-full border border-[var(--or-moyen)]/60 bg-white/70 px-5 py-2.5 text-sm font-medium text-ardoise transition-colors hover:border-[var(--or-fonce)] hover:text-[var(--or-fonce)]"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Télécharger le PDF
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
