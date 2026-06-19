import { Button } from "@/components/ui/button";
import { PartnersGrid } from "@/components/sections/partners-grid";
import { TicketsSection } from "@/components/sections/tickets-section";
import { FaqSection } from "@/components/sections/faq-section";
import { TeamSection } from "@/components/sections/team-section";
import { ContactSection } from "@/components/sections/contact-section";
import { getEvent } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/client";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 60;

export default async function HomePage() {
  const event = await getEvent();

  const title = event?.title ?? "Gala INSA Strasbourg";
  const edition = event?.edition ?? 71;
  const date = event?.date
    ? new Date(event.date).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "21 novembre 2026";
  const location = event?.location ?? "L'Illiade, Illkirch-Graffenstaden";
  const description =
    event?.description ??
    "Le Gala de l'INSA Strasbourg est un événement annuel organisé par les étudiants de l'école.";

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[80vh] items-center justify-center bg-gradient-to-br from-gala-primary via-gala-primary-dark to-gala-primary px-4 text-white">
        {event?.poster && (
          <div className="absolute inset-0 -z-10">
            <Image
              src={urlFor(event.poster).width(1920).height(1080).fit("crop").url()}
              alt=""
              fill
              className="object-cover opacity-30"
              priority
              sizes="100vw"
            />
          </div>
        )}
        <div className="text-center max-w-3xl">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-gala-gold">
            {edition}
            <sup>e</sup> Édition
          </p>
          <h1 className="font-heading text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-4 text-lg text-white/80 md:text-xl">
            {date} — {location}
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
          <p className="mt-4 max-w-2xl text-muted-foreground">{description}</p>
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

      {/* Section Équipe */}
      <section id="team" className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-heading text-3xl font-bold text-gala-primary md:text-4xl">
            L'équipe organisatrice
          </h2>
          <p className="mt-2 text-muted-foreground">
            Découvrez les étudiants qui œuvrent dans l'ombre pour faire de cette soirée un moment inoubliable.
          </p>
          <div className="mt-8">
            <TeamSection />
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

      {/* Section Contact */}
      <section id="contact" className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-heading text-3xl font-bold text-gala-primary md:text-4xl">
            Contact
          </h2>
          <p className="mt-2 text-muted-foreground">
            Une question, une suggestion ? Écrivez-nous !
          </p>
          <div className="mt-8">
            <ContactSection />
          </div>
        </div>
      </section>
    </div>
  );
}