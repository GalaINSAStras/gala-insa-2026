import { defineType, defineField } from "sanity";

/**
 * Schéma : Événement
 * Informations principales de l'édition du Gala 2026
 */
export default defineType({
  name: "event",
  title: "Événement",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "edition",
      title: "Numéro d'édition",
      type: "number",
      initialValue: 71,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date de l'événement",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Lieu",
      type: "string",
      initialValue: "L'Illiade, Illkirch-Graffenstaden",
    }),
    defineField({
      name: "address",
      title: "Adresse complète",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "poster",
      title: "Affiche de l'événement",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "status",
      title: "Statut",
      type: "string",
      options: {
        list: [
          { title: "À venir", value: "upcoming" },
          { title: "En cours", value: "ongoing" },
          { title: "Terminé", value: "past" },
        ],
      },
      initialValue: "upcoming",
    }),
    defineField({
      name: "ticketLink",
      title: "Lien de billetterie externe",
      type: "url",
    }),
  ],
});