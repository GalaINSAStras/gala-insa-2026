/**
 * Configuration Sanity — Variables d'environnement
 *
 * Note : Les variables NEXT_PUBLIC_* ne sont disponibles que côté serveur
 * lors du build Next.js (et non côté client). Ce module est donc réservé
 * aux Server Components et aux fichiers de configuration (sanity.config.ts).
 *
 * Pour éviter les crashs au build sur Vercel quand les variables ne sont
 * pas encore configurées, l'accès est encadré par une validation explicite.
 */

let _projectId: string | undefined;
let _dataset: string | undefined;
let _apiVersion: string | undefined;

function loadEnv() {
  if (_projectId !== undefined) return;
  _projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  _dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  _apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-06-01";
}

/**
 * Vérifie que les variables d'environnement Sanity sont présentes.
 * Lance une erreur uniquement si un appel réel nécessite la config.
 * Le build Next.js peut ainsi passer sans ces variables définies (fallback).
 */
export function validateSanityEnv(): void {
  loadEnv();
  if (!_projectId) {
    throw new Error(
      "Configuration Sanity incomplète : " +
        "NEXT_PUBLIC_SANITY_PROJECT_ID n'est pas défini. " +
        "Ajoutez-le dans le fichier .env.local ou dans les variables " +
        "d'environnement Vercel."
    );
  }
  if (!_dataset) {
    throw new Error(
      "Configuration Sanity incomplète : " +
        "NEXT_PUBLIC_SANITY_DATASET n'est pas défini. " +
        "Ajoutez-le dans le fichier .env.local ou dans les variables " +
        "d'environnement Vercel."
    );
  }
}

/**
 * Retourne le projectId, ou "" si non défini (permet un fallback silencieux).
 */
export function getProjectId(): string {
  loadEnv();
  return _projectId ?? "";
}

/**
 * Retourne le dataset, ou "production" par défaut.
 */
export function getDataset(): string {
  loadEnv();
  return _dataset ?? "production";
}

/**
 * Retourne la version d'API Sanity.
 */
export function getApiVersion(): string {
  loadEnv();
  return _apiVersion ?? "2026-06-01";
}

/* ─── Exports constants (rétrocompatibilité) ───
 * Ces constantes sont calculées au moment de l'import. Pour un accès
 * tardif et validé, préférez les getters (getProjectId, getDataset, etc.)
 * ou appelez validateSanityEnv() avant.
 */
export const projectId = getProjectId();
export const dataset = getDataset();
export const apiVersion = getApiVersion();