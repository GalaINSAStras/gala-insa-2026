"use client";

import { useEffect, useState } from "react";
import { clientFetch, urlFor } from "@/lib/sanity/client";
import Image from "next/image";
import Link from "next/link";
import type { Partner } from "@/lib/sanity/types";

const categoryStyles = {
  gold: { label: "Or", className: "border-gala-gold/40 bg-gala-gold/5", badge: "bg-gala-gold text-gala-primary-dark" },
  silver: { label: "Argent", className: "border-gala-silver/40 bg-gala-silver/5", badge: "bg-gala-silver text-white" },
  bronze: { label: "Bronze", className: "border-gala-bronze/40 bg-gala-bronze/5", badge: "bg-gala-bronze text-white" },
} as const;

export function PartnersGrid() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    clientFetch<Partner[]>(`*[_type == "partner"] | order(displayOrder asc)`)
      .then((data) => { if (!cancelled) { setPartners(data ?? []); setLoading(false); } })
      .catch(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  if (loading) return <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-40 animate-pulse rounded-xl border bg-muted" />)}</div>;
  if (!partners.length) return <p className="text-muted-foreground italic">Aucun partenaire pour le moment.</p>;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {partners.map((p) => {
        const c = categoryStyles[p.category] ?? categoryStyles.bronze;
        return (
          <Link key={p._id} href={p.websiteUrl ?? "#"} target={p.websiteUrl ? "_blank" : undefined} rel={p.websiteUrl ? "noopener noreferrer" : undefined}
            className={`group relative flex flex-col items-center justify-center rounded-xl border-2 p-6 transition-all hover:shadow-lg hover:-translate-y-1 ${c.className}`}>
            <span className={`absolute top-3 right-3 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${c.badge}`}>{c.label}</span>
            {p.logo ? (
              <div className="relative h-20 w-40 overflow-hidden">
                <Image src={urlFor(p.logo).width(160).height(80).fit("max").url()} alt={`Logo ${p.name}`} fill className="object-contain transition-transform group-hover:scale-105" sizes="160px" />
              </div>
            ) : (
              <div className="flex h-20 w-40 items-center justify-center rounded-lg border border-dashed border-muted-foreground/30">
                <span className="text-sm text-muted-foreground/50">{p.name}</span>
              </div>
            )}
            <p className="mt-4 text-sm font-semibold text-foreground">{p.name}</p>
          </Link>
        );
      })}
    </div>
  );
}