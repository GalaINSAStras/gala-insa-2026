"use client";

import Link from "next/link";
import { useId, type ReactNode } from "react";
import {
  DEFAULT_GEOM,
  SMALL_GEOM,
  buildCartouchePath,
  buildClipPolygon,
  type CartoucheGeom,
} from "./lib/cartouchePath";
import { ButtonFleuron } from "./ButtonFleuron";

type Variant = "primary" | "secondary";
type Size = "md" | "sm";

type Props = {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  external?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  "aria-label"?: string;
};

const SURFACE: Record<Variant, string> = {
  primary: "bg-[var(--ardoise)]",
  secondary:
    "bg-[linear-gradient(180deg,var(--sauge-clair)_0%,var(--sauge)_100%)]",
};

const LABEL_COLOR: Record<Variant, string> = {
  primary: "text-[#F5F0E4]",
  secondary: "text-[var(--sauge-texte)]",
};

const GEOM: Record<Size, CartoucheGeom> = {
  md: DEFAULT_GEOM,
  sm: SMALL_GEOM,
};

export function CartoucheButton({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  external = false,
  disabled = false,
  onClick,
  type = "button",
  "aria-label": ariaLabel,
}: Props) {
  const uid = useId().replace(/:/g, "");
  const geom = GEOM[size];
  const clip = buildClipPolygon(geom);

  const outer = buildCartouchePath(geom);
  const inner = buildCartouchePath({ ...geom, inset: 4, cut: geom.cut - 3 });

  const fleuronBox = size === "sm" ? "h-[18px] w-[18px]" : "h-[26px] w-[26px]";
  const fleuronLeft = size === "sm" ? "left-[-6px]" : "left-[-9px]";
  const fleuronRight = size === "sm" ? "right-[-6px]" : "right-[-9px]";

  const padding =
    size === "sm"
      ? "px-[clamp(1.2rem,2.5vw,2rem)] py-[clamp(.55rem,1.1vw,.72rem)]"
      : "px-[clamp(2rem,5vw,3.2rem)] py-[clamp(.95rem,2.2vw,1.15rem)]";

  const labelSize =
    size === "sm"
      ? "text-[clamp(.72rem,1.15vw,.88rem)]"
      : "text-[clamp(.9rem,2vw,1.08rem)]";

  const base = `group relative isolate inline-flex items-center justify-center
    ${padding}
    transition-transform duration-300 ease-out
    hover:-translate-y-[2px] active:translate-y-0
    focus-visible:outline-none
    disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0
    ${className}`;

  const content = (
    <>
      {/* ── Surface colorée, découpée ── */}
      <span
        aria-hidden
        className={`absolute inset-0 ${SURFACE[variant]}`}
        style={{ clipPath: clip, WebkitClipPath: clip }}
      />

      {/* ── Ombre portée nette (plaque gravée) ── */}
      <span
        aria-hidden
        className="absolute inset-0 -z-10 translate-y-[3px] bg-[rgba(34,49,74,.28)]
                   blur-[3px] transition-all duration-300
                   group-hover:translate-y-[5px] group-hover:blur-[5px]"
        style={{ clipPath: clip, WebkitClipPath: clip }}
      />

      {/* ── Double liseré doré ── */}
      <svg
        aria-hidden
        viewBox={`0 0 ${geom.width} ${geom.height}`}
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      >
        <defs>
          <linearGradient id={`gold-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--or-clair)" />
            <stop offset="45%" stopColor="var(--or-moyen)" />
            <stop offset="100%" stopColor="var(--or-fonce)" />
          </linearGradient>
        </defs>

        {/* liseré extérieur épais */}
        <path
          d={outer}
          fill="none"
          stroke={`url(#gold-${uid})`}
          strokeWidth="2.4"
          vectorEffect="non-scaling-stroke"
          className="transition-[stroke-width] duration-300 group-hover:[stroke-width:3]"
        />
        {/* liseré intérieur fin */}
        <path
          d={inner}
          fill="none"
          stroke="var(--or-moyen)"
          strokeWidth="0.9"
          opacity=".72"
          vectorEffect="non-scaling-stroke"
          transform="translate(4 4)"
        />
      </svg>

      {/* ── Reflet interne haut ── */}
      <span
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,.22)_0%,transparent_38%)]"
        style={{ clipPath: clip, WebkitClipPath: clip }}
      />

      {/* ── Fleurons sur les encoches latérales ── */}
      <ButtonFleuron
        className={`pointer-events-none absolute top-1/2 -translate-y-1/2 drop-shadow-[0_1px_2px_rgba(34,49,74,.35)] ${fleuronBox} ${fleuronLeft}`}
      />
      <ButtonFleuron
        className={`pointer-events-none absolute top-1/2 -translate-y-1/2 drop-shadow-[0_1px_2px_rgba(34,49,74,.35)] ${fleuronBox} ${fleuronRight}`}
      />

      {/* ── Libellé ── */}
      <span
        className={`relative font-titre font-semibold tracking-[.08em] ${labelSize} ${
          LABEL_COLOR[variant]
        } ${
          variant === "primary"
            ? "[text-shadow:0_1px_1px_rgba(0,0,0,.18)]"
            : ""
        }`}
      >
        {children}
      </span>

      {/* ── Anneau de focus au tracé du cartouche ── */}
      <span
        aria-hidden
        className="absolute -inset-[5px] opacity-0 ring-2 ring-[var(--or-fonce)]
                   transition-opacity group-focus-visible:opacity-100"
        style={{ clipPath: clip, WebkitClipPath: clip }}
      />
    </>
  );

  if (href && !disabled && external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className={base}
      >
        {content}
      </a>
    );
  }

  if (href && !disabled) {
    return (
      <Link href={href} aria-label={ariaLabel} className={base}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={base}
    >
      {content}
    </button>
  );
}
