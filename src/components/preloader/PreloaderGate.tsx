"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Preloader } from "./Preloader";

/**
 * Affiche le preloader à chaque chargement complet de la page (F5, accès
 * direct, retour arrière). Il ne rejoue pas lors des navigations côté
 * client : `layout.tsx` ne se remonte pas entre deux routes, contrairement
 * à `template.tsx` qui gère le rideau inter-pages.
 *
 * Le site (children) est toujours rendu : le preloader est un overlay
 * au-dessus, qui se démonte à la fin de son animation de sortie.
 *
 * ⚠️ Le Studio Sanity (/studio) est EXCLU du preloader.
 */
export function PreloaderGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [complete, setComplete] = useState(false);

  const isStudio = pathname.startsWith("/studio");
  const active = !isStudio && !complete;

  // Blocage du scroll pendant l'affichage du preloader
  useEffect(() => {
    if (!active) return;

    const { body, documentElement } = document;
    const prevBodyOverflow = body.style.overflow;
    const prevHtmlOverflow = documentElement.style.overflow;

    body.style.overflow = "hidden";
    documentElement.style.overflow = "hidden";

    return () => {
      body.style.overflow = prevBodyOverflow;
      documentElement.style.overflow = prevHtmlOverflow;
    };
  }, [active]);

  return (
    <>
      {children}
      {active && <Preloader onComplete={() => setComplete(true)} />}
    </>
  );
}
