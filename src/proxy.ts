import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Page « coming soon » — verrouille l'accès au reste du site.
 *
 * Seule la page d'accueil `/` est accessible. Toutes les autres routes
 * (billetterie, la-soiree, infos-pratiques, partenaires, studio, api…)
 * sont redirigées vers `/`. Les assets statiques (images, polices,
 * favicon) et les fichiers internes Next (`_next/*`) restent servis.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Page d'accueil coming soon : autorisée
  if (pathname === "/") {
    return NextResponse.next();
  }

  // Assets statiques (fichiers avec extension) : autorisés
  if (/\.[a-zA-Z0-9]{1,10}$/.test(pathname)) {
    return NextResponse.next();
  }

  // Toutes les autres routes : redirection vers l'accueil
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/((?!_next/).*)"],
};
