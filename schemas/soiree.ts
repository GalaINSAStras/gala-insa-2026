import { defineType, defineField } from "sanity";

/**
 * Schéma : Soirée (Singleton)
 * Thème, programme (timeline), buffet (comptoirs), carte, dress code & documents.
 * Refonte « La Soirée » — style Art nouveau / papeterie de mariage.
 */
export default defineType({
  name: "soiree",
  title: "La Soirée",
  type: "document",
  fields: [
    // ── Hero ──────────────────────────────────────────────
    defineField({
      name: "theme",
      title: "Thème de l'édition",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "accroche",
      title: "Accroche (2 lignes max)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "themeImage",
      title: "Image d'illustration du thème",
      type: "image",
      options: { hotspot: true },
    }),

    // ── Programme (timeline) ──────────────────────────────
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
              name: "heure",
              type: "string",
              title: "Horaire (ex : 19h — 21h)",
            },
            {
              name: "titre",
              type: "string",
              title: "Titre (ex : Buffet & animations)",
            },
            {
              name: "description",
              type: "text",
              title: "Description courte",
              rows: 3,
            },
            {
              name: "statut",
              type: "string",
              title: "Statut",
              options: {
                list: [
                  { title: "Confirmé", value: "confirme" },
                  { title: "À confirmer", value: "a_confirmer" },
                ],
                layout: "radio",
              },
              initialValue: "confirme",
            },
            {
              name: "mentionAttente",
              type: "string",
              title: "Mention discrète (si « À confirmer »)",
              description: "Ex : Horaires susceptibles d'évoluer",
            },
          ],
          preview: {
            select: { title: "titre", subtitle: "heure" },
          },
        },
      ],
    }),

    // ── Buffet (comptoirs) ────────────────────────────────
    defineField({
      name: "prixBuffet",
      title: "Prix — Place Buffet + Soirée (€)",
      type: "number",
    }),
    defineField({
      name: "comptoirs",
      title: "Comptoirs du buffet",
      type: "array",
      of: [
        {
          type: "object",
          name: "comptoir",
          title: "Comptoir",
          fields: [
            { name: "nom", type: "string", title: "Nom du comptoir" },
            { name: "sousTitre", type: "string", title: "Sous-titre" },
            {
              name: "plats",
              type: "array",
              title: "Plats",
              of: [
                {
                  type: "object",
                  name: "plat",
                  title: "Plat / mets",
                  fields: [
                    { name: "nom", type: "string", title: "Nom du plat" },
                    {
                      name: "provenance",
                      type: "string",
                      title: "Provenance / description",
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
                          { title: "Fruits à coque", value: "fruits_coque" },
                          { title: "Soja", value: "soja" },
                          { title: "Poisson", value: "poisson" },
                          { title: "Crustacés", value: "crustaces" },
                        ],
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
                          { title: "Sans gluten", value: "sans_gluten" },
                        ],
                        layout: "radio",
                      },
                    },
                  ],
                  preview: {
                    select: { title: "nom", subtitle: "provenance" },
                  },
                },
              ],
            },
          ],
          preview: {
            select: { title: "nom", subtitle: "sousTitre" },
          },
        },
      ],
    }),

    // ── La Carte (boissons) ───────────────────────────────
    defineField({
      name: "carte",
      title: "La Carte — Boissons",
      type: "array",
      of: [
        {
          type: "object",
          name: "carteCategory",
          title: "Catégorie (Alcools / Softs)",
          fields: [
            { name: "title", type: "string", title: "Titre de la catégorie" },
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
                    { name: "name", type: "string", title: "Nom" },
                    {
                      name: "format",
                      type: "string",
                      title: "Format (ex : bouteille, 25 cl)",
                    },
                    { name: "price", type: "number", title: "Prix (€)" },
                    {
                      name: "glassPrice",
                      type: "number",
                      title: "Prix au verre 12 cl (€) — si bouteille",
                    },
                  ],
                  preview: {
                    select: { title: "name", subtitle: "price" },
                  },
                },
              ],
            },
          ],
          preview: { select: { title: "title" } },
        },
      ],
    }),

    // ── Infos pratiques ───────────────────────────────────
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

    // ── Documents ─────────────────────────────────────────
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

    // ── Réglage ───────────────────────────────────────────
    defineField({
      name: "lineupRevealed",
      title: "Programmation dévoilée",
      type: "boolean",
      initialValue: false,
      description:
        "Cochez pour afficher le line-up artistique dans la timeline. Laissez décochée pour afficher l'état « à venir ».",
    }),
  ],
});

