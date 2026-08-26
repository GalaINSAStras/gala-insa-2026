interface FloralCornerProps {
  className?: string;
  petal?: string;
  petalDeep?: string;
  leaf?: string;
  leafDeep?: string;
  stem?: string;
  heart?: string;
}

export function FloralCorner({
  className,
  petal = "#FBDDE4",
  petalDeep = "#F4BECB",
  leaf = "#CFE4CB",
  leafDeep = "#A8CBA2",
  stem = "#8FB588",
  heart = "#E8B94F",
}: FloralCornerProps) {
  return (
    <svg
      viewBox="0 -6 220 306"
      className={className}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMaxYMax meet"
    >
      {/* Tiges */}
      <g stroke={stem} fill="none" strokeLinecap="round">
        <path d="M40 296 C 78 246, 104 190, 116 122" strokeWidth="2.6" />
        <path d="M116 122 C 120 88, 132 58, 152 34" strokeWidth="2" />
        <path d="M84 250 C 104 226, 118 200, 124 172" strokeWidth="1.6" opacity="0.85" />
        <path d="M60 278 C 44 258, 30 244, 14 236" strokeWidth="1.6" opacity="0.8" />
      </g>

      {/* Feuilles */}
      <g>
        {[
          { d: "M116 122 C 96 108, 84 86, 88 62 C 108 74, 120 98, 116 122 Z", r: 0 },
          { d: "M116 122 C 138 112, 158 116, 170 132 C 148 142, 126 138, 116 122 Z", r: 0 },
          { d: "M124 172 C 106 164, 94 146, 96 126 C 114 138, 126 156, 124 172 Z", r: 0 },
          { d: "M84 250 C 66 244, 54 228, 56 210 C 74 220, 86 236, 84 250 Z", r: 0 },
          { d: "M152 34 C 140 22, 138 6, 146 -4 C 158 8, 162 24, 152 34 Z", r: 0 },
        ].map((l, i) => (
          <path
            key={i}
            d={l.d}
            fill={i % 2 ? leafDeep : leaf}
            stroke={stem}
            strokeWidth="0.9"
            opacity="0.95"
          />
        ))}
      </g>

      {/* Grande fleur (5 pétales) */}
      <g transform="translate(74 236)">
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse
            key={a}
            cx="0"
            cy="-26"
            rx="19"
            ry="27"
            fill={petal}
            stroke={petalDeep}
            strokeWidth="1"
            transform={`rotate(${a})`}
          />
        ))}
        <circle cx="0" cy="0" r="7.5" fill={heart} opacity="0.55" />
        <circle cx="0" cy="0" r="4" fill={heart} />
      </g>

      {/* Fleur moyenne */}
      <g transform="translate(146 92) scale(0.62)">
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse
            key={a}
            cx="0"
            cy="-24"
            rx="17"
            ry="25"
            fill={petal}
            stroke={petalDeep}
            strokeWidth="1.2"
            transform={`rotate(${a})`}
          />
        ))}
        <circle cx="0" cy="0" r="6" fill={heart} />
      </g>
    </svg>
  );
}
