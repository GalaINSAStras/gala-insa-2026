"use client";

import Image from "next/image";
import type { ComponentProps } from "react";
import { motion, useReducedMotion } from "motion/react";
import { PageBackdrop } from "@/components/ornaments/PageBackdrop";
import { ButtonFleuron } from "@/components/ui/ButtonFleuron";
import { CartoucheButton } from "@/components/ui/CartoucheButton";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type MotionDivProps = ComponentProps<typeof motion.div>;

function useFadeUp() {
  const reduce = useReducedMotion();
  return (delay: number): MotionDivProps =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: EASE },
        };
}

type HeroSoireeProps = {
  theme: string;
  accroche?: string;
  themeImageUrl?: string | null;
};

export function HeroSoiree({ theme, accroche, themeImageUrl }: HeroSoireeProps) {
  const fadeUp = useFadeUp();

  return (
    <section className="relative isolate overflow-hidden">
      <PageBackdrop />

      {themeImageUrl && (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <Image
            src={themeImageUrl}
            alt=""
            fill
            className="object-cover opacity-[0.16]"
            priority
            sizes="100vw"
          />
        </div>
      )}

      {/* Colonnes ioniques (masquées < 768px) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/ornaments/colonne_gauche.svg"
          alt=""
          className="absolute left-0 top-0 h-full w-[clamp(110px,14vw,210px)] object-contain object-bottom opacity-90"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/ornaments/colonne_droite.svg"
          alt=""
          className="absolute right-0 top-0 h-full w-[clamp(110px,15vw,210px)] object-contain object-bottom opacity-90"
        />
      </div>

      <div className="relative mx-auto max-w-[1180px] px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Sur-titre */}
          <motion.div {...fadeUp(0)} className="flex items-center justify-center gap-4">
            <span
              aria-hidden
              className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--or-moyen)] md:w-20"
            />
            <span className="font-garamond text-[clamp(.72rem,1.6vw,.9rem)] font-medium uppercase tracking-[.32em] text-[var(--or-fonce)]">
              Édition 2026
            </span>
            <span
              aria-hidden
              className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--or-moyen)] md:w-20"
            />
          </motion.div>

          {/* Titre */}
          <motion.div {...fadeUp(0.08)}>
            <h1
              className="mt-6 font-titre italic text-marine [text-shadow:0_2px_18px_rgba(44,62,92,.12)]"
              style={{ fontSize: "clamp(3.5rem, 9vw, 7rem)", lineHeight: 1 }}
            >
              {theme}
            </h1>
          </motion.div>

          {/* Filet + fleuron + filet */}
          <motion.div {...fadeUp(0.16)} className="mt-6 flex items-center justify-center gap-4">
            <span
              aria-hidden
              className="h-px w-16 bg-gradient-to-r from-transparent to-[var(--or-moyen)] md:w-28"
            />
            <ButtonFleuron className="h-7 w-7 drop-shadow-[0_1px_2px_rgba(168,134,63,.35)]" />
            <span
              aria-hidden
              className="h-px w-16 bg-gradient-to-l from-transparent to-[var(--or-moyen)] md:w-28"
            />
          </motion.div>

          {/* Accroche */}
          {accroche && (
            <motion.p
              {...fadeUp(0.24)}
              className="mx-auto mt-6 max-w-[620px] text-ardoise leading-relaxed [text-wrap:balance]"
            >
              {accroche}
            </motion.p>
          )}

          {/* Cartouches d'info (verre dépoli, liseré doré) */}
          <motion.div
            {...fadeUp(0.32)}
            className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-4 text-left sm:grid-cols-2"
          >
            <div className="rounded-2xl border border-[var(--or-moyen)]/40 bg-white/40 px-6 py-5 shadow-[0_4px_20px_rgba(63,91,118,.06)] backdrop-blur-md">
              <div className="flex items-center gap-2 text-[var(--or-fonce)]">
                <ButtonFleuron className="h-4 w-4" />
                <span className="font-garamond text-xs font-medium uppercase tracking-[.18em]">
                  Restauration
                </span>
              </div>
              <p className="mt-2 font-titre text-lg text-marine">
                Buffet &amp; animations
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--or-moyen)]/40 bg-white/40 px-6 py-5 shadow-[0_4px_20px_rgba(63,91,118,.06)] backdrop-blur-md">
              <div className="flex items-center gap-2 text-[var(--or-fonce)]">
                <ButtonFleuron className="h-4 w-4" />
                <span className="font-garamond text-xs font-medium uppercase tracking-[.18em]">
                  Ambiance
                </span>
              </div>
              <p className="mt-2 font-titre text-lg text-marine">Musique &amp; scène</p>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            {...fadeUp(0.4)}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6"
          >
            <CartoucheButton href="/billetterie" variant="marine">
              BILLETTERIE
            </CartoucheButton>
            <CartoucheButton href="#programme" variant="secondary">
              VOIR LE PROGRAMME
            </CartoucheButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

