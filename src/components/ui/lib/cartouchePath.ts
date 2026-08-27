export type CartoucheGeom = {
  width: number;
  height: number;
  cut: number; // longueur du chanfrein d'angle
  notchW: number; // profondeur de l'encoche latérale
  notchH: number; // hauteur de l'encoche
  inset?: number; // décalage pour le liseré intérieur
};

export const DEFAULT_GEOM: CartoucheGeom = {
  width: 340,
  height: 56,
  cut: 13,
  notchW: 9,
  notchH: 22,
};

export const SMALL_GEOM: CartoucheGeom = {
  width: 220,
  height: 42,
  cut: 9,
  notchW: 6,
  notchH: 16,
};

/**
 * Construit le tracé du cartouche (4 coins coupés + 2 encoches concaves).
 * Le tracé part du coin haut-gauche et tourne dans le sens horaire.
 */
export function buildCartouchePath(g: CartoucheGeom): string {
  const i = g.inset ?? 0;
  const w = g.width - i * 2;
  const h = g.height - i * 2;
  const c = g.cut;
  const nw = g.notchW;
  const nh = g.notchH;

  const midTop = (h - nh) / 2;
  const midBot = (h + nh) / 2;

  return [
    `M ${c} 0`,
    `L ${w - c} 0`,
    `L ${w} ${c}`,
    `L ${w} ${midTop}`,
    `L ${w - nw} ${midTop + nh * 0.22}`,
    `L ${w - nw} ${midBot - nh * 0.22}`,
    `L ${w} ${midBot}`,
    `L ${w} ${h - c}`,
    `L ${w - c} ${h}`,
    `L ${c} ${h}`,
    `L 0 ${h - c}`,
    `L 0 ${midBot}`,
    `L ${nw} ${midBot - nh * 0.22}`,
    `L ${nw} ${midTop + nh * 0.22}`,
    `L 0 ${midTop}`,
    `L 0 ${c}`,
    "Z",
  ].join(" ");
}

/** Version normalisée en % pour `clip-path: polygon()` — pas de JS au runtime. */
export function buildClipPolygon(g: CartoucheGeom): string {
  const cx = (g.cut / g.width) * 100;
  const cy = (g.cut / g.height) * 100;
  const nx = (g.notchW / g.width) * 100;
  const t = 50 - (g.notchH / g.height) * 50;
  const b = 50 + (g.notchH / g.height) * 50;
  const ti = t + (g.notchH / g.height) * 11;
  const bi = b - (g.notchH / g.height) * 11;

  return `polygon(
    ${cx}% 0%, ${100 - cx}% 0%,
    100% ${cy}%, 100% ${t}%,
    ${100 - nx}% ${ti}%, ${100 - nx}% ${bi}%,
    100% ${b}%, 100% ${100 - cy}%,
    ${100 - cx}% 100%, ${cx}% 100%,
    0% ${100 - cy}%, 0% ${b}%,
    ${nx}% ${bi}%, ${nx}% ${ti}%,
    0% ${t}%, 0% ${cy}%
  )`.replace(/\s+/g, " ");
}
