"use client";

import { motion } from "motion/react";
import type { LineupItem } from "@/lib/sanity/types";

/**
 * Composant client pour la grille Line-Up avec animations motion.dev
 */
export function SoireeClient({ lineup }: { lineup: LineupItem[] }) {
  if (!lineup.length) {
    return (
      <p className="mt-8 text-muted-foreground italic">
        La programmation sera bientôt dévoilée.
      </p>
    );
  }

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {lineup.map((artist, i) => (
        <motion.div
          key={artist._id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
          className="group relative rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-gala-primary/10 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-gala-primary">
                {artist.artistName.charAt(0)}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              {artist.artistName}
            </h3>
            {artist.genre && (
              <span className="mt-1 inline-block rounded-full bg-gala-primary/10 px-3 py-0.5 text-xs font-medium text-gala-primary">
                {artist.genre}
              </span>
            )}
            {artist.stageTime && (
              <p className="mt-2 text-sm text-muted-foreground">
                {artist.stageTime}
              </p>
            )}
            {artist.description && (
              <p className="mt-3 text-xs text-muted-foreground/80 leading-relaxed line-clamp-3">
                {artist.description}
              </p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}