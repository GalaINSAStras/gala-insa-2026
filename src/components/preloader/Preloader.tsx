"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LogoReveal } from "./LogoReveal";

/** Easing cinématique — courbe de Bézier prestige (identique à template.tsx) */
const EASE = [0.76, 0, 0.24, 1] as const;

/** Durée totale de l'animation avant de commencer la sortie */
const HOLD_MS = 2600;

/** Durée de la sortie (fondu vers le site) */
const EXIT_DURATION = 0.7;

/**
 * Écran de chargement initial — overlay plein écran qui révèle le logo
 * puis s'efface pour dévoiler le site.
 *
 * Distinct du rideau inter-pages de `template.tsx` : celui-ci ne s'affiche
 * qu'une seule fois, au tout premier chargement de la session.
 */
export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setExiting(true), HOLD_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!exiting && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: EXIT_DURATION, ease: EASE }}
          style={{
            background:
              "linear-gradient(160deg, #2C3E5C 0%, #3A4F70 45%, #22314A 100%)",
          }}
        >
          {/* Halo doré d'ambiance — signature visuelle Gala */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(217,169,86,0.14) 0%, transparent 70%)",
            }}
          />

          {/* Motif floral décoratif discret */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/ornaments/motif_floral.svg"
            alt=""
            aria-hidden
            className="pointer-events-none absolute -bottom-6 left-0 w-64 object-contain opacity-[0.07]"
          />

          <LogoReveal />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
