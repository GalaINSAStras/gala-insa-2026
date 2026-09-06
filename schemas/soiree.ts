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
      name: "programme",
      title: "Programme de la soirée (timeline)",
      type: "array",
      of: [
        {
          type: "object",
          name: "programmePhase",
          title: "Créneau / phase",
          fields: [
            {
              name: "time",
              type: "string",
              title: "Horaire (ex : 19h — 21h)",
            },
            {
              name: "title",
              type: "string",
              title: "Titre (ex : Buffet & animations)",
            },
            {
              name: "note",
              type: "string",
              title: "Précision (ex : coupure à 3h30)",
            },
          ],
          preview: {
            select: {
              title: "time",
              subtitle: "title",
            },
          },
        },
      ],
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
              name: "categorie",
              type: "string",
              title: "Catégorie",
              options: {
                list: [
                  { title: "Salée froide", value: "salee-froide" },
                  { title: "Salée chaude", value: "salee-chaude" },
                  { title: "Sucrée", value: "sucre" },
                ],
                layout: "radio",
              },
            },
            {
              name: "regime",
              type: "string",
              title: "Régime alimentaire",
              options: {
                list: [
                  { title: "Végétarien", value: "vegetarien" },
                  { title: "Vegan", value: "vegan" },
                ],
                layout: "radio",
              },
            },
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
    defineField({
      name: "carte",
      title: "La Carte — Boissons",
      type: "array",
      of: [
        {
          type: "object",
          name: "carteCategory",
          title: "Catégorie (bar / repas)",
          fields: [
            {
              name: "title",
              type: "string",
              title: "Titre de la catégorie",
            },
            {
              name: "items",
              type: "array",
              title: "Boissons",
              of: [
                {
                  type: "object",
                  name: "carteItem",
                  title: "Boisson",
                  fields: [
                    {
                      name: "name",
                      type: "string",
                      title: "Nom",
                    },
                    {
                      name: "format",
                      type: "string",
                      title: "Format (ex : bouteille, 25 cl, 12 cl)",
                    },
                    {
                      name: "price",
                      type: "number",
                      title: "Prix (€)",
                    },
                    {
                      name: "glassPrice",
                      type: "number",
                      title: "Prix au verre 12 cl (€) — si bouteille",
                    },
                  ],
                  preview: {
                    select: {
                      title: "name",
                      subtitle: "price",
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: { title: "title" },
          },
        },
      ],
    }),
    defineField({
      name: "lineupRevealed",
      title: "Programmation dévoilée",
      type: "boolean",
      initialValue: false,
      description:
        "Cochez pour afficher le line-up. Laissez décochée pour masquer la programmation tant qu'elle n'est pas finalisée.",
    }),
    defineField({
      name: "contratMineurPDF",
      title: "Contrat pour mineurs (PDF)",
      type: "file",
      options: { accept: "application/pdf" },
      description:
        "Contrat à signer par les participants mineurs. Téléchargeable depuis la page La Soirée.",
    }),
    defineField({
      name: "reglementInterieurPDF",
      title: "Règlement intérieur de la soirée (PDF)",
      type: "file",
      options: { accept: "application/pdf" },
      description:
        "Règlement intérieur de la soirée, téléchargeable depuis la page La Soirée.",
    }),
  ],
});