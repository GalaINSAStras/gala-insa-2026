"use client";

import Image from "next/image";
import { motion } from "motion/react";

/** Easing cinématique — courbe de Bézier prestige (identique à template.tsx) */
const EASE = [0.76, 0, 0.24, 1] as const;

/**
 * Logo animé du preloader — révélé par un balayage circulaire,
 * surmonté d'un halo doré pulsant et d'une fine barre de progression.
 */
export function LogoReveal() {
  return (
    <div className="relative flex flex-col items-center">
      {/* Halo doré pulsant derrière le logo */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-full blur-[70px]"
        style={{
          background:
            "radial-gradient(circle, rgba(201,167,107,0.38) 0%, rgba(201,167,107,0) 68%)",
        }}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: [0, 0.9, 0.55], scale: [0.7, 1.15, 1] }}
        transition={{ duration: 2.2, ease: EASE, times: [0, 0.55, 1] }}
      />

      {/* Logo révélé par clip-path circulaire */}
      <motion.div
        initial={{ clipPath: "circle(0% at 50% 50%)", opacity: 0, scale: 1.08 }}
        animate={{ clipPath: "circle(75% at 50% 50%)", opacity: 1, scale: 1 }}
        transition={{
          clipPath: { duration: 1.5, ease: EASE },
          opacity: { duration: 0.6 },
          scale: { duration: 1.8, ease: EASE },
        }}
        className="w-[min(74vw,460px)]"
      >
        <Image
          src="/logo/gala-2026.svg"
          alt="Logo du Gala INSA Strasbourg 2026"
          width={900}
          height={900}
          priority
          className="h-auto w-full select-none"
        />
      </motion.div>

      {/* Barre de progression fine sous le logo */}
      <motion.div
        aria-hidden
        className="mt-10 h-[2px] w-[min(52vw,260px)] overflow-hidden rounded-full bg-[rgba(201,167,107,0.18)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <motion.div
          className="h-full w-full origin-left bg-[linear-gradient(90deg,transparent,var(--or-moyen),var(--or-clair),var(--or-moyen),transparent)]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
        />
      </motion.div>
    </div>
  );
}
