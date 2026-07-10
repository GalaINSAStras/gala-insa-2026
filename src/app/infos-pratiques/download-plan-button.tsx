"use client";

/**
 * Bouton "Télécharger le plan" — pour l'instant sans action.
 * Sera câblé plus tard avec le téléchargement du PDF.
 *
 * Style identique au bouton "Voir l'itinéraire" de map-section.tsx.
 */
export function DownloadPlanButton() {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 md:px-6 md:py-3 text-sm md:text-base font-medium text-foreground hover:bg-muted transition-colors"
      onClick={() => {}}
    >
      <svg
        className="w-4 h-4 md:w-5 md:h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
        />
      </svg>
      Télécharger le plan
    </button>
  );
}