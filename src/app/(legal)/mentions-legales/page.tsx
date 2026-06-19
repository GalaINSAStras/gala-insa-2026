import type { Metadata } from "next";
import { LEGAL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site du Gala INSA Strasbourg",
};

export default function MentionsLegalesPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
      <h1 className="font-heading text-3xl font-bold text-gala-primary md:text-4xl">
        Mentions légales
      </h1>

      <section className="mt-8 space-y-6 text-foreground/80">
        <div>
          <h2 className="font-heading text-xl font-semibold text-foreground">
            Éditeur du site
          </h2>
          <p className="mt-2">
            {LEGAL.associationName}
            <br />
            SIRET : {LEGAL.siret}
            <br />
            Siège social : {LEGAL.address}
            <br />
            Email : {LEGAL.email}
          </p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-semibold text-foreground">
            Directeur de la publication
          </h2>
          <p className="mt-2">
            Le Directeur de la publication est le Président de l'Association
            du Gala INSA Strasbourg.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-semibold text-foreground">
            Hébergement
          </h2>
          <p className="mt-2">
            Ce site est hébergé par <strong>Vercel Inc.</strong>
            <br />
            440 N Barranca Ave #4133
            <br />
            Covina, CA 91723, USA
            <br />
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gala-primary underline hover:text-gala-primary-light"
            >
              https://vercel.com
            </a>
          </p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-semibold text-foreground">
            Propriété intellectuelle
          </h2>
          <p className="mt-2">
            L'ensemble du contenu de ce site (textes, images, logos, etc.)
            est la propriété exclusive de l'Association du Gala INSA
            Strasbourg, sauf mention contraire. Toute reproduction ou
            représentation, totale ou partielle, sans autorisation préalable est
            interdite.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-semibold text-foreground">
            Données personnelles
          </h2>
          <p className="mt-2">
            Conformément au Règlement Général sur la Protection des Données
            (RGPD), vous disposez d'un droit d'accès, de
            rectification et de suppression de vos données personnelles. Pour
            exercer ces droits, veuillez nous contacter à l'adresse email
            suivante : {LEGAL.email}.
          </p>
          <p className="mt-2">
            Ce site utilise <strong>Umami</strong>, un outil d'analyse
            respectueux de la vie privée, qui ne collecte aucune donnée
            personnelle et ne dépose pas de cookies tiers.
          </p>
        </div>
      </section>
    </div>
  );
}