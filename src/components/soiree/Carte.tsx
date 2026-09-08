import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { Fleuron } from "@/components/hero/Fleuron";
import type { CarteCategory } from "@/lib/sanity/types";
import { Grain } from "@/components/ornaments/Grain";

/**
 * « La Carte » — deux panneaux « ardoise de bar » (Alcools / Softs),
 * fond crème texturé, cadre doré fin, filets pointillés reliant nom et prix.
 */
export function Carte({ carte }: { carte: CarteCategory[] }) {
  if (!carte || carte.length === 0) return null;

  return (
    <section className="relative bg-ivoire py-[clamp(3rem,7vw,6rem)]">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="À boire"
          title="La Carte"
          subtitle="Les boissons proposées tout au long de la soirée."
        />

        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          {carte.map((cat, i) => (
            <Reveal key={cat._key} delay={i * 0.08}>
              <div
                className="relative h-full overflow-hidden rounded-2xl p-8 shadow-[0_8px_28px_rgba(63,91,118,.12)]"
                style={{
                  border: "2px solid transparent",
                  background:
                    "linear-gradient(180deg,#FFFDF8,#FBF3E3) padding-box, linear-gradient(120deg,#F6E3B8,#D9A956 30%,#FDF0D0 48%,#B8893C 62%,#E8CFA0 80%,#D9A956) border-box",
                }}
              >
                <Grain opacity={0.22} />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-2 rounded-xl border border-[var(--or-clair)]/40"
                />
                <header className="relative text-center">
                  {cat.title && (
                    <h3 className="font-heading text-2xl text-marine">
                      {cat.title}
                    </h3>
                  )}
                  <Fleuron className="mx-auto mt-2 h-3 w-16" />
                </header>
                <ul className="relative mt-6 space-y-3">
                  {(cat.items ?? []).map((item) => (
                    <li key={item._key}>
                      <div className="flex items-baseline gap-2">
                        <span className="font-garamond font-semibold italic text-marine">{item.name}</span>
                        {item.format && (
                          <span className="text-sm text-ardoise/60">
                            ({item.format})
                          </span>
                        )}
                        <span
                          aria-hidden
                          className="mx-1 flex-1 border-b border-dotted border-[var(--or-moyen)]/50"
                        />
                        <span className="whitespace-nowrap font-garamond text-lg font-semibold text-[var(--or-fonce)] tabular-nums">
                          {item.price} €
                        </span>
                      </div>
                      {item.glassPrice != null && (
                        <p className="mt-0.5 text-sm text-ardoise/60">
                          Au verre (12 cl) — {item.glassPrice} €
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-ardoise/60">
          L&rsquo;abus d&rsquo;alcool est dangereux pour la santé. À consommer
          avec modération.
        </p>
      </div>
    </section>
  );
}
