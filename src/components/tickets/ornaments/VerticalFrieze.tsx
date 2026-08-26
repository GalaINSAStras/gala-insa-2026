interface Props {
  id: string;
  color: string;
}

export function VerticalFriezeDef({ id, color }: Props) {
  return (
    <pattern
      id={id}
      width="14"
      height="46"
      patternUnits="userSpaceOnUse"
      className="opacity-55"
    >
      <g stroke={color} strokeWidth="0.9" fill="none" strokeLinecap="round">
        <path d="M7 2 C 2 8, 2 14, 7 20 C 12 26, 12 32, 7 38" />
        <path d="M7 6 C 4 6, 3 4, 3.5 2.5" />
        <path d="M7 6 C 10 6, 11 4, 10.5 2.5" />
        <path d="M7 22 C 4 22, 3 20, 3.5 18.5" />
        <path d="M7 22 C 10 22, 11 20, 10.5 18.5" />
        <circle cx="7" cy="41" r="1.4" fill={color} stroke="none" />
      </g>
    </pattern>
  );
}
