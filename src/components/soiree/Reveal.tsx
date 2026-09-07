"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Délai en secondes (pour les staggers) */
  delay?: number;
  /** Translation verticale initiale en px */
  y?: number;
  className?: string;
};

/**
 * Wrapper d'animation d'apparition :
 * fade + translateY(24px), déclenché à 20% de visibilité.
 * Respecte strictement `prefers-reduced-motion`.
 */
export function Reveal({ children, delay = 0, y = 24, className }: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
