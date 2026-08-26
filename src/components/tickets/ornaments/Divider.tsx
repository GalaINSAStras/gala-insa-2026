export function Divider({
  color = "var(--or-fonce)",
  width = 150,
}: {
  color?: string;
  width?: number;
}) {
  return (
    <svg
      viewBox="0 0 150 12"
      width={width}
      height={12}
      aria-hidden="true"
      className="mx-auto"
      preserveAspectRatio="xMidYMid meet"
    >
      <g stroke={color} strokeWidth="0.85" fill="none" strokeLinecap="round">
        <path d="M2 6 H58" opacity="0.65" />
        <path d="M92 6 H148" opacity="0.65" />
        <path d="M62 6 L68 2.5 L74 6 L68 9.5 Z" fill={color} opacity="0.9" />
        <path d="M76 6 L82 2.5 L88 6 L82 9.5 Z" fill={color} opacity="0.9" />
        <circle cx="75" cy="6" r="1.6" fill={color} stroke="none" />
        <circle cx="58" cy="6" r="1" fill={color} stroke="none" />
        <circle cx="92" cy="6" r="1" fill={color} stroke="none" />
      </g>
    </svg>
  );
}
