export function Fleuron({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 48 12" className={className}>
      <path d="M0 6 H14" stroke="var(--or-moyen)" strokeWidth="1" />
      <path d="M34 6 H48" stroke="var(--or-moyen)" strokeWidth="1" />
      <path d="M24 1 L27 6 L24 11 L21 6 Z" fill="var(--or-fonce)" />
      <circle cx="17" cy="6" r="1.4" fill="var(--or-moyen)" />
      <circle cx="31" cy="6" r="1.4" fill="var(--or-moyen)" />
    </svg>
  );
}
