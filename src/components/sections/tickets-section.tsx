"use client";

import { useEffect, useState } from "react";
import { clientFetch } from "@/lib/sanity/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Ticket } from "@/lib/sanity/types";

export function TicketsSection() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    clientFetch<Ticket[]>(`*[_type == "ticket"] | order(displayOrder asc)`)
      .then((data) => { if (!cancelled) { setTickets(data ?? []); setLoading(false); } })
      .catch(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  if (loading) return <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-48 animate-pulse rounded-xl border bg-muted" />)}</div>;
  if (!tickets.length) return <p className="text-muted-foreground italic">Billetterie à venir.</p>;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {tickets.map((t) => (
        <div key={t._id} className={`relative flex flex-col rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md ${t.soldOut ? "opacity-60" : ""}`}>
          {t.soldOut && <span className="absolute -top-2 -right-2 rounded-full bg-destructive px-3 py-1 text-xs font-bold text-destructive-foreground">Épuisé</span>}
          <h3 className="font-heading text-lg font-bold text-foreground">{t.type}</h3>
          <p className="mt-2 text-3xl font-bold text-gala-primary">{t.price.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}</p>
          {t.description && <p className="mt-3 text-sm text-muted-foreground flex-1">{t.description}</p>}
          {t.quantityAvailable !== undefined && t.quantityAvailable > 0 && (
            <p className="mt-2 text-xs text-muted-foreground">{t.quantityAvailable > 10 ? "Places disponibles" : `Plus que ${t.quantityAvailable} place${t.quantityAvailable > 1 ? "s" : ""}`}</p>
          )}
          <Button className="mt-4 w-full" disabled={t.soldOut} nativeButton={false}
            render={<Link href={t.externalLink ?? "#"} target={t.externalLink ? "_blank" : undefined} rel={t.externalLink ? "noopener noreferrer" : undefined} />}>
            {t.soldOut ? "Indisponible" : "Réserver"}
          </Button>
        </div>
      ))}
    </div>
  );
}