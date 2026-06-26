// ═══════════════════════════════════════════════════
// 🎨 GALA INSA Strasbourg 2026 — Design Tokens V2
// ═══════════════════════════════════════════════════
// Ce fichier fournit les mappings programmatiques
// des tokens CSS pour utilisation dans les composants.
// ═══════════════════════════════════════════════════

/**
 * Palette maîtresse du Design System V2
 * ─── Couleurs sémantiques principales ───
 */
export const TOKENS = {
  /** Bleu ardoise — Primaire */
  primary: "#5E708E" as const,
  /** Bleu ardoise clair — Hover, Light variant */
  primaryLight: "#BACCE9" as const,
  /** Bleu ardoise foncé — Hover state */
  primaryHover: "#50617C" as const,

  /** Vert sauge — Secondaire */
  secondary: "#9DBE8B" as const,
  /** Vert sauge clair */
  secondaryLight: "#D6EDCF" as const,
  /** Vert sauge foncé — Hover state */
  secondaryHover: "#88AA76" as const,

  /** Ocre doré — Accent (VIP/Packs) */
  accent: "#D9A956" as const,
  /** Ocre doré clair */
  accentLight: "#F3DAA2" as const,
  /** Ocre doré foncé — Hover state */
  accentHover: "#C8963F" as const,

  /** Surfaces */
  surface: {
    /** Crème — fond principal */
    1: "#FFFBF2" as const,
    /** Bleu très clair — fond secondaire */
    2: "#E9F5FF" as const,
    /** Rose très clair — fond tertiaire */
    3: "#FFF2F6" as const,
  },

  /** Couleurs décoratives (fonds, conteneurs, illustrations) */
  decoration: {
    /** Jaune pastel — Highlight */
    highlight: "#F3DAA2" as const,
    /** Rose pastel */
    pink: "#FCD8E4" as const,
    /** Bleu pastel */
    blue: "#BACCE9" as const,
    /** Vert clair */
    green: "#D6EDCF" as const,
  },

  /** Textes */
  text: {
    /** Texte principal — assurer un ratio de contraste 4.5:1 */
    primary: "#2E3342" as const,
    /** Texte secondaire */
    secondary: "#5C6475" as const,
  },

  /** Bordures */
  border: "#E5E7EB" as const,

  /** Ombres estompées Gala */
  shadow: {
    sm: "0 2px 8px rgba(30, 40, 60, 0.05)",
    md: "0 6px 20px rgba(30, 40, 60, 0.08)",
    lg: "0 14px 36px rgba(30, 40, 60, 0.12)",
  },

  /** Rayons de bordure */
  radius: {
    input: "8px",
    card: "16px",
    button: "12px",
    modal: "20px",
  },
} as const;

/**
 * Mapping pour les partenaires (hérité pour compatibilité)
 */
export const PARTNER_TIERS = {
  gold: "#D9A956" as const,     // → Accent
  silver: "#BACCE9" as const,   // → Primary Light
  bronze: "#D6EDCF" as const,   // → Secondary Light
} as const;

/**
 * Configuration des polices
 */
export const FONTS = {
  /** Display — Titres, Branding */
  display: '"Cormorant Garamond", serif',
  /** Body — Corps de texte, UI */
  body: '"Inter", sans-serif',
  /** Mono — Code */
  mono: '"Geist Mono", ui-monospace, monospace',
} as const;