import type { AnchorHTMLAttributes } from "react";

type PdfLinkProps = {
  /** URL du PDF (route /documents/<nom d'origine>, repli CDN Sanity) */
  href: string;
  /** Libellé affiché sur le lien */
  label: string;
} & Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "children" | "className" | "target" | "rel"
>;

/**
 * Lien qui ouvre un PDF dans un nouvel onglet (visu navigateur), sous son nom d'origine.
 * Style identique au bouton "Voir l'itinéraire" de la page Infos pratiques.
 */
export function PdfLink({ href, label, ...props }: PdfLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 md:px-6 md:py-3 text-sm md:text-base font-medium text-foreground hover:bg-muted transition-colors"
      {...props}
    >
      <svg
        className="w-4 h-4 md:w-5 md:h-5 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
        />
      </svg>
      {label}
    </a>
  );
}
