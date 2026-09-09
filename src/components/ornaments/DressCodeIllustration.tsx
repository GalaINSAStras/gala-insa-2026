type Props = { className?: string };

/** Illustration éditoriale d'une tenue de gala, utilisée en visuel de secours. */
export function DressCodeIllustration({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 240 240" className={className} aria-hidden>
      <defs>
        <linearGradient id="dress-paper" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--ivoire)" />
          <stop offset="1" stopColor="var(--jaune-pale)" />
        </linearGradient>
        <linearGradient id="dress-marine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--marine-clair)" />
          <stop offset="1" stopColor="var(--marine-fonce)" />
        </linearGradient>
      </defs>
      <circle cx="120" cy="120" r="108" fill="var(--bleu-pale)" opacity=".48" />
      <path d="M31 178 C48 54 192 31 210 178" fill="url(#dress-paper)" opacity=".88" />
      <path d="M31 178 C48 54 192 31 210 178" fill="none" stroke="var(--or-moyen)" strokeWidth="1.2" />
      <path d="M43 178 C58 70 182 49 198 178" fill="none" stroke="var(--or-clair)" strokeWidth=".8" />
      <path d="M78 91 L58 108 L44 181 H196 L182 108 L162 91 L148 80 H92 Z" fill="url(#dress-marine)" stroke="var(--or-fonce)" strokeWidth="1.5" />
      <path d="M91 80 L120 112 L149 80 L139 70 H101 Z" fill="var(--ivoire)" stroke="var(--or-fonce)" strokeWidth="1.2" />
      <path d="M91 80 L120 112 L106 127 L78 91 Z" fill="var(--bleu-moyen)" stroke="var(--or-clair)" strokeWidth="1" />
      <path d="M149 80 L120 112 L134 127 L162 91 Z" fill="var(--bleu-moyen)" stroke="var(--or-clair)" strokeWidth="1" />
      <path d="M120 94 L105 86 Q91 87 91 96 Q96 104 120 99 Z" fill="var(--marine-fonce)" stroke="var(--or-fonce)" strokeWidth="1.1" />
      <path d="M120 94 L135 86 Q149 87 149 96 Q144 104 120 99 Z" fill="var(--marine-fonce)" stroke="var(--or-fonce)" strokeWidth="1.1" />
      <rect x="116" y="91" width="8" height="11" rx="2" fill="var(--or-moyen)" />
      <path d="M120 113 V178" stroke="var(--or-clair)" strokeWidth=".8" opacity=".8" />
      {[128, 145, 162].map((y) => <circle key={y} cx="120" cy={y} r="2" fill="var(--or-moyen)" stroke="var(--or-fonce)" strokeWidth=".6" />)}
      <path d="M151 139 H176 L166 148 H151 Z" fill="var(--bleu-moyen)" stroke="var(--or-clair)" strokeWidth=".8" />
      <path d="M93 111 C82 124 77 132 74 145" fill="none" stroke="var(--vert-moyen)" strokeWidth="1.4" />
      <ellipse cx="81" cy="128" rx="5" ry="10" fill="var(--vert-pale)" stroke="var(--vert-moyen)" strokeWidth=".8" transform="rotate(-35 81 128)" />
      <g transform="translate(75 146)">
        {[0, 72, 144, 216, 288].map((angle) => <ellipse key={angle} cx="0" cy="-5" rx="4" ry="7" fill="var(--blush)" stroke="var(--rose-moyen)" strokeWidth=".7" transform={`rotate(${angle})`} />)}
        <circle r="2.5" fill="var(--or-moyen)" />
      </g>
      <path d="M68 185 H172" stroke="var(--or-moyen)" strokeWidth="1" />
      <path d="M111 185 l9 8 9-8" fill="none" stroke="var(--or-fonce)" strokeWidth="1" />
    </svg>
  );
}