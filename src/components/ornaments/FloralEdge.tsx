type Props = { className?: string; flipX?: boolean; flipY?: boolean; scale?: number };

export function FloralEdge({ className, flipX, flipY, scale = 1 }: Props) {
  const t = [flipX && "scaleX(-1)", flipY && "scaleY(-1)", `scale(${scale})`]
    .filter(Boolean)
    .join(" ");

  return (
    <svg
      aria-hidden
      viewBox="0 0 200 200"
      className={className}
      style={{ transform: t, transformOrigin: "center" }}
    >
      {/* branche maîtresse */}
      <path
        d="M4 196 C 40 178, 62 150, 78 116 C 94 82, 112 52, 148 30"
        fill="none"
        stroke="var(--vert-moyen)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M4 196 C 34 160, 40 122, 36 84"
        fill="none"
        stroke="var(--vert-moyen)"
        strokeWidth="1.5"
        opacity=".7"
      />

      {/* feuillage */}
      {[
        { x: 70, y: 122, r: -22, s: 1.05 },
        { x: 96, y: 88, r: 14, s: 0.9 },
        { x: 40, y: 150, r: -48, s: 0.85 },
        { x: 124, y: 56, r: 32, s: 0.8 },
      ].map((l, i) => (
        <path
          key={i}
          d="M0 0 C -22 -8, -34 8, -26 26 C -8 32, 2 18, 0 0 Z"
          fill="var(--vert-pale)"
          stroke="var(--vert-moyen)"
          strokeWidth=".8"
          transform={`translate(${l.x} ${l.y}) rotate(${l.r}) scale(${l.s})`}
        />
      ))}

      {/* fleurs */}
      {[
        { x: 46, y: 168, s: 1.15 },
        { x: 88, y: 108, s: 0.82 },
        { x: 136, y: 40, s: 0.68 },
      ].map((f, i) => (
        <g key={i} transform={`translate(${f.x} ${f.y}) scale(${f.s})`}>
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse
              key={a}
              cx="0"
              cy="-15"
              rx="9"
              ry="15"
              fill="var(--blush)"
              stroke="var(--rose-moyen)"
              strokeWidth="1"
              transform={`rotate(${a})`}
            />
          ))}
          <circle r="4.5" fill="var(--or-moyen)" />
        </g>
      ))}

      {/* boutons */}
      {[{ x: 116, y: 78 }, { x: 62, y: 142 }].map((b, i) => (
        <g key={i} transform={`translate(${b.x} ${b.y})`}>
          <ellipse rx="4.5" ry="8" fill="var(--blush)" stroke="var(--rose-moyen)" strokeWidth=".9" />
          <path d="M0 8 C -3 14, 3 14, 0 8" fill="var(--vert-pale)" stroke="var(--vert-moyen)" strokeWidth=".8" />
        </g>
      ))}
    </svg>
  );
}
