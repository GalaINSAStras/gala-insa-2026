import { createClient } from "next-sanity";
import { getProjectId, getDataset, getApiVersion, validateSanityEnv } from "./env";

/**
 * Configuration lazily-evaluated du client Sanity.
 * Les variables d'environnement ne sont lues qu'au premier appel,
 * ce qui évite les crashs au build si elles ne sont pas encore définies.
 */
export function getSanityClientConfig() {
  const projectId = getProjectId();
  const dataset = getDataset();
  const apiVersion = getApiVersion();

  return {
    projectId,
    dataset,
    apiVersion,
    useCdn: process.env.NODE_ENV === "production",
  };
}

/**
 * Client Sanity configuré avec stega (visual editing).
 * Utilise la config lazy pour supporter les environnements
 * où les variables ne sont pas encore définies (ex: build Vercel).
 */
export function getClient() {
  const config = getSanityClientConfig();

  return createClient({
    ...config,
    stega: {
      studioUrl: "/studio",
    },
  });
}

/**
 * Helper pour créer un client avec validation.
 * À utiliser dans les composants qui ont besoin du client.
 */
export function getValidatedClient() {
  validateSanityEnv();
  return getClient();
}

// NOTE : Pas d'exports constants ici !
// Les exports constants (comme 'sanityClientConfig' ou 'client') seraient
// évalués immédiatement à l'import du module, ce qui casserait le build
// sur Vercel si les variables d'environnement ne sont pas encore définies.
// Utilisez getSanityClientConfig() et getClient() à la place.
