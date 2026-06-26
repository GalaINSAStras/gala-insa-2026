import type { Metadata } from "next";
import Link from "next/link";
import { getTickets } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Billetterie",
  description:
    "Réservez vos places pour le Gala INSA Strasbourg 2026 — Place Buffet + Soirée ou Place Soirée seule.",
};

export const revalidate = 60;

export default async function BilletteriePage() {
  const tickets = await getTickets();

  return (
    <div className="flex flex-col">
      {/* === Hero === */}
      <section className="flex min-h-[40vh] items-center justify-center bg-gradient-to-br from-gala-primary via-gala-primary-dark to-gala-primary px-4 text-white">
        <div className="text-center max-w-3xl">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-gala-gold">
            71<sup>e</sup> Édition
          </p>
          <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Billetterie
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Réservez vos places dès maintenant et préparez-vous à vivre une soirée inoubliable.
          </p>
        </div>
      </section>

      {/* === Cartes de billets === */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          {tickets && tickets.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {tickets.map((ticket) => (
                <div
                  key={ticket._id}
                  className="group relative flex flex-col rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
                >
                  {/* Badge épuisé */}
                  {ticket.soldOut && (
                    <span className="absolute top-4 right-4 rounded-full bg-destructive px-3 py-1 text-xs font-semibold text-destructive-foreground">
                      Épuisé
                    </span>
                  )}

                  <h3 className="font-heading text-xl font-bold text-foreground">
                    {ticket.type}
                  </h3>

                  {ticket.description && (
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">
                      {ticket.description}
                    </p>
                  )}

                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-gala-primary">
                      {ticket.price} €
                    </span>
                  </div>

                  {ticket.quantityAvailable !== undefined && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      {ticket.soldOut
                        ? "Aucune place disponible"
                        : ticket.quantityAvailable > 0
                          ? `Il reste ${ticket.quantityAvailable} place${ticket.quantityAvailable > 1 ? "s" : ""}`
                          : "Places limitées"}
                    </p>
                  )}

                  <Link
                    href={ticket.externalLink ?? "#"}
                    target={ticket.externalLink ? "_blank" : undefined}
                    rel={ticket.externalLink ? "noopener noreferrer" : undefined}
                    className={`mt-6 inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-colors ${
                      ticket.soldOut
                        ? "bg-muted text-muted-foreground cursor-not-allowed pointer-events-none"
                        : "bg-gala-primary text-white hover:bg-gala-primary-light"
                    }`}
                    aria-disabled={ticket.soldOut}
                  >
                    {ticket.soldOut ? "Indisponible" : "Réserver sur HelloAsso"}
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground italic">
                La billetterie ouvrira prochainement.
              </p>
            </div>
          )}

          {/* Info HelloAsso */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              Les réservations sont gérées via notre partenaire HelloAsso.
            </p>
            <Link
              href="https://www.helloasso.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-gala-primary hover:text-gala-primary-light transition-colors"
            >
              Accéder à HelloAsso
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}