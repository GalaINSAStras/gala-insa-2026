import type { Metadata } from "next";
import { getTickets } from "@/lib/sanity/queries";
import { TicketGrid } from "@/components/tickets/TicketGrid";
import type { TicketCardProps } from "@/components/tickets/TicketCard";
import type { TicketVariant } from "@/components/tickets/lib/variants";
import type { Ticket } from "@/lib/sanity/types";
import { PageHero } from "@/components/ornaments/PageHero";
import { FloralSeparator } from "@/components/ornaments/FloralSeparator";
import { SectionHeading } from "@/components/soiree/SectionHeading";

export const metadata: Metadata = {
  title: "Billetterie",
  description:
    "Réservez vos places pour le Gala INSA Strasbourg 2026 — Place Buffet + Soirée ou Place Soirée seule.",
};

export const revalidate = 60;

/* ─── Mapping Sanity → TicketCardProps ─── */
const VARIANT_CYCLE: TicketVariant[] = ["etudiant", "prevente", "normal"];

function toVariant(type: string, index: number): TicketVariant {
  const t = type.toLowerCase();
  // « Repas + Soirée — Étudiant & Diplômé » en jaune, comme le dernier billet
  if (t.includes("repas") && (t.includes("étudiant") || t.includes("etudiant"))) return "normal";
  if (t.includes("étudiant") || t.includes("etudiant")) return "etudiant";
  if (t.includes("vip") || t.includes("premium")) return "normal";
  return VARIANT_CYCLE[index % VARIANT_CYCLE.length];
}

function toBadge(type: string): string | undefined {
  const t = type.toLowerCase();
  if (t.includes("vip") || t.includes("premium")) return "Premium";
  return undefined;
}

function toQuantityLabel(ticket: Ticket): string {
  if (ticket.soldOut) return "Complet";
  if (ticket.quantityAvailable !== undefined && ticket.quantityAvailable > 0) {
    return `Il reste ${ticket.quantityAvailable} place${ticket.quantityAvailable > 1 ? "s" : ""}`;
  }
  return "Places limitées";
}

function toTicketCardProps(ticket: Ticket, index: number): TicketCardProps {
  return {
    id: ticket._id,
    variant: toVariant(ticket.type, index),
    title: ticket.type,
    price: ticket.price,
    description: ticket.description ?? "",
    quantityLabel: toQuantityLabel(ticket),
    href: ticket.externalLink,
    soldOut: ticket.soldOut,
    badge: toBadge(ticket.type),
  };
}

export default async function BilletteriePage() {
  const tickets = await getTickets().catch(() => null);

  return (
    <div className="flex flex-col">
      {/* === Hero orné === */}
      <PageHero
        kicker="Édition 2026"
        title="Billetterie"
        subtitle="Réservez votre place et rejoignez-nous pour une soirée qui promet d&rsquo;être mémorable."
      />

      {/* Séparateur floral — chevauche la jointure hero / contenu */}
      <FloralSeparator />

      {/* === Nos billets === */}
      <section className="bg-ivoire py-[clamp(3rem,7vw,6rem)]">
        <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
          <SectionHeading kicker="Réservez" title="Nos billets" />

          <div className="mt-12">
            {tickets && tickets.length > 0 ? (
              <TicketGrid tickets={tickets.map(toTicketCardProps)} />
            ) : (
              <div className="py-20 text-center">
                <p className="font-garamond text-xl italic text-ardoise/70">
                  La billetterie n&rsquo;a pas encore ouvert ses portes...
                  patience !
                </p>
              </div>
            )}
          </div>

          {/* Info HelloAsso */}
          <div className="mt-14 flex items-center justify-center gap-3">
            <span aria-hidden className="h-px w-10 bg-gradient-to-r from-transparent to-[var(--or-moyen)]" />
            <p className="text-sm text-ardoise/70">La billetterie passe par Helloasso</p>
            <span aria-hidden className="h-px w-10 bg-gradient-to-l from-transparent to-[var(--or-moyen)]" />
          </div>
        </div>
      </section>
    </div>
  );
}
