"use client";

import { useId } from "react";
import {
  buildTicketPath,
  buildInnerFramePath,
  type TicketGeometry,
} from "./lib/ticketPath";
import type { TicketTheme } from "./lib/variants";
import { VerticalFriezeDef } from "./ornaments/VerticalFrieze";
import { WatermarkLeaves } from "./ornaments/WatermarkLeaves";

interface Props {
  geometry: TicketGeometry;
  theme: TicketTheme;
}

export function TicketShape({ geometry, theme }: Props) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "") || "t";
  const outline = buildTicketPath(geometry);
  const inner = buildInnerFramePath(geometry);
  const { width: w, height: h } = geometry;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`bg-${uid}`} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0%" stopColor={theme.bgFrom} />
          <stop offset="100%" stopColor={theme.bgTo} />
        </linearGradient>

        <linearGradient id={`gold-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--or-moyen)" />
          <stop offset="45%" stopColor={theme.border} />
          <stop offset="100%" stopColor="var(--or-fonce)" />
        </linearGradient>

        <VerticalFriezeDef id={`frieze-${uid}`} color={theme.frieze} />

        <clipPath id={`clip-${uid}`}>
          <path d={outline} />
        </clipPath>
      </defs>

      {/* Fond */}
      <path d={outline} fill={`url(#bg-${uid})`} />

      {/* Contenu clippé dans la silhouette */}
      <g clipPath={`url(#clip-${uid})`}>
        <WatermarkLeaves color={theme.watermark} />

        {/* Frises verticales */}
        <rect
          x="34"
          y="46"
          width="14"
          height={h - 92}
          fill={`url(#frieze-${uid})`}
        />
        <rect
          x={w - 48}
          y="46"
          width="14"
          height={h - 92}
          fill={`url(#frieze-${uid})`}
        />
      </g>

      {/* Cadre intérieur : double filet */}
      <path
        d={inner}
        fill="none"
        stroke={theme.innerFrame}
        strokeWidth="1.1"
        opacity="0.75"
      />
      <path
        d={buildInnerFramePath(geometry, 31)}
        fill="none"
        stroke={theme.innerFrame}
        strokeWidth="0.6"
        opacity="0.45"
      />

      {/* Bordure extérieure dorée */}
      <path
        d={outline}
        fill="none"
        stroke={`url(#gold-${uid})`}
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path
        d={outline}
        fill="none"
        stroke="#fff"
        strokeWidth="0.7"
        opacity="0.35"
        strokeLinejoin="round"
      />
    </svg>
  );
}
