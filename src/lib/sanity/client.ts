/**
 * Client Sanity — Utilise fetch() natif
 */

const projectId = "tsuy1vy3";
const dataset = "production";
const apiVersion = "2024-01-01";

const baseUrl = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`;

/**
 * Exécute une requête GROQ sur l'API Sanity CDN (côté serveur)
 */
export async function sanityFetch<T>(query: string): Promise<T> {
  const url = `${baseUrl}?query=${encodeURIComponent(query)}`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`Sanity fetch failed: ${res.statusText}`);
  const json = await res.json();
  return json.result as T;
}

/**
 * Exécute une requête GROQ depuis le navigateur
 */
export async function clientFetch<T>(query: string): Promise<T> {
  const url = `${baseUrl}?query=${encodeURIComponent(query)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Sanity fetch failed: ${res.statusText}`);
  const json = await res.json();
  return json.result as T;
}

/** Type d'image Sanity */
export type SanityImageSource = {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  crop?: { top: number; bottom: number; left: number; right: number };
  hotspot?: { x: number; y: number; height: number; width: number };
};

/**
 * Génère une URL d'image Sanity
 */
export function urlFor(source: SanityImageSource): {
  width: (w: number) => {
    height: (h: number) => {
      fit: (f: string) => { url: () => string };
    };
  };
  url: () => string;
} {
  const ref = source?.asset?._ref;
  const parts = ref?.split("-") ?? [];
  const [, id, dimensions, format] = parts;

  const buildUrl = (w?: number, h?: number, fit?: string) => {
    const base = `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`;
    const params = new URLSearchParams();
    if (w) params.set("w", String(w));
    if (h) params.set("h", String(h));
    if (fit) params.set("fit", fit);
    const qs = params.toString();
    return qs ? `${base}?${qs}` : base;
  };

  return {
    width: (w: number) => ({
      height: (h: number) => ({
        fit: (f: string) => ({ url: () => buildUrl(w, h, f) }),
      }),
    }),
    url: () => buildUrl(),
  };
}