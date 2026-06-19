import { defineType, defineField } from "sanity";

/**
 * Schéma : Partenaire
 * Partenaires du Gala classés par catégorie (Or/Argent/Bronze)
 */
export default defineType({
  name: "partner",
  title: "Partenaire",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nom du partenaire",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "websiteUrl",
      title: "Site web",
      type: "url",
    }),
    defineField({
      name: "category",
      title: "Catégorie",
      type: "string",
      options: {
        list: [
          { title: "Or", value: "gold" },
          { title: "Argent", value: "silver" },
          { title: "Bronze", value: "bronze" },
        ],
      },
      validation: (rule) => rule.required(),
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