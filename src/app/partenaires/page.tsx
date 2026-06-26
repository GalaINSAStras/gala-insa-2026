import type { Metadata } from "next";
import { getPartners } from "@/lib/sanity/queries";
import { PartenairesGridClient } from "./partenaires-grid-client";

export const metadata: Metadata = {
  title: "Partenaires",
  description:
    "Découvrez les partenaires qui soutiennent le Gala INSA Strasbourg 2026.",
};

export const revalidate = 60;

export default async function PartenairesPage() {
  const partners = await getPartners().catch(() => []);

  return (
    <div className="flex flex-col">
      {/* === Hero === */}
      <section className="flex min-h-[35vh] items-center justify-center bg-gradient-to-br from-gala-primary via-gala-primary-dark to-gala-primary px-4 text-white">
        <div className="text-center max-w-3xl">
          <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Nos Partenaires
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Merci à tous nos partenaires pour leur soutien précieux.
          </p>
        </div>
      </section>

      {/* === Grille des partenaires avec animation motion === */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <PartenairesGridClient partners={partners ?? []} />
        </div>
      </section>
    </div>
  );
}