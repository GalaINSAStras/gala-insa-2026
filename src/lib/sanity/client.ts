/**
 * Client Sanity — Basé sur next-sanity (createClient) et @sanity/image-url
 *
 * Ce fichier sert de couche d'abstraction pour l'ensemble du projet.
 * Il réexporte le client officiel et fournit urlFor() pour les images.
 */
import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";

import {
  apiVersion,
  dataset,
  projectId,
} from "@/sanity/lib/env";

/**
 * Client Sanity configuré pour les Server Components
 * (useCdn: true pour les données publiées)
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

// -- Image URL builder ------------------------------------------------

const builder = createImageUrlBuilder(client);

/**
 * Type d'image Sanity (asset référence avec crop/hotspot optionnels)
 */
export type SanityImageSource = {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  crop?: { top: number; bottom: number; left: number; right: number };
  hotspot?: { x: number; y: number; height: number; width: number };
};

/**
 * Génère une URL d'image Sanity avec chaînage fluide
 * Exemple : urlFor(image).width(400).height(300).url()
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// -- Helpers de requête (rétrocompatible avec queries.ts et composants) --

/**
 * Exécute une requête GROQ et retourne le résultat typé
 */
export async function sanityFetch<T>(query: string): Promise<T> {
  return client.fetch<T>(query);
}

/**
 * Alias pour fetch côté client (composants "use client")
 */
export const clientFetch = sanityFetch;
