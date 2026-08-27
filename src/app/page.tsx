import { TopSection } from "@/components/hero/TopSection";
import { PartnersGrid } from "@/components/sections/partners-grid";
import { TicketsSection } from "@/components/sections/tickets-section";
import { FaqSection } from "@/components/sections/faq-section";
import { TeamSection } from "@/components/sections/team-section";
import { ContactSection } from "@/components/sections/contact-section";
import { StatsCountdown } from "@/components/sections/stats-countdown";
import { GalleryCarousel } from "@/components/sections/gallery-carousel";
import { InstagramFeed } from "@/components/sections/instagram-feed";
import { getEvent } from "@/lib/sanity/queries";

export const revalidate = 60;

export default async function HomePage() {
  const event = await getEvent().catch(() => null);

  const description =
    event?.description ??
    "Chaque année, les étudiants de l'INSA Strasbourg donnent vie à une soirée d'exception. Un gala pensé, organisé et vécu par ceux qui font battre le cœur de l'école.";

  return (
    <div className="flex flex-col">
      {/* Bloc supérieur — Teaser + Hero à colonnes */}
      <TopSection />

      {/* Galerie immersive */}
      <GalleryCarousel />

      {/* Séparateur floral — centré exactement sur la démarcation */}
      <div className="relative z-10 h-0 overflow-visible my-0">
        <img
          src="/separateur2.svg"
          alt=""
          aria-hidden="true"
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 max-md:max-w-xl md:max-w-3xl h-16 md:h-24"
        />
      </div>

      {/* Compteurs animés + Countdown */}
      <StatsCountdown />

      {/* Section Instagram — Dernière publication — temporairement masquée */}
      <div className="hidden">
        <InstagramFeed />
      </div>

      {/* Séparateur floral — remonté pour annuler le mb de StatsCountdown */}
      <div className="relative z-10 h-0 overflow-visible -mt-12 sm:-mt-24 md:-mt-32 mb-0">
        <img
          src="/separateur2.svg"
          alt=""
          aria-hidden="true"
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 max-md:max-w-xl md:max-w-3xl h-16 md:h-24"
        />
      </div>

      {/* Section À propos */}
      <section id="about" className="pt-16 sm:pt-32 md:pt-44 lg:pt-24 pb-10 sm:pb-20 md:pb-28">
        <div className="container mx-auto px-5 md:px-6">
          {/*
           * Titre : font-display (Cormorant Garamond), text-gala-primary (#5E708E)
           * Contraste #5E708E sur #FFFBF2 = 4.5:1 ✅ WCAG AA
           */}
          <h2 className="font-display text-3xl font-bold text-gala-primary md:text-4xl text-center">
            À propos
          </h2>
          {/*
           * Corps : text-muted-foreground (#5C6475) sur fond crème (#FFFBF2)
           * Contraste = 5.1:1 ✅ WCAG AA
           */}
          <div className="mt-4 flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-center lg:gap-10">
            <p className="max-w-2xl text-muted-foreground text-center lg:text-justify">{description}</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo_transparent.webp"
              alt="Logo du Gala INSA Strasbourg"
              loading="lazy"
              className="hidden w-72 shrink-0 object-contain lg:block"
            />
          </div>
        </div>
      </section>

      {/* Section Partenaires */}
      <section id="partners" className="bg-muted/50 py-10 sm:py-20 md:py-28">
        <div className="container mx-auto px-5 md:px-6">
          <h2 className="font-display text-3xl font-bold text-gala-primary md:text-4xl text-center">
            Nos partenaires
          </h2>
          <div className="mt-8">
            <PartnersGrid />
          </div>
        </div>
      </section>

      {/* Section Billetterie */}
      <section id="tickets" className="py-10 sm:py-20 md:py-28">
        <div className="container mx-auto px-5 md:px-6">
          <h2 className="font-display text-3xl font-bold text-gala-primary md:text-4xl text-center">
            Billetterie
          </h2>
          <div className="mt-8">
            <TicketsSection />
          </div>
        </div>
      </section>

      {/* Section Équipe */}
      <section id="team" className="bg-muted/50 py-10 sm:py-20 md:py-28">
        <div className="container mx-auto px-5 md:px-6">
          <h2 className="font-display text-3xl font-bold text-gala-primary md:text-4xl text-center">
            L'équipe organisatrice
          </h2>
          <p className="mt-2 text-muted-foreground text-center">
            Découvrez les étudiants qui façonnent cette soirée de A à Z —
            avec passion, rigueur et une bonne dose de folie.
          </p>
          <div className="mt-8">
            <TeamSection />
          </div>
        </div>
      </section>

      {/* Section FAQ */}
      <section id="faq" className="py-10 sm:py-20 md:py-28">
        <div className="container mx-auto px-5 md:px-6">
          <h2 className="font-display text-3xl font-bold text-gala-primary md:text-4xl text-center">
            Questions fréquentes
          </h2>
          <p className="mt-2 text-muted-foreground text-center">
            Une interrogation ? On a sûrement la réponse.
          </p>
          <div className="mt-8">
            <FaqSection />
          </div>
        </div>
      </section>

      {/* Section Contact */}
      <section id="contact" className="bg-muted/50 py-10 sm:py-20 md:py-28">
        <div className="container mx-auto px-5 md:px-6">
          <h2 className="font-display text-3xl font-bold text-gala-primary md:text-4xl text-center">
            Contact
          </h2>
          <p className="mt-2 text-muted-foreground text-center">
            Une idée, une question, un mot doux ?<br className="sm:hidden" /> On vous lit !
          </p>
          <div className="mt-8">
            <ContactSection />
          </div>
        </div>
      </section>

      {/* Séparateur floral — centré exactement sur la démarcation */}
      <div className="relative z-10 h-0 overflow-visible my-0">
        <img
          src="/separateur2.svg"
          alt=""
          aria-hidden="true"
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 max-md:max-w-xl md:max-w-3xl h-16 md:h-24"
        />
      </div>
    </div>
  );
}