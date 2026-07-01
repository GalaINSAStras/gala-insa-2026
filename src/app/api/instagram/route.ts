import { NextResponse } from "next/server";
import { getInstagram } from "@/lib/sanity/queries";

/**
 * GET /api/instagram
 *
 * Récupère la photo de profil et le dernier post du compte Instagram
 * @gala_insa_strasbourg.
 *
 * Stratégie (par ordre de priorité) :
 * 1. Document Sanity "instagram" (source CMS, recommandée)
 * 2. Variables d'environnement (NEXT_PUBLIC_INSTAGRAM_*) — fallback statique
 * 3. Parsing HTML de la page profil Instagram (fallback scraping)
 * 4. Retourne { null, null } en dernier recours
 *
 * Cache : 6h (revalidate)
 */

export const revalidate = 21600; // 6 heures

export interface InstagramApiResponse {
  profilePicUrl: string | null;
  latestPostUrl: string | null;
  username: string;
}

/**
 * Tente de scraper la page profil Instagram pour extraire les données.
 * Souvent bloqué par Instagram (retourne une page de login).
 */
async function scrapeInstagramProfile(
  username: string
): Promise<{ profilePicUrl: string | null; latestPostUrl: string | null }> {
  const profileUrl = `https://www.instagram.com/${username}/`;

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
    return { profilePicUrl: null, latestPostUrl: null };
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

  if (ogUrlMatch?.[1] && ogUrlMatch[1] !== `https://www.instagram.com/${username}/`) {
    const url = ogUrlMatch[1];
    if (/\/p\//.test(url)) {
      latestPostUrl = url;
    }
  }

  // Stratégie B : chercher dans les données JSON embarqués
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
      latestPostUrl = permalinkMatch[0];
    }
  }

  return { profilePicUrl, latestPostUrl };
}

export async function GET() {
  const username = "gala_insa_strasbourg";

  // 1. Source prioritaire : Sanity CMS (document instagramSettings)
  try {
    const instagramSettings = await getInstagram();
    if (instagramSettings?.profilePicUrl && instagramSettings?.latestPostUrl) {
      return NextResponse.json(
        {
          profilePicUrl: instagramSettings.profilePicUrl,
          latestPostUrl: instagramSettings.latestPostUrl,
          username,
        },
        {
          status: 200,
          headers: {
            "Cache-Control":
              "public, s-maxage=21600, stale-while-revalidate=43200",
          },
        }
      );
    }
  } catch {
    // Sanity indisponible, continuer avec les fallbacks
    console.warn("[API Instagram] Sanity indisponible, fallback scraping");
  }

  // 2. Variables d'environnement (statique)
  const envProfilePicUrl = process.env.NEXT_PUBLIC_INSTAGRAM_PROFILE_PIC_URL ?? null;
  if (envProfilePicUrl) {
    return NextResponse.json(
      {
        profilePicUrl: envProfilePicUrl,
        latestPostUrl: process.env.NEXT_PUBLIC_INSTAGRAM_LATEST_POST_URL ?? null,
        username,
      },
      {
        status: 200,
        headers: {
          "Cache-Control":
            "public, s-maxage=21600, stale-while-revalidate=43200",
        },
      }
    );
  }

  // 3. Scraping HTML (fallback)
  try {
    const scraped = await scrapeInstagramProfile(username);
    return NextResponse.json(
      { profilePicUrl: scraped.profilePicUrl, latestPostUrl: scraped.latestPostUrl, username },
      {
        status: 200,
        headers: {
          "Cache-Control":
            "public, s-maxage=21600, stale-while-revalidate=43200",
        },
      }
    );
  } catch (error) {
    console.error("[API Instagram] Erreur scraping:", error);
  }

  // 4. Fallback final
  return NextResponse.json(
    { profilePicUrl: null, latestPostUrl: null, username },
    {
      status: 200,
      headers: {
        "Cache-Control":
          "public, s-maxage=21600, stale-while-revalidate=43200",
      },
    }
  );
}