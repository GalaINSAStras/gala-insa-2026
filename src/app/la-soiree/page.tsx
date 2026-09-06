import { getSoiree, getLineup } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/client";
import { pdfViewerUrl } from "@/lib/sanity/pdf";
import type { Metadata } from "next";
import Image from "next/image";
import { SoireeClient } from "./soiree-client";
import { ContactSection } from "@/components/sections/contact-section";
import { FaqSection } from "@/components/sections/faq-section";
import { PdfLink } from "@/components/ui/pdf-link";
import { Clock, Leaf, Music2, Sprout } from "lucide-react";

export const metadata: Metadata = {
  title: "La Soirée",
  description:
    "Découvrez le thème, la line-up, le menu et le dress code du Gala INSA Strasbourg 2026.",
};

export const revalidate = 60;

export default async function LaSoireePage() {
  const [soiree, lineup] = await Promise.all([
    getSoiree().catch(() => null),
    getLineup().catch(() => []),
  ]);

  // PDF servis sous leur nom d'origine via /documents/<nom-du-fichier>
  const contratMineurHref = soiree?.contratMineurPDF
    ? pdfViewerUrl(soiree.contratMineurPDF)
    : null;
  const reglementInterieurHref = soiree?.reglementInterieurPDF
    ? pdfViewerUrl(soiree.reglementInterieurPDF)
    : null;

  const menuGroups = CATEGORY_ORDER.map((cat) => ({
    ...cat,
    items: (soiree?.menuBuffet ?? []).filter(
      (item) => item.categorie === cat.value
    ),
  })).filter((group) => group.items.length > 0);

  return (
    <div className="flex flex-col">
      {/* === Hero Thème === */}
      <section className="relative flex min-h-[50vh] items-center justify-center bg-gradient-to-br from-gala-primary via-gala-primary-dark to-gala-primary px-4 text-white overflow-hidden">
        {soiree?.themeImage && (
          <div className="absolute inset-0 -z-10">
            <Image
              src={urlFor(soiree.themeImage).width(1920).height(1080).fit("crop").url()}
              alt=""
              fill
              className="object-cover opacity-20"
              priority
              sizes="100vw"
            />
          </div>
        )}
        <div className="text-center max-w-3xl">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-gala-gold">
            72<sup>e</sup> Édition
          </p>
          <h1 className="font-heading text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            {soiree?.theme ?? "Renaissance"}
          </h1>
          {soiree?.themeDescription && (
            <p className="mt-6 max-w-2xl mx-auto text-lg text-white/80 leading-relaxed">
              {soiree.themeDescription}
            </p>
          )}
          {soiree?.programme && soiree.programme.length > 0 && (
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 text-left max-w-2xl mx-auto">
              {soiree.programme.map((phase) => (
                <div
                  key={phase._key}
                  className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-2 text-gala-gold">
                    <Clock className="h-4 w-4" aria-hidden="true" />
                    <span className="text-sm font-semibold uppercase tracking-wider">
                      {phase.time}
                    </span>
                  </div>
                  <p className="mt-2 font-heading text-lg font-semibold text-white">
                    {phase.title}
                  </p>
                  {phase.note && (
                    <p className="mt-1 text-sm text-white/70">{phase.note}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* === Line-Up === */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-heading text-3xl font-bold text-gala-primary md:text-4xl">
            Programmation
          </h2>
          {soiree?.lineupRevealed ? (
            <>
              <p className="mt-2 text-muted-foreground">
                Découvrez les artistes qui feront vibrer la soirée.
              </p>
              <SoireeClient lineup={lineup ?? []} />
            </>
          ) : (
            <div className="mt-6 flex flex-col items-center gap-4 rounded-xl border border-gala-gold/30 bg-gradient-to-br from-gala-primary/10 via-gala-primary/5 to-gala-gold/10 px-6 py-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gala-primary text-white shadow-lg">
                <Music2 className="h-7 w-7" aria-hidden="true" />
              </div>
              <div>
                <p className="font-heading text-xl font-semibold text-gala-primary">
                  Programmation à venir
                </p>
                <p className="mx-auto mt-2 max-w-md text-muted-foreground">
                  Le line-up sera bientôt dévoilé. Restez connectés !
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* === Buffet === */}
      <section className="py-20 md:py-28 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-heading text-3xl font-bold text-gala-primary md:text-4xl">
            {soiree?.menuBuffetTitle ?? "Buffet"}
          </h2>
          <p className="mt-2 text-muted-foreground">
            Le buffet se présentera sous la forme d&apos;un cocktail dinatoire
            composé de 16 pièces par personne (10 salées froides, 2 salées
            chaudes, 4 sucrées), préparé par notre traiteur Effervescence.
          </p>

          {soiree?.buffetPrice && (
            <p className="mt-4 text-lg font-semibold text-gala-gold">
              À partir de {soiree.buffetPrice} €
            </p>
          )}

          {menuGroups.length > 0 && (
            <div className="mt-8 space-y-10">
              {menuGroups.map((group) => (
                <div key={group.value}>
                  <h3 className="font-heading text-xl font-semibold text-gala-primary">
                    {group.label}
                  </h3>
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full max-w-2xl border-collapse">
                      <thead>
                        <tr className="border-b-2 border-gala-primary/20">
                          <th className="py-3 px-4 text-left text-sm font-semibold text-gala-primary">
                            Plat
                          </th>
                          <th className="py-3 px-4 text-left text-sm font-semibold text-gala-primary">
                            Allergènes
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {group.items.map((item, i) => (
                          <tr
                            key={i}
                            className="border-b border-border/50 hover:bg-muted/50 transition-colors"
                          >
                            <td className="py-3 px-4 text-sm text-foreground">
                              <div className="flex flex-wrap items-center gap-2">
                                <span>{item.dish}</span>
                                {item.regime && <RegimeBadge regime={item.regime} />}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-sm text-muted-foreground">
                              {item.allergenes && item.allergenes.length > 0
                                ? item.allergenes
                                    .map(
                                      (a) =>
                                        ALLERGEN_LABELS[
                                          a as keyof typeof ALLERGEN_LABELS
                                        ] ?? a
                                    )
                                    .join(", ")
                                : "Aucun allergène signalé"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* === La Carte === */}
      {soiree?.carte && soiree.carte.length > 0 && (
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="font-heading text-3xl font-bold text-gala-primary md:text-4xl">
              La Carte
            </h2>
            <p className="mt-2 text-muted-foreground">
              Découvrez les boissons proposées tout au long de la soirée.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
              {soiree.carte.map((category) => (
                <div
                  key={category._key}
                  className="rounded-xl border border-border bg-card p-6 shadow-sm"
                >
                  {category.title && (
                    <h3 className="font-heading text-xl font-semibold text-gala-primary">
                      {category.title}
                    </h3>
                  )}
                  <ul className="mt-4 space-y-3">
                    {(category.items ?? []).map((item) => (
                      <li key={item._key}>
                        <div className="flex items-baseline gap-2">
                          <span className="font-medium text-foreground">
                            {item.name}
                          </span>
                          {item.format && (
                            <span className="text-sm text-muted-foreground">
                              ({item.format})
                            </span>
                          )}
                          <span
                            className="mx-1 flex-1 border-b border-dotted border-border"
                            aria-hidden="true"
                          />
                          <span className="whitespace-nowrap font-semibold text-gala-gold">
                            {item.price} €
                          </span>
                        </div>
                        {item.glassPrice != null && (
                          <p className="mt-1 pl-1 text-sm text-muted-foreground">
                            Au verre (12 cl) — {item.glassPrice} €
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === Documents à télécharger === */}
      {(contratMineurHref ||
        reglementInterieurHref) && (
        <section className="py-20 md:py-28 bg-muted/50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="font-heading text-3xl font-bold text-gala-primary md:text-4xl">
              Documents à télécharger
            </h2>
            <p className="mt-2 text-muted-foreground">
              Consultez les documents utiles pour la soirée.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              {contratMineurHref && (
                <PdfLink
                  href={contratMineurHref}
                  label="Contrat pour mineurs"
                />
              )}
              {reglementInterieurHref && (
                <PdfLink
                  href={reglementInterieurHref}
                  label="Règlement intérieur de la soirée"
                />
              )}
            </div>
          </div>
        </section>
      )}

      {/* === Place Soirée seule === */}
      {soiree?.soireeSeuleDetails && (
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="font-heading text-3xl font-bold text-gala-primary md:text-4xl">
              Place Soirée seule
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
              {soiree.soireeSeuleDetails}
            </p>
            {soiree.soireeSeulePrice && (
              <p className="mt-3 text-lg font-semibold text-gala-gold">
                {soiree.soireeSeulePrice} €
              </p>
            )}
          </div>
        </section>
      )}

      {/* === Dress Code === */}
      {soiree?.dressCode && (
        <section className="py-20 md:py-28 bg-muted/50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="font-heading text-3xl font-bold text-gala-primary md:text-4xl">
              Code vestimentaire
            </h2>
            <div className="mt-6 flex flex-col md:flex-row gap-8 items-start">
              {soiree.dressCodeIllustration && (
                <div className="relative w-full md:w-64 h-64 shrink-0 rounded-xl overflow-hidden">
                  <Image
                    src={urlFor(soiree.dressCodeIllustration).width(400).height(400).fit("crop").url()}
                    alt="Dress code illustration"
                    fill
                    className="object-cover"
                    sizes="256px"
                  />
                </div>
              )}
              <div className="max-w-2xl">
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {soiree.dressCode}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* === FAQ & Contact intégrés === */}
      <section id="faq" className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-heading text-3xl font-bold text-gala-primary md:text-4xl">
            Questions fréquentes
          </h2>
          <p className="mt-2 text-muted-foreground">
            Vous avez une question ? Consultez notre FAQ ou écrivez-nous directement.
          </p>
          <div className="mt-8">
            <FaqSection />
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 md:py-28 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-heading text-3xl font-bold text-gala-primary md:text-4xl">
            Nous contacter
          </h2>
          <p className="mt-2 text-muted-foreground">
            Une question sur la soirée, le menu ou l&apos;organisation ? Écrivez-nous, nous vous répondrons rapidement.
          </p>
          <div className="mt-8">
            <ContactSection />
          </div>
        </div>
      </section>
    </div>
  );
}

/** Étiquettes lisibles pour les allergènes */
const ALLERGEN_LABELS = {
  gluten: "Gluten",
  lactose: "Lactose",
  oeufs: "Œufs",
  arachides: "Arachides",
  "fruits-a-coque": "Fruits à coque",
  poisson: "Poisson",
  crustaces: "Crustacés",
  soja: "Soja",
  sesame: "Sésame",
  sulfites: "Sulfites",
  celeri: "Céleri",
  moutarde: "Moutarde",
  lupin: "Lupin",
  mollusques: "Mollusques",
} as const;

/** Ordre et libellés des catégories du buffet */
const CATEGORY_ORDER = [
  { value: "salee-froide", label: "Pièces salées froides" },
  { value: "salee-chaude", label: "Pièces salées chaudes" },
  { value: "sucre", label: "Pièces sucrées" },
] as const;

/** Badges de régime alimentaire affichés sur le buffet */
const REGIME_BADGES = {
  vegetarien: {
    label: "Végé",
    Icon: Leaf,
    className: "bg-[#D6EDCF] text-[#2E7D46] ring-[#7FB878]",
  },
  vegan: {
    label: "Vegan",
    Icon: Sprout,
    className: "bg-[#FCD8E4] text-[#B23A5E] ring-[#F9C9D4]",
  },
} as const;

function RegimeBadge({ regime }: { regime: "vegetarien" | "vegan" }) {
  const badge = REGIME_BADGES[regime];
  const Icon = badge.Icon;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${badge.className}`}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {badge.label}
    </span>
  );
}