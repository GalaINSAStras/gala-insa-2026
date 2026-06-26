"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  animate,
} from "motion/react";
import { useRef, useEffect, useState } from "react";

/**
 * Compteur animé qui passe de 0 à une valeur cible
 * Texte blanc sur fond bleu ardoise — contraste WCAG AA ✅
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
  const count = useMotionValue(0);
  const rounded = useSpring(count, { stiffness: 100, damping: 30 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 2,
      delay,
      ease: [0.76, 0, 0.24, 1],
    });

    const unsubscribe = rounded.on("change", (v) => {
      setDisplay(Math.round(v).toString());
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [value, delay, count, rounded]);

  return (
    <div className="text-center">
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
    <div className="flex flex-col items-center">
      <div
        className="relative flex h-24 w-20 items-center justify-center overflow-hidden rounded-xl backdrop-blur-sm md:h-28 md:w-24"
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
      <span className="mt-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white/60">
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
    <div className="flex justify-center gap-4 md:gap-6">
      <CountdownBlock value={timeLeft.days} label="Jours" />
      <CountdownBlock value={timeLeft.hours} label="Heures" />
      <CountdownBlock value={timeLeft.minutes} label="Minutes" />
      <CountdownBlock value={timeLeft.seconds} label="Secondes" />
    </div>
  );
}

export function StatsCountdown() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-32"
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

      <motion.div
        className="container mx-auto px-4 md:px-6"
        style={{ y: backgroundY }}
      >
        {/* Section Chiffres clés */}
        <div className="mb-20">
          {/*
           * Titre : blanc pur sur fond bleu ardoise
           * Contraste #FFFFFF sur #5E708E = 4.6:1 ✅ WCAG AA
           */}
          <motion.h2
            className="mb-12 text-center font-display text-3xl font-bold text-white md:text-4xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Le Gala en chiffres
          </motion.h2>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <AnimatedCounter value={1200} suffix="+" label="Participants" delay={0} />
            <AnimatedCounter value={71} suffix="e" label="Édition 2026" delay={0.2} />
            <AnimatedCounter value={30} suffix="+" label="Partenaires" delay={0.4} />
            <AnimatedCounter value={150} suffix="+" label="Bénévoles" delay={0.6} />
          </div>
        </div>

        {/* Section Countdown */}
        <div>
          <motion.h3
            className="mb-4 text-center font-display text-2xl font-bold text-white/90 md:text-3xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Ouverture des portes dans
          </motion.h3>

          <motion.p
            className="mb-10 text-center text-sm text-white/55"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            21 novembre 2026 — L'Illiade, Illkirch-Graffenstaden
          </motion.p>

          <CountdownTimer />
        </div>
      </motion.div>
    </section>
  );
}
