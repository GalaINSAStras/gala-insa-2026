import type { SanityImageSource } from "./client";

// ============================================
// Types TypeScript pour les schémas Sanity
// ============================================

/** Partenaire du Gala */
export interface Partner {
  _id: string;
  _type: "partner";
  _createdAt: string;
  _updatedAt: string;
  name: string;
  logo: SanityImageSource;
  description?: string;
  displayOrder: number;
}

/** Événement (édition du Gala) */
export interface Event {
  _id: string;
  _type: "event";
  _createdAt: string;
  _updatedAt: string;
  title: string;
  /** Sanity renvoie `null` (et non `undefined`) pour un champ vidé dans le Studio. */
  edition: number | null;
  participants?: number | null;
  date: string;
  location: string;
  address?: string;
  description?: string;
  poster?: SanityImageSource;
  status: "upcoming" | "ongoing" | "past";
  ticketLink?: string;
}

/** Type de billet */
export interface Ticket {
  _id: string;
  _type: "ticket";
  _createdAt: string;
  _updatedAt: string;
  type: string;
  price: number;
  description?: string;
  quantityAvailable?: number;
  soldOut: boolean;
  displayOrder: number;
  externalLink?: string;
}

/** Question de la FAQ */
export interface FAQ {
  _id: string;
  _type: "faq";
  _createdAt: string;
  _updatedAt: string;
  question: string;
  reponse: string;
  displayOrder: number;
}

/** Membre de l'équipe organisatrice */
export interface TeamMember {
  _id: string;
  _type: "teamMember";
  _createdAt: string;
  _updatedAt: string;
  name: string;
  role: string;
  photo?: SanityImageSource;
  bio?: string;
  displayOrder: number;
}

// ============================================
// Nouveaux types (71e édition)
// ============================================

/** Hero — Section d'accueil */
export interface Hero {
  _id: string;
  _type: "hero";
  _createdAt: string;
  _updatedAt: string;
  title: string;
  teaserVideo?: { _type: "file"; asset: { _ref: string; _type: "reference" } };
  posterFallback?: SanityImageSource;
  loadingLogo?: SanityImageSource;
  taglines?: string[];
  ctaLabel: string;
  ctaLink: string;
}

/** Soirée — Thème, programme, buffet, carte, infos pratiques */
export interface Soiree {
  _id: string;
  _type: "soiree";
  _createdAt: string;
  _updatedAt: string;
  theme: string;
  accroche?: string;
  themeImage?: SanityImageSource;
  programme?: ProgrammePhase[];
  prixBuffet?: number;
  comptoirs?: Comptoir[];
  carte?: CarteCategory[];
  dressCode?: string;
  dressCodeIllustration?: SanityImageSource;
  soireeSeuleDetails?: string;
  soireeSeulePrice?: number;
  lineupRevealed?: boolean;
  contratMineurPDF?: SanityFileAsset;
  reglementInterieurPDF?: SanityFileAsset;
}

/** Plat du buffet (comptoir) */
export interface Plat {
  _key: string;
  nom?: string;
  provenance?: string;
  allergenes?: string[];
  regime?: "vegetarien" | "vegan" | "sans_gluten";
}

/** Comptoir du buffet (carte en arche) */
export interface Comptoir {
  _key: string;
  nom?: string;
  sousTitre?: string;
  plats?: Plat[];
}

/** Boisson de la carte (bar ou repas) */
export interface CarteItem {
  _key: string;
  name: string;
  format?: string;
  price: number;
  glassPrice?: number;
}

/** Catégorie de boissons de la carte (ex : À la soirée, Au repas) */
export interface CarteCategory {
  _key: string;
  title?: string;
  items?: CarteItem[];
}

/** Phase du programme de la soirée (créneau horaire) */
export interface ProgrammePhase {
  _key: string;
  heure?: string;
  titre?: string;
  description?: string;
  statut?: "confirme" | "a_confirmer";
  mentionAttente?: string;
}

/** Line-Up artistique */
export interface LineupItem {
  _id: string;
  _type: "lineup";
  _createdAt: string;
  _updatedAt: string;
  artistName: string;
  stageTime?: string;
  genre?: string;
  description?: string;
  image?: SanityImageSource;
  displayOrder: number;
}


/**
 * Asset fichier Sanity résolu via GROQ (PDF, etc.)
 * — forme projetée utilisée par les pages ({url, originalFilename, size}).
 */
export interface SanityFileAsset {
  url: string;
  originalFilename?: string;
  size?: number;
}

/**
 * Document système `sanity.fileAsset` complet, tel que retourné par GROQ
 * sans projection. Utilisé par le route handler /documents/[filename]
 * pour résoudre un PDF par son nom de fichier d'origine.
 */
export interface SanityFileAssetDocument {
  _id: string;
  _type: "sanity.fileAsset";
  _createdAt?: string;
  _updatedAt?: string;
  url: string;
  originalFilename?: string;
  mimeType?: string;
  extension?: string;
  size?: number;
}

/** Infos Pratiques */
export interface InfosPratiques {
  _id: string;
  _type: "infosPratiques";
  _createdAt: string;
  _updatedAt: string;
  openingTime?: string;
  closingTime?: string;
  tarifs?: string;
  planPDF?: SanityFileAsset;
  planImage?: SanityImageSource;
  mapLat: number;
  mapLng: number;
  accessibilite?: string;
  stopVSSTitle?: string;
  stopVSS?: string;
}

/** Paramètres Instagram (post épinglé géré depuis Sanity) */
export interface InstagramSettings {
  _id: string;
  _type: "instagram";
  _createdAt: string;
  _updatedAt: string;
  title: string;
  profilePicUrl?: string;
  latestPostUrl?: string;
}
