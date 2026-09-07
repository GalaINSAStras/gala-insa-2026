import Image from "next/image";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { CartoucheButton } from "@/components/ui/CartoucheButton";
import { ButtonFleuron } from "@/components/ui/ButtonFleuron";
import { PdfLink } from "@/components/ui/pdf-link";
import type { Soiree } from "@/lib/sanity/types";

type InfosPratiquesProps = {
  soiree: Soiree | null;
  dressCodeUrl?: string | null;
  contratMineurHref?: string | null;
  reglementInterieurHref?: string | null;
};

export function InfosPratiques({
  soiree,
  dressCodeUrl,
  contratMineurHref,
  reglementInterieurHref,
}: InfosPratiquesProps) {
  const hasDocs = Boolean(contratMineurHref || reglementInterieurHref);

  return (
    <section className="relative bg-bleuPale py-[clamp(3rem,7vw,6rem)]">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <SectionHeading kicker="Avant de venir" title="Infos pratiques" />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Place soirée seule */}
          <Reveal>
            <article className="flex h-full flex-col rounded-2xl border border-[var(--or-moyen)]/50 bg-ivoire p-7 shadow-[0_8px_28px_rgba(63,91,118,.08)]">
              <ButtonFleuron className="h-8 w-8" />
              <h3
                className="mt-4 text-xl text-marine"
                style={{ fontFamily: "var(--font-title)" }}
              >
                Place soirée seule
              </h3>
              {soiree?.soireeSeulePrice != null && (
                <p className="mt-3 font-garamond text-3xl font-semibold text-[var(--or-fonce)] tabular-nums">
                  {soiree.soireeSeulePrice} €
                </p>
              )}
              {soiree?.soireeSeuleDetails && (
                <p className="mt-3 flex-1 whitespace-pre-line text-ardoise/85 leading-relaxed">
                  {soiree.soireeSeuleDetails}
                </p>
              )}
              <div className="mt-6">
                <CartoucheButton href="/billetterie" variant="marine" size="sm">
                  Réserver
                </CartoucheButton>
              </div>
            </article>
          </Reveal>

          {/* Code vestimentaire */}
          <Reveal delay={0.08}>
            <article className="flex h-full flex-col rounded-2xl border border-[var(--or-moyen)]/50 bg-ivoire p-7 shadow-[0_8px_28px_rgba(63,91,118,.08)]">
              <ButtonFleuron className="h-8 w-8" />
              <h3
                className="mt-4 text-xl text-marine"
                style={{ fontFamily: "var(--font-title)" }}
              >
                Code vestimentaire
              </h3>
              {dressCodeUrl && (
                <div className="relative mt-4 h-44 overflow-hidden rounded-xl">
                  <Image
                    src={dressCodeUrl}
                    alt="Illustration du code vestimentaire"
                    fill
                    className="object-cover"
                    sizes="(min-width:768px) 320px, 100vw"
                  />
                </div>
              )}
              {soiree?.dressCode && (
                <p className="mt-4 whitespace-pre-line text-ardoise/85 leading-relaxed">
                  {soiree.dressCode}
                </p>
              )}
            </article>
          </Reveal>

          {/* Documents */}
          <Reveal delay={0.16}>
            <article className="flex h-full flex-col rounded-2xl border border-[var(--or-moyen)]/50 bg-ivoire p-7 shadow-[0_8px_28px_rgba(63,91,118,.08)]">
              <ButtonFleuron className="h-8 w-8" />
              <h3
                className="mt-4 text-xl text-marine"
                style={{ fontFamily: "var(--font-title)" }}
              >
                Documents
              </h3>
              {hasDocs ? (
                <ul className="mt-4 flex flex-col gap-3">
                  {contratMineurHref && (
                    <li className="flex">
                      <PdfLink
                        href={contratMineurHref}
                        label="Contrat pour mineurs"
                      />
                    </li>
                  )}
                  {reglementInterieurHref && (
                    <li className="flex">
                      <PdfLink
                        href={reglementInterieurHref}
                        label="Règlement intérieur"
                      />
                    </li>
                  )}
                </ul>
              ) : (
                <p className="mt-4 italic text-ardoise/70">
                  Les documents seront bientôt disponibles.
                </p>
              )}
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
