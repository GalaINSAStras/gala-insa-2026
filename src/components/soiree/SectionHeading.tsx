type SectionHeadingProps = {
  /** Sur-titre en petites capitales dorées (ex : « Édition 2026 ») */
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
};

/**
 * En-tête de section — sur-titre doré encadré de filets,
 * titre Renaissance, séparé du contenu par des fleurons.
 */
export function SectionHeading({
  kicker,
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  const alignClass =
    align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col ${alignClass}`}>
      {kicker && (
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="h-px w-8 bg-gradient-to-r from-transparent to-[var(--or-moyen)]"
          />
          <span className="font-titre text-[clamp(.7rem,1.4vw,.85rem)] font-semibold uppercase tracking-[.28em] text-[var(--or-fonce)]">
            {kicker}
          </span>
          <span
            aria-hidden
            className="h-px w-8 bg-gradient-to-l from-transparent to-[var(--or-moyen)]"
          />
        </div>
      )}

      <h2 className="mt-3 font-titre text-[clamp(2rem,5vw,3.25rem)] leading-[1.05] tracking-[-0.02em] text-marine">
        {title}
      </h2>

      {subtitle && (
        <p
          className={`mt-4 max-w-2xl text-sm text-ardoise/80 leading-relaxed sm:text-base ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
