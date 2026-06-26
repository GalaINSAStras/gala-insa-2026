import { getSoiree, getLineup } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/client";
import type { Metadata } from "next";
import Image from "next/image";
import { SoireeClient } from "./soiree-client";
import { ContactSection } from "@/components/sections/contact-section";
import { FaqSection } from "@/components/sections/faq-section";

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
            71<sup>e</sup> Édition
          </p>
          <h1 className="font-heading text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            {soiree?.theme ?? "L'Éclat de la Nuit"}
          </h1>
          {soiree?.themeDescription && (
            <p className="mt-6 max-w-2xl mx-auto text-lg text-white/80 leading-relaxed">
              {soiree.themeDescription}
            </p>
          )}
        </div>
      </section>

      {/* === Line-Up === */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-heading text-3xl font-bold text-gala-primary md:text-4xl">
            Programmation
          </h2>
          <p className="mt-2 text-muted-foreground">
            Découvrez les artistes qui feront vibrer la soirée.
          </p>
          <SoireeClient lineup={lineup ?? []} />
        </div>
      </section>

      {/* === Menu Buffet + Soirée === */}
      <section className="py-20 md:py-28 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-heading text-3xl font-bold text-gala-primary md:text-4xl">
            {soiree?.menuBuffetTitle ?? "Menu Buffet + Soirée"}
          </h2>
          <p className="mt-2 text-muted-foreground">
            Un buffet raffiné préparé par les traiteurs partenaires.
          </p>

          {soiree?.buffetPrice && (
            <p className="mt-4 text-lg font-semibold text-gala-gold">
              À partir de {soiree.buffetPrice} €
            </p>
          )}

          {soiree?.menuBuffet && soiree.menuBuffet.length > 0 && (
            <div className="mt-8 overflow-x-auto">
              <table className="w-full max-w-2xl border-collapse">
                <thead>
                  <tr className="border-b-2 border-gala-primary/20">
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gala-primary">Plat</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gala-primary">Allergènes</th>
                  </tr>
                </thead>
                <tbody>
                  {soiree.menuBuffet.map((item, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4 text-sm text-foreground">{item.dish}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {item.allergenes && item.allergenes.length > 0
                          ? item.allergenes
                              .map((a) => ALLERGEN_LABELS[a as keyof typeof ALLERGEN_LABELS] ?? a)
                              .join(", ")
                          : "Aucun allergène signalé"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

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
            Une question sur la soirée, le menu ou l'organisation ? Écrivez-nous, nous vous répondrons rapidement.
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