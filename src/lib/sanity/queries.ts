import groq from "groq";
import { client } from "./client";
import type { Partner, Event, Ticket, FAQ, TeamMember } from "./types";

// ============================================
// Requêtes GROQ typées — Sanity CMS
// ============================================

/** Récupère l'événement (édition courante) */
export const eventQuery = groq`*[_type == "event" && status == "upcoming"][0]`;

/** Récupère tous les partenaires triés par ordre d'affichage */
export const partnersQuery = groq`*[_type == "partner"] | order(displayOrder asc)`;

/** Récupère les billets disponibles triés par ordre d'affichage */
export const ticketsQuery = groq`*[_type == "ticket"] | order(displayOrder asc)`;

/** Récupère les questions FAQ triées par ordre d'affichage */
export const faqQuery = groq`*[_type == "faq"] | order(displayOrder asc)`;

/** Récupère les membres de l'équipe triés par ordre d'affichage */
export const teamQuery = groq`*[_type == "teamMember"] | order(displayOrder asc)`;

// ============================================
// Fonctions de fetch typées
// ============================================

/** Récupère les données de l'événement */
export async function getEvent(): Promise<Event | null> {
  return client.fetch<Event | null>(eventQuery);
}

/** Récupère la liste des partenaires */
export async function getPartners(): Promise<Partner[]> {
  return client.fetch<Partner[]>(partnersQuery);
}

/** Récupère la liste des billets */
export async function getTickets(): Promise<Ticket[]> {
  return client.fetch<Ticket[]>(ticketsQuery);
}

/** Récupère la liste des questions FAQ */
export async function getFaq(): Promise<FAQ[]> {
  return client.fetch<FAQ[]>(faqQuery);
}

/** Récupère la liste des membres de l'équipe */
export async function getTeam(): Promise<TeamMember[]> {
  return client.fetch<TeamMember[]>(teamQuery);
}