/**
 * Surcouche de grain (feTurbulence) — texture « papier / feuille d'or ».
 * Le filtre #gala-grain est défini UNE fois dans le layout, ce qui garantit
 * un rendu fiable (élément SVG du DOM, pas de data-URI que le build pourrait casser).
 * Le parent doit être positionné et avoir overflow-hidden (clip aux bords arrondis).
 */
export function Grain({
  className = "",
  opacity = 0.22,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <svg
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      width="100%"
      height="100%"
    >
      <rect
        width="100%"
        height="100%"
        filter="url(#gala-grain)"
        opacity={opacity}
        style={{ mixBlendMode: "multiply" }}
      />
    </svg>
  );
}
