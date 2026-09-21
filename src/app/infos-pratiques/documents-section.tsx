import { APP_URLS } from "@/lib/constants";
import { SectionHeading } from "@/components/soiree/SectionHeading";
import { CartoucheButton } from "@/components/ui/CartoucheButton";

/**
 * Section « Documents » — documents officiels téléchargeables.
 * S'appuie sur la route /documents/[filename] qui sert les PDF Sanity
 * sous leur nom d'origine (ouverture inline ou téléchargement forcé).
 */
type DocumentsSectionProps = {
  contratMineurHref?: string | null;
};

export function DocumentsSection({ contratMineurHref }: DocumentsSectionProps) {
  return (
    <section className="bg-bleuPale py-[clamp(3rem,7vw,6rem)]">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="À télécharger"
          title="Documents"
          subtitle="Les documents officiels liés à la billetterie et à la soirée."
        />

        <div className="mx-auto mt-10 max-w-3xl space-y-5">
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
            </div>
          </article>

          {contratMineurHref && (
            <article className="relative flex flex-col gap-6 rounded-2xl border border-[var(--or-moyen)]/50 bg-white/70 p-7 shadow-[0_8px_28px_rgba(63,91,118,.08)] md:flex-row md:items-center md:justify-between">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-2 rounded-xl border border-[var(--or-clair)]/40"
              />

              <div className="relative flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--or-moyen)]/50 bg-[var(--jaune-pale)] text-marine">
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
                    Contrat pour mineurs
                  </h3>
                  <p className="mt-1 text-sm text-ardoise/70">
                    Le contrat à compléter pour les participants mineurs.
                  </p>
                </div>
              </div>

              <div className="relative flex flex-wrap items-center gap-3 md:justify-end">
                <CartoucheButton
                  href={contratMineurHref}
                  external
                  variant="marine"
                  size="sm"
                >
                  Consulter
                </CartoucheButton>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}
