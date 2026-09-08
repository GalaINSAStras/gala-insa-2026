import type { AnchorHTMLAttributes } from "react";

type DownloadPlanButtonProps = {
  /** URL de téléchargement du plan PDF (route /documents/<nom-du-fichier>). */
  href: string;
} & Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "children" | "className" | "download"
>;

/**
 * Lien « Télécharger le plan » — déclenche le téléchargement du PDF du plan
 * servi par /documents/<nom-du-fichier>, enregistré sous son nom d'origine.
 * Style « cartouche secondaire » (liseré doré) cohérent avec la charte.
 */
export function DownloadPlanButton({ href, ...props }: DownloadPlanButtonProps) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-[var(--or-moyen)]/60 bg-white/70 px-5 py-2.5 text-sm md:text-base font-medium text-ardoise transition-colors hover:border-[var(--or-fonce)] hover:text-[var(--or-fonce)]"
      download
      {...props}
    >
      <svg
        className="w-4 h-4 md:w-5 md:h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
        />
      </svg>
      Télécharger le plan
    </a>
  );
}
