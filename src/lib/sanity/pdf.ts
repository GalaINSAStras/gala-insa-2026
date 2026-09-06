import type { SanityFileAsset } from "./types";

// ============================================
// URLs des PDF Sanity
// ============================================

/**
 * Le CDN Sanity sert les fichiers sous un nom de hash illisible
 * (ex : 4b0b75ad007cd19a8c236ece2e855a3e149dcebc.pdf). On les re-sert donc
 * depuis notre propre domaine, sous leur nom de fichier d'origine, via le
 * route handler /documents/[filename]/route.ts :
 *
 *   /documents/Contrat%20mineurs%20Gala%202026.pdf
 *
 * → onglet intitulé « Contrat mineurs Gala 2026.pdf » et téléchargement
 *   enregistré sous ce même nom.
 */

/** Base des URLs de documents (implémentée par src/app/documents/[filename]/route.ts). */
const DOCUMENTS_BASE = "/documents";

/**
 * URL d'ouverture d'un PDF dans le navigateur (nouvel onglet, visu PDF),
 * sous son nom de fichier d'origine.
 * Retombe sur l'URL CDN brute si le nom d'origine est inconnu,
 * et retourne null si l'asset est absent.
 */
export function pdfViewerUrl(
  asset: SanityFileAsset | null | undefined
): string | null {
  if (!asset?.url) return null;
  return asset.originalFilename
    ? `${DOCUMENTS_BASE}/${encodeURIComponent(asset.originalFilename)}`
    : asset.url;
}

/**
 * URL de téléchargement forcé du PDF (Content-Disposition: attachment) —
 * le fichier s'enregistre sous son nom d'origine.
 * Retourne null si l'asset est absent.
 */
export function pdfDownloadUrl(
  asset: SanityFileAsset | null | undefined
): string | null {
  const url = pdfViewerUrl(asset);
  if (!url) return null;
  return url.startsWith(`${DOCUMENTS_BASE}/`) ? `${url}?download=1` : url;
}