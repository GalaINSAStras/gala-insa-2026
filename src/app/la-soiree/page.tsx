import { getSoiree, getLineup } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/client";
import { pdfViewerUrl } from "@/lib/sanity/pdf";
import type { Metadata } from "next";
import { HeroSoiree } from "@/components/soiree/HeroSoiree";
import { Programmation } from "@/components/soiree/Programmation";
import { SectionHeading } from "@/components/soiree/SectionHeading";
import { Buffet } from "@/components/soiree/Buffet";
import { Carte } from "@/components/soiree/Carte";
import { InfosPratiques } from "@/components/soiree/InfosPratiques";
import { FaqSection } from "@/components/sections/faq-section";
import { ContactSection } from "@/components/sections/contact-section";

export const metadata: Metadata = {
  title: "La Soirée",
  description:
    "Découvrez le thème Renaissance, la programmation, le buffet et le dress code du Gala INSA Strasbourg 2026.",
};

export const revalidate = 60;

export default async function LaSoireePage() {
  const [soiree, lineup] = await Promise.all([
    getSoiree().catch(() => null),
    getLineup().catch(() => []),
  ]);

  const themeImageUrl = soiree?.themeImage
    ? urlFor(soiree.themeImage).width(1920).height(1080).fit("crop").url()
    : null;
  const dressCodeUrl = soiree?.dressCodeIllustration
    ? urlFor(soiree.dressCodeIllustration).width(640).height(640).fit("crop").url()
    : null;
  const contratMineurHref = soiree?.contratMineurPDF
    ? pdfViewerUrl(soiree.contratMineurPDF)
    : null;
  const reglementInterieurHref = soiree?.reglementInterieurPDF
    ? pdfViewerUrl(soiree.reglementInterieurPDF)
    : null;

  return (
    <div className="flex flex-col">
      <HeroSoiree
        theme={soiree?.theme ?? "Renaissance"}
        accroche={soiree?.accroche}
        themeImageUrl={themeImageUrl}
      />

      {/* Programme (timeline) */}
      <section
        id="programme"
        className="relative bg-ivoire py-[clamp(3rem,7vw,6rem)]"
      >
        <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="La soirée"
            title="Programmation"
            subtitle="Le fil de la soirée, du dîner jusqu'au bout de la nuit."
          />
          <div className="mt-12">
            <Programmation
              programme={soiree?.programme ?? []}
              lineup={lineup ?? []}
              revealed={soiree?.lineupRevealed ?? false}
            />
          </div>
        </div>
      </section>

      <Buffet comptoirs={soiree?.comptoirs ?? []} prixBuffet={soiree?.prixBuffet} />

      <Carte carte={soiree?.carte ?? []} />

      <InfosPratiques
        soiree={soiree}
        dressCodeUrl={dressCodeUrl}
        contratMineurHref={contratMineurHref}
        reglementInterieurHref={reglementInterieurHref}
      />

      {/* FAQ & Contact */}
      <section id="faq" className="bg-ivoire py-[clamp(3rem,7vw,6rem)]">
        <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
          <SectionHeading kicker="On vous répond" title="Questions fréquentes" />
          <div className="mt-8">
            <FaqSection />
          </div>
        </div>
      </section>

      <section id="contact" className="bg-bleuPale py-[clamp(3rem,7vw,6rem)]">
        <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Une question"
            title="Nous contacter"
            subtitle="Une question sur la soirée, le menu ou l'organisation ? Écrivez-nous."
          />
          <div className="mt-8">
            <ContactSection />
          </div>
        </div>
      </section>
    </div>
  );
}
