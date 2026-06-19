import { getPartners } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/client";
import Image from "next/image";
import Link from "next/link";

const categoryStyles = {
  gold: {
    label: "Or",
    className: "border-gala-gold/40 bg-gala-gold/5",
    badge: "bg-gala-gold text-gala-primary-dark",
  },
  silver: {
    label: "Argent",
    className: "border-gala-silver/40 bg-gala-silver/5",
    badge: "bg-gala-silver text-white",
  },
  bronze: {
    label: "Bronze",
    className: "border-gala-bronze/40 bg-gala-bronze/5",
    badge: "bg-gala-bronze text-white",
  },
} as const;

export async function PartnersGrid() {
  const partners = await getPartners();

  if (!partners || partners.length === 0) {
    return (
      <p className="text-muted-foreground italic">
        Aucun partenaire pour le moment. Revenez bientôt !
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {partners.map((partner) => {
        const category = categoryStyles[partner.category] ?? categoryStyles.bronze;

        return (
          <Link
            key={partner._id}
            href={partner.websiteUrl ?? "#"}
            target={partner.websiteUrl ? "_blank" : undefined}
            rel={partner.websiteUrl ? "noopener noreferrer" : undefined}
            className={`group relative flex flex-col items-center justify-center rounded-xl border-2 p-6 transition-all hover:shadow-lg hover:-translate-y-1 ${category.className}`}
          >
            {/* Badge catégorie */}
            <span
              className={`absolute top-3 right-3 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${category.badge}`}
            >
              {category.label}
            </span>

            {/* Logo */}
            {partner.logo ? (
              <div className="relative h-20 w-40 overflow-hidden">
                <Image
                  src={
                    urlFor(partner.logo).width(160).height(80).fit("max").url() ??
                    "/images/placeholder-logo.svg"
                  }
                  alt={`Logo ${partner.name}`}
                  fill
                  className="object-contain transition-transform group-hover:scale-105"
                  sizes="160px"
                />
              </div>
            ) : (
              <div className="flex h-20 w-40 items-center justify-center rounded-lg border border-dashed border-muted-foreground/30">
                <span className="text-sm text-muted-foreground/50">
                  {partner.name}
                </span>
              </div>
            )}

            {/* Nom */}
            <p className="mt-4 text-sm font-semibold text-foreground">
              {partner.name}
            </p>
          </Link>
        );
      })}
    </div>
  );
}