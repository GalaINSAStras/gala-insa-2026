"use client";

import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Transition inter-pages — Effet rideau "Curtains: Clip Wipe"
 *
 * Reproduction du pattern Motion "curtains clip-wipe" :
 * https://motion.dev/examples/js-curtains-clip-wipe
 *
 * Principe :
 * - Un calque-rideau coloré (couleur primaire Gala) est superposé au contenu.
 * - À l'entrée d'une page : le rideau commence OUVERT (caché par clip-path)
 *   puis se referme (devient visible) en un mouvement vertical.
 * - À la sortie d'une page : le rideau se rouvre (redevient caché).
 *
 * ⚠️ Le Studio Sanity (/studio) est EXCLU de l'animation.
 */

/** Easing cinématique — courbe de Bézier prestige (identique à motion.dev) */
const EASE = [0.76, 0, 0.24, 1] as const;

/** Durée d'une demi-transition (entrée ou sortie du rideau) */
const CURTAIN_DURATION = 0.6;

/**
 * Drapeau module-scoped : survit aux remontages de <Template> lors des
 * navigations côté client, mais est réinitialisé à chaque chargement
 * complet (F5). Il permet de sauter l'animation du rideau au tout premier
 * rendu sans la désactiver pour les navigations suivantes.
 *
 * ⚠️ Ne PAS utiliser un `useRef` ici : `template.tsx` se remonte à chaque
 * navigation, le ref serait donc réinitialisé à chaque route.
 */
let hasCompletedInitialMount = false;

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Le rideau ne doit pas se jouer au tout premier rendu (chargement
  // complet / F5) : il est réservé aux navigations côté client.
  const isInitialMount = !hasCompletedInitialMount;

  useEffect(() => {
    hasCompletedInitialMount = true;
  }, []);

  // Désactiver l'animation pour les routes du studio Sanity
  if (pathname.startsWith("/studio")) {
    return <>{children}</>;
  }

  // État initial du rideau :
  // - premier rendu du document → déjà ouvert (masqué) : aucune animation
  // - navigation suivante → fermé (visible) : il s'ouvre sur la nouvelle page
  const curtainInitial: { clipPath: string } = isInitialMount
    ? { clipPath: "inset(100% 0 0% 0)" }
    : { clipPath: "inset(0 0 0% 0)" };

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="relative">
        {children}

        {/*
         * Overlay rideau — calque indépendant qui se superpose au contenu.
         *
         * Séquençage des transitions :
         *   1. Sortie (ancienne page) : exit={clipPath: inset(0 0 0% 0)}
         *      Le rideau passe de caché (inset 100% en haut) à visible (0% en haut)
         *      → il se ferme sur l'ancienne page
         *
         *   2. Entrée (nouvelle page) : initial → animate
         *      initial = rideau fermé (inset 0% en haut = 100% visible)
         *      animate = rideau s'ouvre (inset 100% en haut = caché)
         *      → il s'ouvre pour révéler la nouvelle page
         */}
        <motion.div
          className="pointer-events-none fixed inset-0 z-[9999]"
          initial={curtainInitial}
          animate={{ clipPath: "inset(100% 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{
            duration: CURTAIN_DURATION,
            ease: EASE,
          }}
          style={{
            background:
              "linear-gradient(160deg, #22314A 0%, #2C3E5C 45%, #3A4F70 100%)",
          }}
        >
          {/* Halo doré central — signature visuelle Gala */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(217,169,86,0.18) 0%, rgba(217,169,86,0.06) 40%, transparent 70%)",
            }}
          />

          {/* Ligne de lumière horizontale — effet rideau de scène */}
          <motion.div
            className="absolute inset-x-0 h-px"
            initial={{ top: "0%", opacity: 0 }}
            animate={{ top: "100%", opacity: [0, 0.7, 0] }}
            exit={{ opacity: 0 }}
            transition={{
              duration: CURTAIN_DURATION,
              ease: EASE,
            }}
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(217,169,86,0.5) 20%, rgba(255,255,255,0.35) 50%, rgba(217,169,86,0.5) 80%, transparent)",
              boxShadow: "0 0 16px 3px rgba(217,169,86,0.15)",
            }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
