import { defineType, defineField } from "sanity";

/**
 * Schéma Instagram — stocke les URLs du dernier post Instagram et photo de profil
 * afin d'éviter le scraping non fiable d'Instagram.
 *
 * L'équipe Gala met à jour ce document manuellement via Sanity Studio
 * lorsqu'un nouveau post est publié.
 */
export default defineType({
  name: "instagram",
  title: "Instagram",
  type: "document",
  icon: () => "📸",
  fields: [
    defineField({
      name: "title",
      title: "Titre interne",
      description: "Utilisé uniquement pour identifier ce document dans le CMS",
      type: "string",
      initialValue: "Paramètres Instagram",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "profilePicUrl",
      title: "URL de la photo de profil",
      description:
        "URL directe de l'image de profil Instagram. Téléchargez-la depuis Instagram et hébergez-la ou utilisez l'URL CDN directe.",
      type: "url",
      validation: (Rule) =>
        Rule.uri({ allowRelative: false }).warning(
          "Assurez-vous que l'URL est accessible publiquement"
        ),
    }),
    defineField({
      name: "latestPostUrl",
      title: "URL du dernier post Instagram",
      description:
        "URL complète du dernier post Instagram (ex: https://www.instagram.com/p/XXXXX/)",
      type: "url",
      validation: (Rule) =>
        Rule.uri({ allowRelative: false }).warning(
          "L'URL doit pointer vers un post Instagram valide"
        ),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "latestPostUrl",
    },
    prepare({ title, subtitle }) {
      return {
        title: title ?? "Instagram",
        subtitle: subtitle
          ? `Dernier post : ${subtitle.slice(0, 50)}...`
          : "Aucun post configuré",
      };
    },
  },
});