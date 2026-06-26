import { defineType, defineField } from "sanity";

/**
 * Schéma : Hero (Singleton)
 * Contrôle la section hero de la page d'accueil
 * — Vidéo teaser en arrière-plan, logo de chargement, phrases d'accroche
 */
export default defineType({
  name: "hero",
  title: "Hero — Accueil",
  type: "document",
  // On utilise un ID fixe pour garantir le singleton
  fields: [
    defineField({
      name: "title",
      title: "Titre principal",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "teaserVideo",
      title: "Vidéo teaser (WebM/AV1)",
      type: "file",
      description:
        "Vidéo d'arrière-plan optimisée en WebM ou AV1. Ratio 16:9 recommandé.",
      options: { accept: "video/webm, video/mp4" },
    }),
    defineField({
      name: "posterFallback",
      title: "Image de repli (poster)",
      type: "image",
      description:
        "Image affichée tant que la vidéo n'est pas chargée.",
      options: { hotspot: true },
    }),
    defineField({
      name: "loadingLogo",
      title: "Logo de chargement initial",
      type: "image",
      description: "Logo affiché pendant l'écran de chargement.",
      options: { hotspot: true },
    }),
    defineField({
      name: "taglines",
      title: "Phrases d'accroche",
      type: "array",
      of: [{ type: "string" }],
      description: "Phrases défilantes dans la hero section.",
    }),
    defineField({
      name: "ctaLabel",
      title: "Texte du bouton CTA",
      type: "string",
      initialValue: "Réserver ma place",
    }),
    defineField({
      name: "ctaLink",
      title: "Lien du bouton CTA",
      type: "string",
      initialValue: "/billetterie",
    }),
  ],
});