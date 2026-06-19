import { defineType, defineField } from "sanity";

/**
 * Schéma : Ticket / Billetterie
 * Types de billets disponibles pour le Gala
 */
export default defineType({
  name: "ticket",
  title: "Billetterie",
  type: "document",
  fields: [
    defineField({
      name: "type",
      title: "Type de billet",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "Prix (€)",
      type: "number",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "quantityAvailable",
      title: "Quantité disponible",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "soldOut",
      title: "Épuisé",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "displayOrder",
      title: "Ordre d'affichage",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "externalLink",
      title: "Lien de vente externe",
      type: "url",
      description: "Lien vers la plateforme de billetterie externe",
    }),
  ],
  orderings: [
    {
      title: "Ordre d'affichage",
      name: "displayOrder",
      by: [{ field: "displayOrder", direction: "asc" }],
    },
  ],
});