type FloralSeparatorProps = {
  className?: string;
};

/**
 * Séparateur floral pleine largeur (separateur2.svg),
 * centré exactement sur la démarcation entre deux sections.
 * Le conteneur fait `h-0` et l'image chevauche la jointure.
 */
export function FloralSeparator({ className = "" }: FloralSeparatorProps) {
  return (
    <div className={`relative z-10 h-0 overflow-visible ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/separateur2.svg"
        alt=""
        aria-hidden="true"
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 max-md:max-w-xl md:max-w-3xl h-16 md:h-24"
      />
    </div>
  );
}
