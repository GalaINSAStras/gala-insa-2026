import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

/** Type simplifié pour une source d'image Sanity */
export type SanityImageSource = {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
};

/**
 * Client Sanity côté client (lecture publique)
 */
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn: true,
  perspective: "published",
});

/**
 * Client Sanity côté serveur (avec token API)
 */
export const serverClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  perspective: "published",
});

// Builder d'URL d'images Sanity
const builder = imageUrlBuilder(client);

/**
 * Génère une URL d'image Sanity optimisée
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}