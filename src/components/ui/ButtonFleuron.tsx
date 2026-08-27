export function ButtonFleuron({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className}>
      {/* losange principal */}
      <path
        d="M12 2 L17 12 L12 22 L7 12 Z"
        fill="var(--or-moyen)"
        stroke="var(--or-fonce)"
        strokeWidth="0.9"
      />
      {/* facette lumineuse */}
      <path
        d="M12 2 L14.5 12 L12 22 L12 2 Z"
        fill="var(--or-clair)"
        opacity=".75"
      />
      {/* pointes latérales */}
      <path
        d="M2 12 L7 9.5 L7 14.5 Z M22 12 L17 9.5 L17 14.5 Z"
        fill="var(--or-moyen)"
        stroke="var(--or-fonce)"
        strokeWidth="0.7"
      />
      {/* cœur */}
      <circle cx="12" cy="12" r="1.7" fill="var(--or-fonce)" />
      <circle cx="11.5" cy="11.4" r="0.6" fill="var(--or-clair)" />
    </svg>
  );
}
