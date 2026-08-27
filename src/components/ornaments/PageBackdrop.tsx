"use client";
import { useId } from "react";

export function PageBackdrop() {
  const uid = useId().replace(/:/g, "");
  const pat = `leaf-${uid}`;
  const mask = `edge-${uid}`;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Dégradé ivoire → bleu pâle */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, var(--ivoire) 0%, var(--ivoire) 12%, #EFF6FC 45%, var(--bleu-pale) 100%)",
        }}
      />

      {/* Motif végétal, visible seulement près des bords */}
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <defs>
          <pattern id={pat} width="180" height="220" patternUnits="userSpaceOnUse">
            {/* tige */}
            <path
              d="M90 10 C 78 60, 102 110, 90 170 C 84 195, 90 205, 90 215"
              fill="none"
              stroke="var(--vert-moyen)"
              strokeWidth="1.1"
            />
            {/* feuilles alternées */}
            <path d="M90 46 C 66 38, 54 52, 62 70 C 78 76, 90 64, 90 46 Z" fill="var(--vert-pale)" />
            <path d="M90 92 C 114 84, 126 98, 118 116 C 102 122, 90 110, 90 92 Z" fill="var(--vert-pale)" />
            <path d="M90 138 C 66 130, 54 144, 62 162 C 78 168, 90 156, 90 138 Z" fill="var(--vert-pale)" />
            {/* fleur */}
            <g transform="translate(90 186)">
              {[0, 72, 144, 216, 288].map((a) => (
                <ellipse
                  key={a}
                  cx="0"
                  cy="-11"
                  rx="6.5"
                  ry="11"
                  fill="var(--rose-moyen)"
                  transform={`rotate(${a})`}
                />
              ))}
              <circle r="3.4" fill="var(--or-moyen)" />
            </g>
          </pattern>

          {/* Masque : opaque sur les bords, transparent au centre */}
          <radialGradient id={mask} cx="50%" cy="45%" r="72%">
            <stop offset="35%" stopColor="#000" />
            <stop offset="72%" stopColor="#777" />
            <stop offset="100%" stopColor="#fff" />
          </radialGradient>
          <mask id={`m-${uid}`}>
            <rect width="100%" height="100%" fill={`url(#${mask})`} />
          </mask>
        </defs>

        <rect width="100%" height="100%" fill={`url(#${pat})`} mask={`url(#m-${uid})`} opacity="0.16" />
      </svg>

      {/* Voile pour adoucir le centre */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(60% 50% at 50% 42%, rgba(255,253,248,.75), transparent 70%)" }}
      />
    </div>
  );
}
