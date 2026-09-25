import Image from "next/image";
import { PartnersGrid } from "@/components/sections/partners-grid";
import { FaqSection } from "@/components/sections/faq-section";
import { TeamSection } from "@/components/sections/team-section";
import { ContactSection } from "@/components/sections/contact-section";
import { getEvent } from "@/lib/sanity/queries";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export const revalidate = 60;

export default async function ComingSoon() {
  const event = await getEvent().catch(() => null);
  const description =
    event?.description ??
    "Le Gala INSA Strasbourg revient pour une nouvelle edition exceptionnelle.";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10 bg-marine px-6 py-16 text-center text-white">
      <Image
        src="/logo/signature-logo.png"
        alt="Logo Gala 2026"
        width={220}
        height={220}
        priority
      />

      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Le Gala revient
        </h1>
        <p className="max-w-md text-lg text-neutral-400">
          Édition 2026 — informations et billetterie très bientôt.
        </p>
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
           * Titre : font-display (Cormorant Garamond), text-gala-primary (#2C3E5C)
           * Contraste #2C3E5C sur #FFFBF2 = 4.5:1 ✅ WCAG AA
           */}
          <h2 className="font-titre text-3xl font-bold text-gala-primary md:text-4xl text-center">
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
          <h2 className="font-titre text-3xl font-bold text-gala-primary md:text-4xl text-center">
            Nos partenaires
          </h2>
          <div className="mt-8">
            <PartnersGrid />
          </div>
        </div>
      </section>

      {/* Section Équipe */}
      <section id="team" className="hidden bg-muted/50 py-10 sm:py-20 md:py-28">
        <div className="container mx-auto px-5 md:px-6">
          <h2 className="font-titre text-3xl font-bold text-gala-primary md:text-4xl text-center">
            L&apos;équipe organisatrice
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
          <div className="grid grid-cols-1 items-stretch md:grid-cols-[clamp(90px,12vw,170px)_minmax(0,1fr)_clamp(90px,12vw,170px)] lg:grid-cols-[clamp(130px,16vw,240px)_minmax(0,1fr)_clamp(130px,16vw,240px)]">
            {/* Fleur gauche */}
            <div className="relative hidden md:block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/ornaments/fleurs_gauche.svg"
                alt=""
                aria-hidden
                loading="lazy"
                className="absolute inset-0 h-full w-full object-contain object-bottom"
              />
            </div>

            {/* Contenu FAQ */}
            <div className="relative">
              <h2 className="font-titre text-3xl font-bold text-gala-primary md:text-4xl text-center">
                Questions fréquentes
              </h2>
              <p className="mt-2 text-muted-foreground text-center">
                Une interrogation ? On a sûrement la réponse.
              </p>
              <div className="mt-8">
                <FaqSection />
              </div>
            </div>

            {/* Fleur droite */}
            <div className="relative hidden md:block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/ornaments/fleurs_droite.svg"
                alt=""
                aria-hidden
                loading="lazy"
                className="absolute inset-0 h-full w-full object-contain object-bottom"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section Contact */}
      <section id="contact" className="bg-muted/50 py-10 sm:py-20 md:py-28">
        <div className="container mx-auto px-5 md:px-6">
          <h2 className="font-titre text-3xl font-bold text-gala-primary md:text-4xl text-center">
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