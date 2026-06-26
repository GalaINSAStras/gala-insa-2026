"use client";

import { motion } from "motion/react";
import { urlFor } from "@/lib/sanity/client";
import Image from "next/image";
import Link from "next/link";
import type { Partner } from "@/lib/sanity/types";

const categoryStyles = {
  premium: { label: "Premium", className: "border-gala-gold/60 bg-gala-gold/10", badge: "bg-gala-gold text-gala-primary-dark" },
  gold: { label: "Or", className: "border-gala-gold/40 bg-gala-gold/5", badge: "bg-gala-gold text-gala-primary-dark" },
  silver: { label: "Argent", className: "border-gala-silver/40 bg-gala-silver/5", badge: "bg-gala-silver text-white" },
} as const;

/**
 * Grille des partenaires avec animation motion.dev
 * Au survol : le logo s'agrandit et la description apparaît
 */
export function PartenairesGridClient({ partners }: { partners: Partner[] }) {
  if (!partners.length) {
    return (
      <p className="text-center text-muted-foreground italic">
        La liste des partenaires sera bientôt dévoilée.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {partners.map((p, i) => {
        const c = categoryStyles[p.category] ?? categoryStyles.silver;
        return (
          <motion.div
            key={p._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
          >
            <Link
              href={p.websiteUrl ?? "#"}
              target={p.websiteUrl ? "_blank" : undefined}
              rel={p.websiteUrl ? "noopener noreferrer" : undefined}
              className={`group relative flex flex-col items-center justify-center rounded-xl border-2 p-6 transition-all hover:shadow-lg hover:-translate-y-1 ${c.className}`}
            >
              {/* Badge catégorie */}
              <span className={`absolute top-3 right-3 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${c.badge}`}>
                {c.label}
              </span>

              {/* Logo */}
              {p.logo ? (
                <motion.div
                  className="relative h-20 w-40 overflow-hidden"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={urlFor(p.logo).width(160).height(80).fit("max").url()}
                    alt={`Logo ${p.name}`}
                    fill
                    className="object-contain"
                    sizes="160px"
                  />
                </motion.div>
              ) : (
                <div className="flex h-20 w-40 items-center justify-center rounded-lg border border-dashed border-muted-foreground/30">
                  <span className="text-sm text-muted-foreground/50">{p.name}</span>
                </div>
              )}

              {/* Nom */}
              <p className="mt-4 text-sm font-semibold text-foreground">
                {p.name}
              </p>

              {/* Description (apparaît au survol) */}
              {p.description && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  whileHover={{ opacity: 1, height: "auto" }}
                  className="mt-2 text-xs text-muted-foreground/80 leading-relaxed text-center overflow-hidden"
                >
                  {p.description}
                </motion.p>
              )}
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}