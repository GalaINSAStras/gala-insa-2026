import { getEvent } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/client";
import { Button } from "@/components/ui/button";
import { PartnersGrid } from "@/components/sections/partners-grid";
import { TicketsSection } from "@/components/sections/tickets-section";
import { FaqSection } from "@/components/sections/faq-section";
import Link from "next/link";
import Image from "next/image";

export default async function HomePage() {
  const event = await getEvent();

  return (
    <div className="flex flex-col">
      {/* Hero Section — dynamique */}
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-gradient-to-br from-gala-primary via-gala-primary-dark to-gala-primary px-4 text-white">
        {/* Image de fond (poster) */}
        {event?.poster && (
          <div className="absolute inset-0 z-0">
            <Image
              src={
                urlFor(event.poster).width(1920).height(1080).fit("crop").url() ??
                ""
              }
              alt=""
              fill
              className="object-cover opacity-10"
              priority
              sizes="100vw"
            />
          </div>
        )}
        <div className="relative z-10 text-center max-w-3xl">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-gala-gold">
            {event?.edition ?? 71}e Édition
          </p>
          <h1 className="font-heading text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            {event?.title ?? "Gala INSA Strasbourg"}
          </h1>
          <p className="mt-4 text-lg text-white/80 md:text-xl">
            {event?.date
              ? new Date(event.date).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "Date à venir"}{" "}
            — {event?.location ?? "L'Illiade, Illkirch-Graffenstaden"}
          </p>
          {event?.description && (
            <p className="mt-4 max-w-2xl mx-auto text-white/60 text-sm md:text-base">
              {event.description}
            </p>
          )}
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="bg-gala-gold text-gala-primary-dark hover:bg-gala-gold/90"
              render={<Link href={event?.ticketLink ?? "/#tickets"} />}
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

      {/* Section À propos */}
      <section id="about" className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-heading text-3xl font-bold text-gala-primary md:text-4xl">
            À propos
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Le Gala de l'INSA Strasbourg est un événement annuel organisé
            par les étudiants de l'école. Cette {event?.edition ?? 71}e édition
            se déroulera le{" "}
            {event?.date
              ? new Date(event.date).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "21 novembre 2026"}{" "}
            à {event?.location ?? "L'Illiade, Illkirch-Graffenstaden"}.
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