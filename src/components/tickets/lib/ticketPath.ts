export interface TicketGeometry {
  width: number;
  height: number;
  cornerCut: number; // longueur du pan coupé aux 4 angles
  notchRadius: number; // rayon des encoches latérales
  notchAtY?: number; // position verticale (défaut : milieu)
}

export const DEFAULT_GEOMETRY: TicketGeometry = {
  width: 480,
  height: 620,
  cornerCut: 34,
  notchRadius: 26,
};

/**
 * Construit la silhouette du ticket :
 * 4 coins en pan coupé + 2 encoches semi-circulaires latérales.
 * Sens horaire depuis le coin haut-gauche.
 */
export function buildTicketPath(g: TicketGeometry): string {
  const { width: w, height: h, cornerCut: c, notchRadius: r } = g;
  const ny = g.notchAtY ?? h / 2;

  return [
    `M ${c} 0`,
    `L ${w - c} 0`,
    `L ${w} ${c}`, // pan coupé haut-droit
    `L ${w} ${ny - r}`,
    `A ${r} ${r} 0 0 0 ${w} ${ny + r}`, // encoche droite (concave)
    `L ${w} ${h - c}`,
    `L ${w - c} ${h}`, // pan coupé bas-droit
    `L ${c} ${h}`,
    `L 0 ${h - c}`, // pan coupé bas-gauche
    `L 0 ${ny + r}`,
    `A ${r} ${r} 0 0 0 0 ${ny - r}`, // encoche gauche (concave)
    `L 0 ${c}`,
    "Z",
  ].join(" ");
}

/** Cadre intérieur (rectangle simple à coins légèrement coupés) */
export function buildInnerFramePath(g: TicketGeometry, inset = 26): string {
  const { width: w, height: h } = g;
  const c = 12;
  const x0 = inset;
  const y0 = inset;
  const x1 = w - inset;
  const y1 = h - inset;

  return [
    `M ${x0 + c} ${y0}`,
    `L ${x1 - c} ${y0}`,
    `L ${x1} ${y0 + c}`,
    `L ${x1} ${y1 - c}`,
    `L ${x1 - c} ${y1}`,
    `L ${x0 + c} ${y1}`,
    `L ${x0} ${y1 - c}`,
    `L ${x0} ${y0 + c}`,
    "Z",
  ].join(" ");
}
