import { defineType, defineField } from "sanity";

/**
 * Schéma : Soirée (Singleton)
 * Thème, dress code, menu buffet + tableau des allergènes
 */
export default defineType({
  name: "soiree",
  title: "La Soirée",
  type: "document",
  fields: [
    defineField({
      name: "theme",
      title: "Thème de la 71e édition",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "themeDescription",
      title: "Description du thème",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "themeImage",
      title: "Image d'illustration du thème",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "dressCode",
      title: "Code vestimentaire (Dress Code)",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "dressCodeIllustration",
      title: "Illustration du dress code",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "soireeSeuleDetails",
      title: "Détails — Place Soirée seule",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "soireeSeulePrice",
      title: "Prix — Place Soirée seule (€)",
      type: "number",
    }),
    defineField({
      name: "menuBuffetTitle",
      title: "Titre de la section Menu Buffet",
      type: "string",
      initialValue: "Menu Buffet + Soirée",
    }),
    defineField({
      name: "menuBuffet",
      title: "Menu du buffet",
      type: "array",
      of: [
        {
          type: "object",
          name: "menuItem",
          title: "Plat / Mets",
          fields: [
            { name: "dish", type: "string", title: "Plat" },
            {
              name: "allergenes",
              type: "array",
              title: "Allergènes",
              of: [{ type: "string" }],
              options: {
                list: [
                  { title: "Gluten", value: "gluten" },
                  { title: "Lactose", value: "lactose" },
                  { title: "Œufs", value: "oeufs" },
                  { title: "Arachides", value: "arachides" },
                  { title: "Fruits à coque", value: "fruits-a-coque" },
                  { title: "Poisson", value: "poisson" },
                  { title: "Crustacés", value: "crustaces" },
                  { title: "Soja", value: "soja" },
                  { title: "Sésame", value: "sesame" },
                  { title: "Sulfites", value: "sulfites" },
                  { title: "Céleri", value: "celeri" },
                  { title: "Moutarde", value: "moutarde" },
                  { title: "Lupin", value: "lupin" },
                  { title: "Mollusques", value: "mollusques" },
                ],
              },
            },
          ],
          preview: {
            select: {
              title: "dish",
              subtitle: "allergenes",
            },
          },
        },
      ],
    }),
    defineField({
      name: "buffetPrice",
      title: "Prix — Place Buffet + Soirée (€)",
      type: "number",
    }),
  ],
});