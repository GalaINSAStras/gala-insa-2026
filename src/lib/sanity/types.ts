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
  category: "gold" | "silver" | "bronze";
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
  answer: string;
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