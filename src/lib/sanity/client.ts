/**
 * Client Sanity — Basé sur next-sanity (createClient) et @sanity/image-url
 *
 * ATTENTION : Tous les accès au client sont lazy (évalués tardivement)
 * pour éviter les crashs au build Next.js quand les variables d'environnement
 * Sanity ne sont pas encore définies (ex : premier déploiement Vercel).
 *
 * En l'absence de configuration, les fonctions retournent des fallbacks
 * (null / []) plutôt que de lancer une erreur.
 */
import type { SanityClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";

import { getSanityClientConfig, getClient as getSanityClient } from "@/sanity/lib/client";

// ── Cache lazy ──────────────────────────────────────────────────

let _client: SanityClient | null = null;
let _urlBuilder: ReturnType<typeof createImageUrlBuilder> | null = null;

function ensureClient() {
  if (!_client) {
    const config = getSanityClientConfig();
    if (!config.projectId) {
      // Si les variables ne sont pas définies, on ne crée pas le client.
      // Les appels à sanityFetch retourneront des fallbacks.
      return null;
    }
    _client = getSanityClient();
  }
  return _client;
}

function ensureUrlBuilder() {
  const c = ensureClient();
  if (!c) return null;
  if (!_urlBuilder) {
    _urlBuilder = createImageUrlBuilder(c);
  }
  return _urlBuilder;
}

// ── Type ────────────────────────────────────────────────────────

export type SanityImageSource = {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  crop?: { top: number; bottom: number; left: number; right: number };
  hotspot?: { x: number; y: number; height: number; width: number };
};

// ── URL builder lazy ────────────────────────────────────────────

/** Builder factice qui absorbe tous les appels chaînés et retourne "" */
const noopBuilder = new Proxy(
  { url: () => "", toString: () => "" },
  {
    get(_target, prop) {
      if (prop === "url" || prop === "toString") return () => "";
      // Toutes les méthodes de chaînage (.width, .height, .fit, etc.) retournent le proxy
      return () => noopBuilder;
    },
  }
) as ReturnType<ReturnType<typeof createImageUrlBuilder>["image"]> & {
  url: () => string;
};

/**
 * Génère une URL d'image Sanity.
 * Retourne un builder factice si le client Sanity n'est pas configuré,
 * ce qui permet d'enchaîner .width().height().url() sans casser le code.
 * Dans ce cas, l'appel .url() retourne une chaîne vide.
 */
export function urlFor(source: SanityImageSource) {
  const builder = ensureUrlBuilder();
  if (!builder) return noopBuilder;
  return builder.image(source);
}

// ── Query helper lazy ───────────────────────────────────────────

/**
 * Exécute une requête GROQ et retourne le résultat typé.
 * Si le client n'est pas configuré (variables absentes), retourne un fallback :
 *   - null pour les requêtes singleton
 *   - [] pour les requêtes de liste
 */
export async function sanityFetch<T>(query: string): Promise<T> {
  const c = ensureClient();
  if (!c) {
    // Retourne un fallback typé selon que la requête semble récupérer un singleton ([0]) ou une liste
    return (query.trim().endsWith("[0]") || query.trim().endsWith("[0]{"))
      ? (null as unknown as T)
      : ([] as unknown as T);
  }
  return c.fetch<T>(query);
}

/**
 * Alias pour fetch côté client (composants "use client")
 */
export const clientFetch = sanityFetch;