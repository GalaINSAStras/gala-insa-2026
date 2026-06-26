"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Image from "next/image";

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

const PLACEHOLDER_IMAGES: GalleryImage[] = [
  {
    src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80",
    alt: "Soirée de gala - danseurs",
    caption: "Moments de grâce sur la piste de danse",
  },
  {
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    alt: "Conférence ou discours",
    caption: "Discours d'ouverture de l'édition précédente",
  },
  {
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
    alt: "Décoration de salle",
    caption: "Une salle magnifiquement décorée",
  },
  {
    src: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&q=80",
    alt: "Concert live",
    caption: "Performances musicales en live",
  },
  {
    src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
    alt: "Photographie de groupe",
    caption: "Les organisateurs et bénévoles",
  },
  {
    src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80",
    alt: "Ambiance soirée",
    caption: "Ambiance et convivialité",
  },
];

export function GalleryCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Effet parallaxe horizontal : plus on scrolle, plus le carrousel se déplace
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  // Opacité progressive au scroll
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0.4, 1, 1, 0.4]
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-32"
    >
      {/* Titre */}
      <div className="container mx-auto mb-16 px-4 md:px-6">
        <motion.h2
          className="font-display text-3xl font-bold text-gala-primary md:text-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          Galerie des éditions précédentes
        </motion.h2>
        <motion.p
          className="mt-2 text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Plongez dans l'ambiance des années passées
        </motion.p>
      </div>

      {/* Carrousel horizontal à défilement parallaxe */}
      <div className="relative">
        {/* Dégradés de bord (gauche/droite) pour l'immersion */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-background to-transparent" />

        <motion.div
          ref={trackRef}
          className="flex gap-6 px-16"
          style={{ x, opacity }}
        >
          {/* Double les slides pour un défilement infini */}
          {[...PLACEHOLDER_IMAGES, ...PLACEHOLDER_IMAGES].map(
            (image, index) => (
              <motion.div
                key={`${image.src}-${index}`}
                className="group relative flex-shrink-0 overflow-hidden rounded-2xl"
                style={{
                  width: 380,
                  height: 500,
                  perspective: 1000,
                }}
                whileHover={{ scale: 1.02, z: 50 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-110"
                  sizes="380px"
                />

                {/* Overlay gradient au hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/*
                 * Légende au hover — texte blanc sur fond sombre
                 * Contraste #FFFFFF sur rgba(0,0,0,0.7) ≈ 12:1 ✅ WCAG AAA
                 */}
                <div className="absolute bottom-0 left-0 right-0 translate-y-4 p-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-sm font-medium text-white">
                    {image.caption}
                  </p>
                </div>

                {/*
                 * Effet de bordure lumineuse au hover — accent V2 (#D9A956)
                 */}
                <div
                  className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-transparent transition-all duration-300 group-hover:ring-[rgba(217,169,86,0.35)]"
                />
              </motion.div>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
