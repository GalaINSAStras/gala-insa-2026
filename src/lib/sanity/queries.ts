import { sanityFetch } from "./client";
import type { Partner, Event, Ticket, FAQ, TeamMember } from "./types";

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