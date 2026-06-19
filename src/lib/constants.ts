// ============================================
// 🎭 Gala INSA Strasbourg 2026 — Constantes
// ============================================

/** Couleurs de la charte graphique Gala 2026 */
export const COLORS = {
  /** Bleu marine INSA — primaire */
  galaPrimary: "#043768" as const,
  /** Variante plus claire */
  galaPrimaryLight: "#0654a0" as const,
  /** Variante plus foncée */
  galaPrimaryDark: "#032a50" as const,
  /** Or — partenaires Gold */
  galaGold: "#c9a84c" as const,
  /** Argent — partenaires Silver */
  galaSilver: "#b0b0b0" as const,
  /** Bronze — partenaires Bronze */
  galaBronze: "#a67c52" as const,
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
  { label: "À propos", href: "/#about" },
  { label: "Partenaires", href: "/#partners" },
  { label: "Billetterie", href: "/#tickets" },
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