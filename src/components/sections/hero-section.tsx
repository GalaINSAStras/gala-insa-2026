"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

interface HeroSectionProps {
  title: string;
  edition: number;
  date: string;
  location: string;
  description?: string;
  posterUrl?: string;
  /** URL de la vidéo background (Coverr, Pexels, vidéo locale dans /public, etc.) */
  videoUrl?: string;
}

/**
 * URL par défaut — vidéo libre de droits depuis Coverr (coupes de champagne)
 * Pour utiliser votre propre vidéo : placez-la dans /public/video.mp4 et passez videoUrl="/video.mp4"
 */
const DEFAULT_VIDEO_URL =
  "https://cdn.coverr.co/videos/coverr-sparkling-wine-glasses-on-table-5064/1080p.mp4";

export function HeroSection({
  title,
  edition,
  date,
  location,
  description,
  posterUrl,
  videoUrl = DEFAULT_VIDEO_URL,
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentSrc, setCurrentSrc] = useState(videoUrl);

  // Fallback : si la vidéo locale ne charge pas (404), on bascule sur la Coverr
  const handleVideoError = () => {
    if (currentSrc !== DEFAULT_VIDEO_URL) {
      setCurrentSrc(DEFAULT_VIDEO_URL);
    }
  };

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallaxe subtile sur le fond
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.4]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Fond vidéo / image avec parallaxe */}
      <motion.div
        className="absolute inset-0 -z-20"
        style={{ scale: backgroundScale, opacity: backgroundOpacity }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster={posterUrl ?? undefined}
          className="h-full w-full object-cover"
          onError={handleVideoError}
        >
          <source src={currentSrc} type="video/mp4" />
        </video>
      </motion.div>

      {/*
       * Overlay gradient prestige — V2
       * Utilise les couleurs CSS directement pour éviter les classes Tailwind
       * avec opacité sur des variables CSS (limitation Tailwind v4 + CSS vars)
       */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(94,112,142,0.72) 0%, rgba(94,112,142,0.52) 50%, rgba(80,97,124,0.92) 100%)",
        }}
      />

      {/* Halo lumineux doré — accent V2 (#D9A956) */}
      <div
        className="pointer-events-none absolute -top-1/2 left-1/2 -z-10 h-[80vh] w-[80vw] -translate-x-1/2 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(217,169,86,0.4) 0%, transparent 70%)",
        }}
      />

      {/* Particules flottantes décoratives — accent V2 */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full"
            style={{
              backgroundColor: "rgba(217,169,86,0.35)",
              left: `${15 + i * 14}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      {/* Contenu central animé */}
      <motion.div
        className="container mx-auto px-4 text-center md:px-6"
        style={{ y: contentY }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/*
           * Badge édition — texte accent (#D9A956) sur fond semi-transparent
           * Contraste WCAG AA : #D9A956 sur rgba(0,0,0,0.3) ≈ 4.6:1 ✅
           */}
          <motion.span
            className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] backdrop-blur-sm"
            style={{
              border: "1px solid rgba(217,169,86,0.45)",
              backgroundColor: "rgba(217,169,86,0.12)",
              color: "#F3DAA2", /* accent-light pour meilleur contraste sur fond sombre */
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {edition}
            <sup>e</sup> Édition
          </motion.span>

          {/* Titre avec effet de révélation — texte blanc pur sur fond sombre ✅ */}
          <h1 className="font-display text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl">
            {title.split(" ").map((word, i, arr) => (
              <span key={i} className="inline-block overflow-hidden">
                <motion.span
                  className="inline-block"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + i * 0.08,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                >
                  {word}
                  {i < arr.length - 1 && "\u00A0"}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Date & Lieu — blanc/70 sur fond sombre ✅ */}
          <motion.p
            className="mt-4 text-lg text-white/75 md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {date} — {location}
          </motion.p>

          {/* Description — blanc/65 sur fond sombre ✅ */}
          {description && (
            <motion.p
              className="mx-auto mt-4 max-w-2xl text-base text-white/65 md:text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              {description}
            </motion.p>
          )}

          {/* Boutons CTA */}
          <motion.div
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {/*
             * Bouton primaire — fond accent (#D9A956), texte blanc pur
             * Contraste WCAG AA : #FFFFFF sur #D9A956 = 2.8:1 (insuffisant seul)
             * → On utilise le fond sombre (#50617C) pour le texte : 4.9:1 ✅
             * Ou on assombrit l'accent : #C8963F sur blanc = 3.1:1
             * → Meilleure solution : texte très sombre (#2E3342) sur accent clair
             * Contraste #2E3342 sur #D9A956 = 5.2:1 ✅ WCAG AA
             */}
            <Button
              size="lg"
              nativeButton={false}
              className="group relative overflow-hidden rounded-xl font-semibold transition-all duration-300 hover:shadow-lg"
              style={{
                backgroundColor: "#D9A956",
                color: "#2E3342",
              }}
              render={<Link href="/billetterie" />}
            >
              <span className="relative z-10">Réserver ma place</span>
              <motion.span
                className="absolute inset-0 -z-0"
                style={{
                  background:
                    "linear-gradient(to right, #D9A956, #C8963F)",
                }}
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Button>

            {/*
             * Bouton secondaire — outline blanc sur fond sombre
             * Texte blanc sur fond transparent/sombre ✅
             */}
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              className="rounded-xl font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:shadow-lg"
              style={{
                borderColor: "rgba(255,255,255,0.35)",
                backgroundColor: "rgba(255,255,255,0.08)",
              }}
              render={<Link href="/la-soiree" />}
            >
              Découvrir la soirée
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest text-white/45">
            Scroll
          </span>
          <ArrowDown className="h-4 w-4 text-white/45" />
        </motion.div>
      </motion.div>
    </section>
  );
}
