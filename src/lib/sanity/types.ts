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
  websiteUrl?: string;
  description?: string;
  category: "premium" | "gold" | "silver";
  displayOrder: number;
}

/** Événement (édition du Gala) */
export interface Event {
  _id: string;
  _type: "event";
  _createdAt: string;
  _updatedAt: string;
  title: string;
  edition: number;
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

/** Soirée — Thème, menu, dress code */
export interface Soiree {
  _id: string;
  _type: "soiree";
  _createdAt: string;
  _updatedAt: string;
  theme: string;
  themeDescription?: string;
  themeImage?: SanityImageSource;
  dressCode?: string;
  dressCodeIllustration?: SanityImageSource;
  soireeSeuleDetails?: string;
  soireeSeulePrice?: number;
  menuBuffetTitle?: string;
  menuBuffet?: MenuItem[];
  buffetPrice?: number;
}

export interface MenuItem {
  dish: string;
  allergenes?: string[];
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

/** Infos Pratiques */
export interface InfosPratiques {
  _id: string;
  _type: "infosPratiques";
  _createdAt: string;
  _updatedAt: string;
  openingTime?: string;
  closingTime?: string;
  tarifs?: string;
  planPDF?: { url: string; originalFilename?: string; size?: number };
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
