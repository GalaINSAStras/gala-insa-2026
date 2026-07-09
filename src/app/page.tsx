import { HeroSection } from "@/components/sections/hero-section";
import { PartnersGrid } from "@/components/sections/partners-grid";
import { TicketsSection } from "@/components/sections/tickets-section";
import { FaqSection } from "@/components/sections/faq-section";
import { TeamSection } from "@/components/sections/team-section";
import { ContactSection } from "@/components/sections/contact-section";
import { StatsCountdown } from "@/components/sections/stats-countdown";
import { GalleryCarousel } from "@/components/sections/gallery-carousel";
import { InstagramFeed } from "@/components/sections/instagram-feed";
import { getEvent } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/client";

export const revalidate = 60;

export default async function HomePage() {
  const event = await getEvent().catch(() => null);

  const title = event?.title ?? "Gala INSA Strasbourg";
  const edition = event?.edition ?? 72;
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

  const posterUrl = event?.poster
    ? urlFor(event.poster).width(1920).height(1080).fit("crop").url()
    : undefined;

  return (
    <div className="flex flex-col">
      {/* Hero Section V2 — Vidéo background + animations */}
      <HeroSection
        title={title}
        edition={edition}
        date={date}
        location={location}
        description={description}
        posterUrl={posterUrl}
        videoUrl="/video_background.mp4"
      />

      {/* Galerie immersive */}
      <GalleryCarousel />

      {/* Séparateur floral — centré exactement sur la démarcation */}
      <div className="relative z-10 h-0 overflow-visible my-0">
        <img
          src="/separateur.svg"
          alt=""
          aria-hidden="true"
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-md md:max-w-2xl h-16 md:h-24"
        />
      </div>

      {/* Compteurs animés + Countdown */}
      <StatsCountdown />

      {/* Section Instagram — Dernière publication — temporairement masquée */}
      <div className="hidden">
        <InstagramFeed />
      </div>

      {/* Séparateur floral — centré exactement sur la démarcation */}
      <div className="relative z-10 h-0 overflow-visible my-0">
        <img
          src="/separateur.svg"
          alt=""
          aria-hidden="true"
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-md md:max-w-2xl h-16 md:h-24"
        />
      </div>

      {/* Section À propos */}
      <section id="about" className="pt-32 md:pt-44 pb-20 md:pb-28">
        <div className="container mx-auto px-4 md:px-6">
          {/*
           * Titre : font-display (Cormorant Garamond), text-gala-primary (#5E708E)
           * Contraste #5E708E sur #FFFBF2 = 4.5:1 ✅ WCAG AA
           */}
          <h2 className="font-display text-3xl font-bold text-gala-primary md:text-4xl text-center md:text-left">
            À propos
          </h2>
          {/*
           * Corps : text-muted-foreground (#5C6475) sur fond crème (#FFFBF2)
           * Contraste = 5.1:1 ✅ WCAG AA
           */}
          <p className="mt-4 max-w-2xl text-muted-foreground text-center md:text-left">{description}</p>
        </div>
      </section>

      {/* Section Partenaires */}
      <section id="partners" className="bg-muted/50 py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-display text-3xl font-bold text-gala-primary md:text-4xl text-center md:text-left">
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
          <h2 className="font-display text-3xl font-bold text-gala-primary md:text-4xl text-center md:text-left">
            Billetterie
          </h2>
          <div className="mt-8">
            <TicketsSection />
          </div>
        </div>
      </section>

      {/* Section Équipe */}
      <section id="team" className="bg-muted/50 py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-display text-3xl font-bold text-gala-primary md:text-4xl text-center md:text-left">
            L'équipe organisatrice
          </h2>
          <p className="mt-2 text-muted-foreground text-center md:text-left">
            Découvrez les étudiants qui œuvrent dans l'ombre pour faire de
            cette soirée un moment inoubliable.
          </p>
          <div className="mt-8">
            <TeamSection />
          </div>
        </div>
      </section>

      {/* Section FAQ */}
      <section id="faq" className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-display text-3xl font-bold text-gala-primary md:text-4xl text-center md:text-left">
            Questions fréquentes
          </h2>
          <p className="mt-2 text-muted-foreground text-center md:text-left">
            Vous avez une question ? Consultez nos réponses ci-dessous.
          </p>
          <div className="mt-8">
            <FaqSection />
          </div>
        </div>
      </section>

      {/* Section Contact */}
      <section id="contact" className="bg-muted/50 py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-display text-3xl font-bold text-gala-primary md:text-4xl text-center md:text-left">
            Contact
          </h2>
          <p className="mt-2 text-muted-foreground text-center md:text-left">
            Une question, une suggestion ?<br className="sm:hidden" /> Écrivez-nous !
          </p>
          <div className="mt-8">
            <ContactSection />
          </div>
        </div>
      </section>

      {/* Séparateur floral — centré exactement sur la démarcation */}
      <div className="relative z-10 h-0 overflow-visible my-0">
        <img
          src="/separateur.svg"
          alt=""
          aria-hidden="true"
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-md md:max-w-2xl h-16 md:h-24"
        />
      </div>
    </div>
  );
}