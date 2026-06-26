import { defineType, defineField } from "sanity";

/**
 * Schéma : Line-Up
 * Artistes, DJ et animations programmés pour la soirée
 */
export default defineType({
  name: "lineup",
  title: "Line-Up",
  type: "document",
  fields: [
    defineField({
      name: "artistName",
      title: "Nom de l'artiste / DJ",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "stageTime",
      title: "Horaire de passage",
      type: "string",
      description: "Ex: 22h00 — 23h30",
    }),
    defineField({
      name: "genre",
      title: "Genre musical",
      type: "string",
      description: "Ex: Électro, Hip-Hop, House, Variété...",
    }),
    defineField({
      name: "description",
      title: "Courte description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "image",
      title: "Photo / Illustration",
      type: "image",
      options: { hotspot: true },
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
      title: "Ordre de passage",
      name: "displayOrder",
      by: [{ field: "displayOrder", direction: "asc" }],
    },
  ],
});