import { getTickets } from "@/lib/sanity/queries";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export async function TicketsSection() {
  const tickets = await getTickets();

  if (!tickets || tickets.length === 0) {
    return (
      <p className="text-muted-foreground italic">
        Billetterie à venir. Restez à l'écoute !
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {tickets.map((ticket) => (
        <div
          key={ticket._id}
          className={`relative flex flex-col rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md ${
            ticket.soldOut ? "opacity-60" : ""
          }`}
        >
          {/* Badge épuisé */}
          {ticket.soldOut && (
            <span className="absolute -top-2 -right-2 rounded-full bg-destructive px-3 py-1 text-xs font-bold text-destructive-foreground">
              Épuisé
            </span>
          )}

          {/* Type */}
          <h3 className="font-heading text-lg font-bold text-foreground">
            {ticket.type}
          </h3>

          {/* Prix */}
          <p className="mt-2 text-3xl font-bold text-gala-primary">
            {ticket.price.toLocaleString("fr-FR", {
              style: "currency",
              currency: "EUR",
            })}
          </p>

          {/* Description */}
          {ticket.description && (
            <p className="mt-3 text-sm text-muted-foreground flex-1">
              {ticket.description}
            </p>
          )}

          {/* Disponibilité */}
          {ticket.quantityAvailable !== undefined && ticket.quantityAvailable > 0 && (
            <p className="mt-2 text-xs text-muted-foreground">
              {ticket.quantityAvailable > 10
                ? "Places disponibles"
                : `Plus que ${ticket.quantityAvailable} place${
                    ticket.quantityAvailable > 1 ? "s" : ""
                  }`}
            </p>
          )}

          {/* CTA */}
          <Button
            className="mt-4 w-full"
            disabled={ticket.soldOut}
            render={
              <Link
                href={ticket.externalLink ?? "#"}
                target={ticket.externalLink ? "_blank" : undefined}
                rel={ticket.externalLink ? "noopener noreferrer" : undefined}
              />
            }
          >
            {ticket.soldOut ? "Indisponible" : "Réserver"}
          </Button>
        </div>
      ))}
    </div>
  );
}