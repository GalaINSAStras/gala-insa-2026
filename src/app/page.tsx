import { EVENT } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[80vh] items-center justify-center bg-gradient-to-br from-gala-primary via-gala-primary-dark to-gala-primary px-4 text-white">
        <div className="text-center max-w-3xl">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-gala-gold">
            {EVENT.edition}e Édition
          </p>
          <h1 className="font-heading text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Gala INSA Strasbourg
          </h1>
          <p className="mt-4 text-lg text-white/80 md:text-xl">
            {EVENT.date} — {EVENT.location}
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="bg-gala-gold text-gala-primary-dark hover:bg-gala-gold/90"
              render={<Link href="/#tickets" />}
            >
              Réserver ma place
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
              render={<Link href="/#about" />}
            >
              En savoir plus
            </Button>
          </div>
        </div>
      </section>

      {/* Sections à venir */}
      <section id="about" className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-heading text-3xl font-bold text-gala-primary md:text-4xl">
            À propos
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Contenu à venir — sections About, Partenaires, Billetterie, FAQ,
            Galerie et Contact seront ajoutées prochainement.
          </p>
        </div>
      </section>

      <section id="partners" className="py-20 md:py-28 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-heading text-3xl font-bold text-gala-primary md:text-4xl">
            Partenaires
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Contenu dynamique via Sanity CMS à venir.
          </p>
        </div>
      </section>
    </div>
  );
}