"use client";

import { motion, useMotionValue, animate } from "motion/react";
import Image from "next/image";
import { useRef, useCallback, useEffect } from "react";

interface GalleryImage {
  src?: string;
  alt: string;
  label: string;
  gradient?: string;
}

const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: "/gala_2024.webp",
    alt: "Affiche Gala 2024 \u2014 69e \u00e9dition",
    label: "Gala 2024 \u2014 69e \u00e9dition",
  },
  {
    src: "/gala_2025.webp",
    alt: "Affiche Gala 2025 \u2014 70e \u00e9dition",
    label: "Gala 2025 \u2014 70e \u00e9dition",
  },
  {
    gradient: "from-gala-primary to-gala-gold",
    alt: "Affiche Gala 2026 \u2014 72e \u00e9dition",
    label: "Gala 2026 \u2014 72e \u00e9dition",
  },
  {
    src: "/gala_2024.webp",
    alt: "Affiche Gala 2024 \u2014 69e \u00e9dition",
    label: "Gala 2024 \u2014 69e \u00e9dition",
  },
];

const AUTOPLAY_DURATION = 10;

export function GalleryCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const autoplayRef = useRef<ReturnType<typeof animate> | null>(null);
  const startAutoplayRef = useRef<() => void>(() => {});

  const getTrackHalfWidth = useCallback(() => {
    if (!trackRef.current) return 0;
    return trackRef.current.scrollWidth / 4;
  }, []);

  const stopAutoplay = useCallback(() => {
    autoplayRef.current?.stop();
    autoplayRef.current = null;
  }, []);

  const startAutoplay = useCallback(() => {
    const half = getTrackHalfWidth();
    if (half <= 0) return;

    const currentX = x.get();
    const target = currentX - half;

    stopAutoplay();

    autoplayRef.current = animate(x, target, {
      duration: AUTOPLAY_DURATION,
      ease: "linear",
      onComplete: () => {
        x.set(x.get() + half);
        startAutoplayRef.current();
      },
    });
  }, [x, getTrackHalfWidth, stopAutoplay]);

  useEffect(() => {
    startAutoplayRef.current = startAutoplay;
  }, [startAutoplay]);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay]);

  const handleDragEnd = useCallback(
    (_: unknown, info: { velocity: { x: number } }) => {
      const velocity = info.velocity.x;

      animate(x, x.get() + velocity * 0.15, {
        type: "spring",
        stiffness: 300,
        damping: 30,
        onComplete: () => {
          startAutoplay();
        },
      });
    },
    [x, startAutoplay]
  );

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="container mx-auto mb-16 px-4 md:px-6">
        <motion.h2
          className="font-display text-3xl font-bold text-gala-primary md:text-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          Galerie des &eacute;ditions pr&eacute;c&eacute;dentes
        </motion.h2>
        <motion.p
          className="mt-2 text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Plongez dans l&rsquo;ambiance des ann&eacute;es pass&eacute;es
        </motion.p>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-[var(--background)] to-transparent md:w-32" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-[var(--background)] to-transparent md:w-32" />

        <motion.div
          ref={trackRef}
          className="flex gap-3 md:gap-6 cursor-grab active:cursor-grabbing"
          style={{ x, touchAction: "pan-y" }}
          drag="x"
          dragMomentum={false}
          onDragStart={stopAutoplay}
          onDragEnd={handleDragEnd}
        >
          {[...GALLERY_IMAGES, ...GALLERY_IMAGES].map((image, index) => (
            <div
              key={`${image.label}-${index}`}
              className="relative w-40 flex-shrink-0 overflow-hidden aspect-[3/4] md:w-[420px]"
              style={{
                boxShadow: "var(--shadow-md)",
              }}
            >
              {image.src ? (
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover pointer-events-none"
                  sizes="(max-width: 768px) 160px, 420px"
                />
              ) : (
                <div
                  className={`h-full w-full bg-gradient-to-br ${image.gradient}`}
                />
              )}

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 pt-16">
                <p className="text-base font-medium text-white drop-shadow-sm">
                  {image.label}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}