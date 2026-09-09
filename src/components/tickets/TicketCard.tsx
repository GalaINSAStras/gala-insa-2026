"use client";

import { motion, useReducedMotion } from "motion/react";
import { TicketShape } from "./TicketShape";
import { FloralCorner } from "./ornaments/FloralCorner";
import { Divider } from "./ornaments/Divider";
import { TICKET_THEMES, type TicketVariant } from "./lib/variants";
import { DEFAULT_GEOMETRY, type TicketGeometry } from "./lib/ticketPath";
import { CartoucheButton } from "@/components/ui/CartoucheButton";

const EASE = [0.22, 0.61, 0.36, 1] as const;

export interface TicketCardProps {
  /** Identifiant stable (clé React). */
  id?: string;
  variant: TicketVariant;
  title: string;
  price: number;
  currency?: string;
  description: string;
  quantityLabel: string;
  ctaLabel?: string;
  href?: string;
  onSelect?: () => void;
  disabled?: boolean;
  soldOut?: boolean;
  badge?: string;
  geometry?: Partial<TicketGeometry>;
  className?: string;
  /** Délai d'apparition (secondes) pour la cascade. */
  delay?: number;
}

export function TicketCard({
  variant,
  title,
  price,
  currency = "€",
  description,
  quantityLabel,
  ctaLabel = "RÉSERVER",
  href,
  onSelect,
  disabled = false,
  soldOut = false,
  badge,
  geometry,
  className = "",
  delay = 0,
}: TicketCardProps) {
  const theme = TICKET_THEMES[variant];
  const geo: TicketGeometry = { ...DEFAULT_GEOMETRY, ...geometry };
  const reduceMotion = useReducedMotion();
  const isLocked = disabled || soldOut;

  const isAnchor = Boolean(href) && !isLocked;
  const isExternal = href ? /^https?:\/\//.test(href) : false;
  const ariaLabel = `${soldOut ? "COMPLET" : ctaLabel} — ${title}, ${price} ${currency}`;

  return (
    <motion.article
      className={`group relative isolate drop-shadow-[0_10px_22px_rgba(63,91,118,.08)] ${className}`}
      style={{ aspectRatio: `${geo.width} / ${geo.height}` }}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.65, ease: EASE, delay }}
      whileHover={reduceMotion || isLocked ? undefined : { y: -6 }}
    >
      {/* Halo au survol */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(60% 60% at 50% 55%, rgba(${theme.glowRgb},0.30), transparent 70%)`,
        }}
      />

      {/* Silhouette vectorielle */}
      <TicketShape geometry={geo} theme={theme} />

      {/* Bouquet floral bas-droit */}
      <FloralCorner className="pointer-events-none absolute bottom-0 right-0 h-[62%] w-auto translate-x-[6%] translate-y-[2%] transition-transform duration-700 group-hover:-translate-y-[1%]" />

      {/* Badge optionnel */}
      {badge && (
        <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orFonce bg-ardoise px-4 py-1 font-titre text-[0.68rem] uppercase tracking-[0.16em] text-jaunePale shadow-sm">
          {badge}
        </span>
      )}

      {/* Contenu */}
      <div className="relative flex h-full flex-col items-center px-[13%] pb-[9%] pt-[11%] text-center text-ardoise">
        <h3 className="font-heading text-[clamp(1.15rem,2.1vw,1.6rem)] uppercase leading-tight tracking-[0.08em]">
          {title}
        </h3>

        <div className="mt-3 w-[62%] max-w-[170px]">
          <Divider color={theme.divider} />
        </div>

        <p className="mt-[8%] font-garamond text-[clamp(2.4rem,5.4vw,3.5rem)] leading-none">
          <span className="tabular-nums">{price}</span>
          <span className="ml-2 text-[0.62em] align-baseline">{currency}</span>
        </p>

        <div className="mt-[8%] space-y-1 font-garamond text-[clamp(0.82rem,1.3vw,1rem)] leading-relaxed">
          <p className="line-clamp-2">{description}</p>
          <p className="line-clamp-1 opacity-80">{quantityLabel}</p>
        </div>

        <div className="mt-auto pt-[8%]">
          <CartoucheButton
            size="sm"
            href={isAnchor ? href : undefined}
            external={isAnchor && isExternal}
            onClick={onSelect}
            disabled={isLocked}
            aria-label={ariaLabel}
          >
            {soldOut ? "COMPLET" : ctaLabel}
          </CartoucheButton>
        </div>
      </div>
    </motion.article>
  );
}
