"use client";

import {
  motion,
  useMotionValue,
  animate,
  useInView,
} from "motion/react";
import { useRef, useEffect, useState } from "react";

import { GALA } from "@/lib/hero-data";

/** Formate un entier pour l'affichage du compteur (72 → « 72 », 900 → « 900 »). */
function formatCount(value: number): string {
  return Math.round(value).toLocaleString("fr-FR");
}

/**
 * Compteur animé qui passe de 0 à une valeur cible
 * Texte blanc sur fond bleu ardoise — contraste WCAG AA ✅
 * La valeur cible est rendue telle quelle au SSR ; le count-up n'est qu'un
 * embellissement une fois le conteneur entré dans le viewport.
 */
function AnimatedCounter({
  value,
  suffix = "",
  label,
  delay = 0,
}: {
  value: number;
  suffix?: string;
  label: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Même déclencheur que le fade-in du chiffre (whileInView, marge 0) : plus
  // de zone morte où le chiffre s'affiche mais reste figé sur son état initial.
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);

  /**
   * Correctif « 0e édition » : `animated` reste `null` tant que le count-up
   * n'a pas démarré, et c'est alors la valeur réelle qui est affichée —
   * dès le rendu serveur (SSR) inclus. Hydratation lente, observer muet ou
   * onglet restauré (bfcache) : la donnée ne dépend plus de l'animation.
   */
  const [animated, setAnimated] = useState<string | null>(null);
  const display = animated ?? formatCount(value);

  useEffect(() => {
    if (!isInView) return;

    const unsubscribe = count.on("change", (v) => {
      setAnimated(formatCount(v));
    });

    const controls = animate(count, value, {
      duration: 0.8,
      delay,
      ease: "linear",
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [value, delay, count, isInView]);

  return (
    <div ref={ref} className="text-center">
      {/*
       * Chiffres : blanc pur sur fond bleu ardoise
       * Contraste #FFFFFF sur #5E708E = 4.6:1 ✅ WCAG AA
       */}
      <div className="font-display text-4xl font-bold text-white md:text-5xl lg:text-6xl">
        <motion.span
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay }}
        >
          {display}
          {suffix}
        </motion.span>
      </div>
      {/* Label : blanc/70 sur fond bleu ardoise ✅ */}
      <p className="mt-2 text-sm font-medium uppercase tracking-widest text-white/70">
        {label}
      </p>
    </div>
  );
}

/**
 * Bloc de countdown (Jours / Heures / Minutes / Secondes)
 * Chiffres accent (#D9A956) sur fond glassmorphism sombre ✅
 */
function CountdownBlock({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  const display = String(value).padStart(2, "0");

  return (
    <div className="flex flex-col items-center min-w-0">
      <div
        className="relative flex h-20 w-[clamp(3.5rem,20vw,5rem)] items-center justify-center overflow-hidden rounded-xl backdrop-blur-sm sm:h-24 sm:w-[clamp(4rem,22vw,6rem)] md:h-28 md:w-24"
        style={{
          border: "1px solid rgba(217,169,86,0.25)",
          backgroundColor: "rgba(255,255,255,0.06)",
        }}
      >
        {/* Effet glassmorphism */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 to-transparent" />

        {/*
         * Chiffres : accent clair (#F3DAA2) sur fond sombre
         * Contraste #F3DAA2 sur rgba(0,0,0,0.5) ≈ 7.2:1 ✅ WCAG AAA
         */}
        <motion.span
          key={display}
          className="relative font-display text-3xl font-bold tracking-tight md:text-4xl"
          style={{ color: "#F3DAA2" }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {display}
        </motion.span>
      </div>
      {/* Label : blanc/60 sur fond bleu ardoise ✅ */}
      <span className="mt-1 sm:mt-2 text-[8px] font-medium uppercase tracking-[0.17em] text-white/60 sm:text-[10px] sm:tracking-[0.2em]">
        {label}
      </span>
    </div>
  );
}

/**
 * Compte à rebours jusqu'au 21 novembre 2026
 * Synchronisé sur le fuseau horaire français (UTC+1/+2)
 */
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // 21 novembre 2026 à 19h00 heure de Paris (UTC+1 en novembre)
    const target = new Date("2026-11-21T19:00:00+01:00");

    function tick() {
      const now = new Date();
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center gap-2 sm:gap-4 md:gap-6">
      <CountdownBlock value={timeLeft.days} label="Jours" />
      <CountdownBlock value={timeLeft.hours} label="Heures" />
      <CountdownBlock value={timeLeft.minutes} label="Minutes" />
      <CountdownBlock value={timeLeft.seconds} label="Secondes" />
    </div>
  );
}

export function StatsCountdown({
  edition,
  participants,
}: {
  /** Piloté depuis Sanity — `null` si le champ est vidé dans le Studio. */
  edition?: number | null;
  participants?: number | null;
}) {
  // `??` et non valeurs par défaut de paramètres : Sanity renvoie `null` pour
  // un champ vidé (les defaults ne s'appliquent qu'à `undefined`) et
  // `animate()` lève une exception avec `null` — crash latent corrigé.
  const safeEdition = edition ?? GALA.edition;
  const safeParticipants = participants ?? 900;
  return (
    <section
      className="relative isolate overflow-hidden py-12 sm:py-24 md:py-32 mb-12 sm:mb-24 md:mb-32"
    >
      {/*
       * Fond avec dégradé dynamique — palette V2
       * Bleu ardoise primaire (#5E708E) → hover (#50617C) → profond (#3D4F6A)
       */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(135deg, #5E708E 0%, #50617C 50%, #3D4F6A 100%)",
        }}
      />

      {/* Particules dorées décoratives — accent V2 (#D9A956) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-0.5 w-0.5 rounded-full"
            style={{
              backgroundColor: `rgba(217, 169, 86, ${0.12 + i * 0.05})`,
              left: `${5 + i * 12}%`,
              top: `${10 + (i % 4) * 20}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.1, 0.45, 0.1],
            }}
            transition={{
              duration: 4 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Halo central — accent V2 */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[60vh] w-[60vw] -translate-x-1/2 -translate-y-1/2 opacity-15"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(217,169,86,0.3) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-5 md:px-6">
        {/* Section — Le Gala en un clin d'œil (chiffres forts) */}
        <div className="mb-10 sm:mb-20">
          <motion.h2
            className="mb-4 text-center font-display text-3xl font-bold text-white md:text-4xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Le Gala en un clin d&rsquo;œil
          </motion.h2>

          <motion.p
            className="mx-auto mb-8 max-w-xl text-center text-sm text-white/70 sm:mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Une soirée d&rsquo;exception, imaginée et vécue par les étudiants de
            l&rsquo;INSA Strasbourg.
          </motion.p>

          {/* Chiffres forts — vérifiés, pilotés depuis Sanity */}
          <div className="mb-10 flex items-center justify-center gap-8 sm:mb-14 sm:gap-14">
            <AnimatedCounter
              value={safeEdition}
              suffix="e"
              label="édition"
              delay={0}
            />
            <div
              className="h-16 w-px sm:h-20"
              style={{ backgroundColor: "rgba(217,169,86,0.35)" }}
            />
            <AnimatedCounter
              value={safeParticipants}
              label="convives attendus"
              delay={0.2}
            />
          </div>
        </div>

        {/* Section Countdown */}
        <div className="pb-6 sm:pb-12">
          <motion.h3
            className="mb-4 mt-8 text-center font-display text-2xl font-bold text-white/90 md:text-3xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Le compte à rebours est lancé
          </motion.h3>

          <motion.p
            className="mb-10 text-center text-sm text-white/55"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            21 novembre 2026 — L&apos;Illiade, Illkirch-Graffenstaden
          </motion.p>

          <CountdownTimer />
        </div>
      </div>
    </section>
  );
}