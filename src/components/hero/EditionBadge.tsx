export function EditionBadge({ edition }: { edition: number }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[var(--or-fonce)]/60 bg-gradient-to-b from-[var(--jaune-pale)] to-[#F6E4B8] px-4 py-1.5 shadow-[0_2px_8px_-3px_rgba(214,154,45,.5)]">
      <span className="font-titre text-[clamp(.72rem,1.5vw,.86rem)] font-semibold tracking-[.16em] text-[#8A6A1F]">
        {edition}
        <sup className="text-[.6em]">e</sup> ÉDITION
      </span>
    </div>
  );
}
