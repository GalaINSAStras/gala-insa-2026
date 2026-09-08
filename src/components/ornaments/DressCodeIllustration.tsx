type Props = { className?: string };

/**
 * Illustration « tenue de soirée » — nœud papillon marine & or,
 * boutonnière fleuron et feuilles d'accent, dans la palette Art nouveau
 * (marine, or, rose poudré, sauge). Utilisée comme visuel de secours du
 * code vestimentaire tant qu'aucune image n'est uploadée dans Sanity.
 */
export function DressCodeIllustration({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      {/* Fond pastel + double anneau */}
      <circle cx="100" cy="100" r="88" fill="var(--rose-poudre)" opacity="0.5" />
      <circle cx="100" cy="100" r="72" fill="none" stroke="var(--or-moyen)" strokeWidth="1" opacity="0.65" />
      <circle cx="100" cy="100" r="62" fill="none" stroke="var(--or-clair)" strokeWidth="0.7" opacity="0.7" />

      {/* Boutonnière : petit fleuron au-dessus du nœud */}
      <g transform="translate(100 46)">
        <path d="M0 -9 L8 0 L0 9 L-8 0 Z" fill="var(--or-moyen)" stroke="var(--or-fonce)" strokeWidth="0.9" />
        <circle cx="0" cy="0" r="1.8" fill="var(--or-fonce)" />
      </g>

      {/* Nœud papillon — aile gauche */}
      <path
        d="M100 84 Q 78 78 62 78 Q 47 88 62 100 Q 82 108 100 101 Z"
        fill="var(--marine)"
        stroke="var(--or-fonce)"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      {/* Nœud papillon — aile droite */}
      <path
        d="M100 84 Q 122 78 138 78 Q 153 88 138 100 Q 118 108 100 101 Z"
        fill="var(--marine)"
        stroke="var(--or-fonce)"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      {/* Nœud central */}
      <rect x="93" y="82" width="14" height="22" rx="4" fill="var(--or-moyen)" stroke="var(--or-fonce)" strokeWidth="1" />

      {/* Liseré lumineux sur les ailes */}
      <path d="M100 88 Q 82 84 68 86" fill="none" stroke="var(--or-clair)" strokeWidth="0.9" opacity="0.8" />
      <path d="M100 88 Q 118 84 132 86" fill="none" stroke="var(--or-clair)" strokeWidth="0.9" opacity="0.8" />

      {/* Feuilles d'accent */}
      <path
        d="M100 138 C 82 138, 70 152, 78 164 C 92 170, 100 156, 100 138 Z"
        fill="var(--vert-pale)"
        stroke="var(--vert-moyen)"
        strokeWidth="1"
        opacity="0.9"
      />
      <path
        d="M100 138 C 118 138, 130 152, 122 164 C 108 170, 100 156, 100 138 Z"
        fill="var(--vert-pale)"
        stroke="var(--vert-moyen)"
        strokeWidth="1"
        opacity="0.9"
      />
    </svg>
  );
}
