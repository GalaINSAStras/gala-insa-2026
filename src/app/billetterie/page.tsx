import type { Metadata } from "next";
import { getTickets } from "@/lib/sanity/queries";
import { TicketGrid } from "@/components/tickets/TicketGrid";
import type { TicketCardProps } from "@/components/tickets/TicketCard";
import type { TicketVariant } from "@/components/tickets/lib/variants";
import type { Ticket } from "@/lib/sanity/types";

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
      {/* === Hero === */}
      <section className="flex min-h-[40vh] items-center justify-center bg-gradient-to-br from-gala-primary via-gala-primary-dark to-gala-primary px-4 text-white">
        <div className="text-center max-w-3xl">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-gala-gold">
            72<sup>e</sup> Édition
          </p>
          <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Billetterie
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Réservez votre place et rejoignez-nous pour une soirée qui promet d&rsquo;être mémorable.
          </p>
        </div>
      </section>

      {/* === Nos billets === */}
      <section className="py-[clamp(3rem,7vw,6rem)]">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="mb-[clamp(2rem,4vw,3.5rem)] text-center text-[clamp(1.8rem,4vw,2.6rem)] italic text-ardoise">
            Nos billets
          </h2>

          {tickets && tickets.length > 0 ? (
            <TicketGrid tickets={tickets.map(toTicketCardProps)} />
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground italic">
                La billetterie n&rsquo;a pas encore ouvert ses portes... patience !
              </p>
            </div>
          )}

          {/* Info HelloAsso */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              La billetterie passe par Helloasso
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
