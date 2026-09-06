import { type NextRequest, NextResponse } from "next/server";
import { sanityFetch } from "@/lib/sanity/client";
import type { SanityFileAssetDocument } from "@/lib/sanity/types";

/**
 * GET /documents/<nom-du-fichier>
 *
 * Sert un PDF Sanity sous son nom de fichier d'origine.
 *
 * Le CDN Sanity nomme les fichiers avec leur hash
 * (ex : 4b0b75ad007cd19a8c236ece2e855a3e149dcebc.pdf), ce qui donne des
 * onglets et des téléchargements illisibles pour les utilisateurs. Ce
 * route handler re-sert le fichier depuis notre domaine :
 *
 *   - par défaut : Content-Disposition: inline → ouverture dans le
 *     navigateur, onglet intitulé « Contrat mineurs Gala 2026.pdf »
 *   - avec ?download=1 : Content-Disposition: attachment → téléchargement
 *     direct, enregistré sous le même nom d'origine
 *
 * Le PDF est résolu par son `originalFilename` Sanity (le plus récent
 * l'emporte en cas de re-upload), puis récupéré depuis le CDN. L'URL CDN
 * étant dérivée du hash du contenu, le fetch est mis en cache serveur
 * sans risque de servir un contenu périmé.
 */

/** Asset Sanity par nom de fichier d'origine — le plus récent l'emporte. */
const ASSET_BY_FILENAME_QUERY = `*[_type == "sanity.fileAsset" && originalFilename == $filename] | order(_updatedAt desc)[0]`;

/** Ce route handler ne sert que des PDF. */
const PDF_MIME_TYPE = "application/pdf";

/** Cache navigateur/CDN : court, car un même nom peut pointer vers un re-upload. */
const CACHE_CONTROL = "public, max-age=60, s-maxage=300, stale-while-revalidate=600";

/** Longueur maximale acceptée pour un nom de fichier. */
const MAX_FILENAME_LENGTH = 255;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;

  // ── 1. Validation du segment demandé ──────────────────────────
  if (
    filename.length === 0 ||
    filename.length > MAX_FILENAME_LENGTH ||
    filename.includes("/") ||
    filename.includes("\\") ||
    filename.includes("\0")
  ) {
    return notFound();
  }

  try {
    // ── 2. Résolution de l'asset Sanity ─────────────────────────
    const asset = await sanityFetch<SanityFileAssetDocument | null>(
      ASSET_BY_FILENAME_QUERY,
      { filename }
    );

    if (!asset?.url || asset.mimeType?.toLowerCase() !== PDF_MIME_TYPE) {
      return notFound();
    }

    // ── 3. Récupération du fichier sur le CDN Sanity ────────────
    // L'URL CDN contient le hash du contenu : le fichier qu'elle sert est
    // immuable, donc le cache serveur (force-cache) est sans risque.
    const upstream = await fetch(asset.url, { cache: "force-cache" });
    if (!upstream.ok) {
      return unavailable();
    }
    const file = await upstream.arrayBuffer();

    // ── 4. Réponse sous le nom d'origine ─────────────────────────
    const wantsDownload = request.nextUrl.searchParams.get("download") === "1";

    return new Response(file, {
      headers: {
        "Content-Type": PDF_MIME_TYPE,
        "Content-Disposition": buildContentDisposition(
          wantsDownload ? "attachment" : "inline",
          asset.originalFilename ?? filename
        ),
        "Content-Length": String(file.byteLength),
        "Cache-Control": CACHE_CONTROL,
      },
    });
  } catch (error) {
    console.error("[/documents] Erreur de service du PDF :", error);
    return unavailable();
  }
}

/** 404 — nom de fichier inconnu ou non PDF. */
function notFound() {
  return new NextResponse("Document introuvable", { status: 404 });
}

/** 502 — le CDN Sanity n'a pas répondu correctement. */
function unavailable() {
  return new NextResponse(
    "Document momentanément indisponible — réessayez dans un instant.",
    { status: 502 }
  );
}

/**
 * Construit l'en-tête Content-Disposition (RFC 6266 + RFC 5987).
 * Fournit le nom exact — accents et espaces inclus — via `filename*`,
 * avec un repli quoted-string ASCII pour les clients historiques.
 */
function buildContentDisposition(
  type: "inline" | "attachment",
  filename: string
): string {
  // En quoted-string, les caractères de contrôle, guillemets et antislashs
  // sont interdits — on les remplace par des espaces.
  const safeName = filename.replace(/[\x00-\x1F\x7F"\\]/g, " ").trim();
  const asciiFallback = safeName.replace(/[^\x20-\x7E]/g, "") || "document";

  return [
    type,
    `filename="${asciiFallback}"`,
    `filename*=UTF-8''${encodeURIComponent(filename)}`,
  ].join("; ");
}