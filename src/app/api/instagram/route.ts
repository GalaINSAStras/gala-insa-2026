import { NextResponse } from "next/server";

/**
 * GET /api/instagram
 *
 * Récupère la photo de profil et le dernier post du compte Instagram
 * @gala_insa_strasbourg via le parsing HTML server-side.
 *
 * Stratégie :
 * 1. Fetch la page profil Instagram
 * 2. Extrait og:image → photo de profil
 * 3. Extrait le dernier post depuis les données JSON-LD/page
 * 4. Cache 6h (revalidate) pour éviter les blocages IP
 *
 * Fallback : retourne { profilePicUrl: null, latestPostUrl: null } en cas d'échec
 */

export const revalidate = 21600; // 6 heures

export interface InstagramApiResponse {
  profilePicUrl: string | null;
  latestPostUrl: string | null;
  username: string;
}

export async function GET() {
  const username = "gala_insa_strasbourg";
  const profileUrl = `https://www.instagram.com/${username}/`;

  try {
    const response = await fetch(profileUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "fr-FR,fr;q=0.9,en;q=0.8",
      },
      next: { revalidate: 21600 },
    });

    if (!response.ok) {
      console.warn(
        `[API Instagram] Échec fetch ${profileUrl}: ${response.status}`
      );
      return NextResponse.json(
        { profilePicUrl: null, latestPostUrl: null, username },
        { status: 200 }
      );
    }

    const html = await response.text();

    // 1. Extraire la photo de profil depuis og:image
    const ogImageMatch = html.match(
      /<meta\s+property="og:image"\s+content="([^"]+)"[\s/]*>/i
    );
    const profilePicUrl = ogImageMatch?.[1] ?? null;

    // 2. Extraire le dernier post
    // Stratégie A : chercher og:url (pointe vers le dernier post)
    const ogUrlMatch = html.match(
      /<meta\s+property="og:url"\s+content="([^"]+)"[\s/]*>/i
    );
    let latestPostUrl: string | null = null;

    if (ogUrlMatch?.[1] && ogUrlMatch[1] !== profileUrl) {
      // og:url peut pointer vers le dernier post (contient /p/)
      const url = ogUrlMatch[1];
      if (/\/p\//.test(url)) {
        latestPostUrl = url;
      }
    }

    // Stratégie B : chercher dans les data JSON embarqués (window.__INITIAL_STATE__)
    if (!latestPostUrl) {
      const jsonDataMatch = html.match(
        /<script type="text\/javascript">window\.__INITIAL_STATE__\s*=\s*({.*?});<\/script>/
      );
      if (jsonDataMatch?.[1]) {
        try {
          const data = JSON.parse(jsonDataMatch[1]);
          const edges =
            data?.entry_data?.ProfilePage?.[0]?.graphql?.user
              ?.edge_owner_to_timeline_media?.edges;
          if (edges?.length > 0) {
            const shortcode = edges[0].node.shortcode;
            if (shortcode) {
              latestPostUrl = `https://www.instagram.com/p/${shortcode}/`;
            }
          }
        } catch {
          // Parsing JSON silencieux
        }
      }
    }

    // Stratégie C : regex simple sur les permaliens dans le HTML
    if (!latestPostUrl) {
      const permalinkMatch = html.match(
        /https:\/\/www\.instagram\.com\/p\/[A-Za-z0-9_-]+\//g
      );
      if (permalinkMatch?.length) {
        // Prendre le premier permalien trouvé (le plus récent dans le flux)
        latestPostUrl = permalinkMatch[0];
      }
    }

    return NextResponse.json(
      { profilePicUrl, latestPostUrl, username },
      {
        status: 200,
        headers: {
          "Cache-Control":
            "public, s-maxage=21600, stale-while-revalidate=43200",
        },
      }
    );
  } catch (error) {
    console.error("[API Instagram] Erreur:", error);
    return NextResponse.json(
      { profilePicUrl: null, latestPostUrl: null, username },
      { status: 200 }
    );
  }
}