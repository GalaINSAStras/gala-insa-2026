export function WatermarkLeaves({ color }: { color: string }) {
  return (
    <g opacity="0.07" stroke={color} strokeWidth="1.1" fill="none">
      <path d="M70 150 C 120 130, 170 160, 200 210 C 150 220, 95 200, 70 150 Z" />
      <path d="M70 150 C 110 175, 150 195, 200 210" strokeWidth="0.7" />
      <path d="M300 340 C 350 320, 400 350, 425 400 C 375 410, 325 390, 300 340 Z" />
      <path d="M300 340 C 340 365, 380 385, 425 400" strokeWidth="0.7" />
      <path d="M120 430 C 160 415, 205 440, 225 480 C 182 488, 140 470, 120 430 Z" />
      <path d="M340 90 C 375 78, 412 100, 428 132 C 393 139, 356 122, 340 90 Z" />
    </g>
  );
}
