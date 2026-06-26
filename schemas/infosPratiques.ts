import { defineType, defineField } from "sanity";

/**
 * Schéma : Infos Pratiques (Singleton)
 * Horaires, tarifs, plan PDF, accessibilité, Team Stop VSS
 */
export default defineType({
  name: "infosPratiques",
  title: "Infos Pratiques",
  type: "document",
  fields: [
    defineField({
      name: "openingTime",
      title: "Horaire d'ouverture",
      type: "string",
      description: "Ex: 19h00",
    }),
    defineField({
      name: "closingTime",
      title: "Horaire de fermeture",
      type: "string",
      description: "Ex: 05h00",
    }),
    defineField({
      name: "tarifs",
      title: "Tarifs",
      type: "text",
      rows: 4,
      description: "Description des différents tarifs (étudiant, plein, etc.)",
    }),
    defineField({
      name: "planPDF",
      title: "Plan de L'Illiade (PDF)",
      type: "file",
      options: { accept: "application/pdf" },
    }),
    defineField({
      name: "planImage",
      title: "Plan de L'Illiade (image de repli)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "mapLat",
      title: "Latitude (carte interactive)",
      type: "number",
      initialValue: 48.5239,
    }),
    defineField({
      name: "mapLng",
      title: "Longitude (carte interactive)",
      type: "number",
      initialValue: 7.7152,
    }),
    defineField({
      name: "accessibilite",
      title: "Accessibilité",
      type: "text",
      rows: 5,
      description:
        "Dispositions pour les personnes en situation de handicap.",
    }),
    defineField({
      name: "stopVSSTitle",
      title: "Titre — Team Stop VSS",
      type: "string",
      initialValue: "Team Stop VSS",
    }),
    defineField({
      name: "stopVSS",
      title: "Protocole Team Stop VSS",
      type: "text",
      rows: 5,
      description:
        "Dispositif de prévention et de lutte contre les violences sexistes et sexuelles.",
    }),
  ],
});