import type { Metadata } from "next";
import { LEGAL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité du site du Gala INSA Strasbourg",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
      <h1 className="font-heading text-3xl font-bold text-gala-primary md:text-4xl">
        Politique de confidentialité
      </h1>

      <section className="mt-8 space-y-6 text-foreground/80">
        <div>
          <h2 className="font-heading text-xl font-semibold text-foreground">
            Collecte des données
          </h2>
          <p className="mt-2">
            Ce site ne collecte aucune donnée personnelle vous concernant, sauf
            celles que vous nous transmettez volontairement via le formulaire de
            contact (nom, prénom, email, message).
          </p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-semibold text-foreground">
            Utilisation des données
          </h2>
          <p className="mt-2">
            Les données collectées via le formulaire de contact sont utilisées
            uniquement dans le but de répondre à votre demande. Elles ne sont
            pas utilisées à des fins commerciales et ne sont pas transmises à
            des tiers.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-semibold text-foreground">
            Durée de conservation
          </h2>
          <p className="mt-2">
            Vos données sont conservées pendant la durée nécessaire au
            traitement de votre demande, puis supprimées dans un délai
            maximum d'un an.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-semibold text-foreground">
            Cookies et traçage
          </h2>
          <p className="mt-2">
            Ce site utilise <strong>Umami</strong>, un outil d'analyse
            statistique respectueux de la vie privée. Umami ne collecte aucune
            donnée personnelle, ne dépose pas de cookies de traçage et ne
            recoupe pas les données avec d'autres sources. Les
            statistiques sont anonymes et agrégées.
          </p>
          <p className="mt-2">
            Aucun cookie publicitaire ou de réseau social n'est déposé
            sur ce site.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-semibold text-foreground">
            Vos droits
          </h2>
          <p className="mt-2">
            Conformément au RGPD, vous disposez des droits suivants :
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>Droit d'accès à vos données</li>
            <li>Droit de rectification</li>
            <li>Droit à l'effacement</li>
            <li>Droit à la limitation du traitement</li>
            <li>Droit d'opposition</li>
            <li>Droit à la portabilité</li>
          </ul>
          <p className="mt-2">
            Pour exercer ces droits, contactez-nous à : {LEGAL.email}
          </p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-semibold text-foreground">
            Contact
          </h2>
          <p className="mt-2">
            {LEGAL.associationName}
            <br />
            Email : {LEGAL.email}
            <br />
            Adresse : {LEGAL.address}
          </p>
        </div>
      </section>
    </div>
  );
}