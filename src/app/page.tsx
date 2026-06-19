import { Button } from "@/components/ui/button";
import { PartnersGrid } from "@/components/sections/partners-grid";
import { TicketsSection } from "@/components/sections/tickets-section";
import { FaqSection } from "@/components/sections/faq-section";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[80vh] items-center justify-center bg-gradient-to-br from-gala-primary via-gala-primary-dark to-gala-primary px-4 text-white">
        <div className="text-center max-w-3xl">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-gala-gold">
            71<sup>e</sup> Édition
          </p>
          <h1 className="font-heading text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Gala INSA Strasbourg
          </h1>
          <p className="mt-4 text-lg text-white/80 md:text-xl">
            21 novembre 2026 — L'Illiade, Illkirch-Graffenstaden
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              nativeButton={false}
              className="bg-gala-gold text-gala-primary-dark hover:bg-gala-gold/90"
              render={<Link href="/#tickets" />}
            >
              Réserver ma place
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              className="border-white/30 text-white hover:bg-white/10"
              render={<Link href="/#about" />}
            >
              En savoir plus
            </Button>
          </div>
        </div>
      </section>

      {/* Section À propos */}
      <section id="about" className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-heading text-3xl font-bold text-gala-primary md:text-4xl">
            À propos
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Le Gala de l'INSA Strasbourg est un événement annuel organisé
            par les étudiants de l'école. Cette 71<sup>e</sup> édition se
            déroulera le 21 novembre 2026 à L'Illiade, Illkirch-Graffenstaden.
          </p>
        </div>
      </section>

      {/* Section Partenaires */}
      <section id="partners" className="py-20 md:py-28 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-heading text-3xl font-bold text-gala-primary md:text-4xl">
            Nos partenaires
          </h2>
          <div className="mt-8">
            <PartnersGrid />
          </div>
        </div>
      </section>

      {/* Section Billetterie */}
      <section id="tickets" className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-heading text-3xl font-bold text-gala-primary md:text-4xl">
            Billetterie
          </h2>
          <div className="mt-8">
            <TicketsSection />
          </div>
        </div>
      </section>

      {/* Section FAQ */}
      <section id="faq" className="py-20 md:py-28 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-heading text-3xl font-bold text-gala-primary md:text-4xl">
            Questions fréquentes
          </h2>
          <div className="mt-8">
            <FaqSection />
          </div>
        </div>
      </section>
    </div>
  );
}