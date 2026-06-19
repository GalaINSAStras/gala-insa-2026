import { defineType, defineField } from "sanity";

/**
 * Schéma : Membre de l'équipe
 * Membres de l'association organisatrice du Gala
 */
export default defineType({
  name: "teamMember",
  title: "Membre de l'équipe",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nom complet",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Rôle",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bio",
      title: "Biographie courte",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "displayOrder",
      title: "Ordre d'affichage",
      type: "number",
      initialValue: 0,
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