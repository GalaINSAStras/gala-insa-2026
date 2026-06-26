// ============================================
// 🎭 Gala INSA Strasbourg 2026 — Constantes
// ============================================

import { TOKENS } from "./design-tokens";

/** Couleurs de la charte graphique Gala 2026 (Design System V2) */
export const COLORS = {
  /** Bleu ardoise — primaire */
  galaPrimary: TOKENS.primary,
  /** Variante claire */
  galaPrimaryLight: TOKENS.primaryLight,
  /** Ocre doré — Accent (ex-Gold) */
  galaGold: TOKENS.accent,
  /** Bleu pastel — Silver (ex-argent) */
  galaSilver: TOKENS.primaryLight,
  /** Vert clair — Bronze */
  galaBronze: TOKENS.secondaryLight,
} as const;

/** Informations sur l'événement */
export const EVENT = {
  /** Année d'édition */
  year: 2026,
  /** Numéro d'édition */
  edition: 71,
  /** Date de l'événement (ISO) */
  date: "2026-11-21",
  /** Lieu */
  location: "L'Illiade, Illkirch-Graffenstaden",
  /** Ville */
  city: "Illkirch-Graffenstaden",
  /** Adresse complète */
  address: "L'Illiade, 1 Rue de l'Illiade, 67400 Illkirch-Graffenstaden",
} as const;

/** Mentions légales obligatoires */
export const LEGAL = {
  associationName: "Association du Gala INSA Strasbourg",
  siret: "90144794600012",
  address:
    "INSA Strasbourg, 24 Boulevard de la Victoire, 67000 Strasbourg",
  email: "contact@gala-insa-strasbourg.fr",
} as const;

/** Navigation principale */
export const NAVIGATION = [
  { label: "La Soirée", href: "/la-soiree" },
  { label: "Infos Pratiques", href: "/infos-pratiques" },
  { label: "Billetterie", href: "/billetterie" },
  { label: "Partenaires", href: "/partenaires" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
] as const;

/** Réseaux sociaux */
export const SOCIAL = {
  instagram: "https://www.instagram.com/gala_insa_strasbourg/",
  linkedin: "https://www.linkedin.com/company/gala-insa-strasbourg/",
  facebook: "https://www.facebook.com/gala.insa.strasbourg/",
} as const;

/** URLs de l'application */
export const APP_URLS = {
  base: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  mentionsLegales: "/mentions-legales",
  politiqueConfidentialite: "/politique-confidentialite",
} as const;