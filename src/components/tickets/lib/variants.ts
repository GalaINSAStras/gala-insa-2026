export type TicketVariant = "etudiant" | "prevente" | "normal";

export interface TicketTheme {
  bgFrom: string;
  bgTo: string;
  border: string;
  innerFrame: string;
  frieze: string;
  watermark: string;
  divider: string;
  glowRgb: string;
}

export const TICKET_THEMES: Record<TicketVariant, TicketTheme> = {
  etudiant: {
    bgFrom: "#DCEBE0",
    bgTo: "#EDF5EE",
    border: "var(--or-moyen)",
    innerFrame: "var(--vert-moyen)",
    frieze: "var(--vert-moyen)",
    watermark: "var(--vert-moyen)",
    divider: "var(--or-fonce)",
    glowRgb: "127,184,120",
  },
  prevente: {
    bgFrom: "#E6EBF3",
    bgTo: "#F2F5FA",
    border: "var(--bleu-moyen)",
    innerFrame: "var(--bleu-moyen)",
    frieze: "var(--bleu-moyen)",
    watermark: "var(--bleu-moyen)",
    divider: "var(--or-fonce)",
    glowRgb: "175,198,227",
  },
  normal: {
    bgFrom: "#FBE9CE",
    bgTo: "#FDF6E8",
    border: "var(--or-fonce)",
    innerFrame: "var(--or-moyen)",
    frieze: "var(--or-moyen)",
    watermark: "var(--or-moyen)",
    divider: "var(--or-fonce)",
    glowRgb: "214,154,45",
  },
};
