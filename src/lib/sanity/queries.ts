import { sanityFetch } from "./client";
import type {
  Partner,
  Event,
  Ticket,
  FAQ,
  TeamMember,
  Hero,
  Soiree,
  LineupItem,
  InfosPratiques,
} from "./types";

// ============================================
// Requêtes GROQ — Sanity CMS
// ============================================

/** Récupère l'événement (édition courante) */
export async function getEvent(): Promise<Event | null> {
  return sanityFetch<Event | null>(
    `*[_type == "event" && status == "upcoming"][0]`
  );
}

/** Récupère tous les partenaires triés par ordre d'affichage */
export async function getPartners(): Promise<Partner[]> {
  return sanityFetch<Partner[]>(
    `*[_type == "partner"] | order(displayOrder asc)`
  );
}

/** Récupère les billets disponibles triés par ordre d'affichage */
export async function getTickets(): Promise<Ticket[]> {
  return sanityFetch<Ticket[]>(
    `*[_type == "ticket"] | order(displayOrder asc)`
  );
}

/** Récupère les questions FAQ triées par ordre d'affichage */
export async function getFaq(): Promise<FAQ[]> {
  return sanityFetch<FAQ[]>(
    `*[_type == "faq"] | order(displayOrder asc)`
  );
}

/** Récupère les membres de l'équipe triés par ordre d'affichage */
export async function getTeam(): Promise<TeamMember[]> {
  return sanityFetch<TeamMember[]>(
    `*[_type == "teamMember"] | order(displayOrder asc)`
  );
}

// ============================================
// Nouvelles requêtes (71e édition)
// ============================================

/** Récupère le singleton Hero (accueil) */
export async function getHero(): Promise<Hero | null> {
  return sanityFetch<Hero | null>(`*[_type == "hero"][0]`);
}

/** Récupère le singleton Soirée */
export async function getSoiree(): Promise<Soiree | null> {
  return sanityFetch<Soiree | null>(`*[_type == "soiree"][0]`);
}

/** Récupère tous les artistes de la line-up triés par ordre de passage */
export async function getLineup(): Promise<LineupItem[]> {
  return sanityFetch<LineupItem[]>(
    `*[_type == "lineup"] | order(displayOrder asc)`
  );
}

/** Récupère le singleton Infos Pratiques */
export async function getInfosPratiques(): Promise<InfosPratiques | null> {
  return sanityFetch<InfosPratiques | null>(
    `*[_type == "infosPratiques"][0]`
  );
}