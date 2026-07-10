"use client";

import { motion, useMotionValue, animate } from "motion/react";
import { useRef, useCallback, useEffect } from "react";

interface GalleryImage {
  src?: string;
  alt: string;
  label: string;
  gradient?: string;
}

const GALLERY_IMAGES: GalleryImage[] = [
  {
    gradient: "from-gala-primary to-gala-gold",
    alt: "Affiche Gala 2026 — 72e édition",
    label: "Gala 2026 — 72e édition",
  },
  {
    src: "/affiches/aff_2025.webp",
    alt: "Affiche Gala 2025 — 71e édition",
    label: "Gala 2025 — 71e édition",
  },
  {
    src: "/affiches/aff_2024.webp",
    alt: "Affiche Gala 2024 — 70e édition",
    label: "Gala 2024 — 70e édition",
  },
  {
    src: "/affiches/aff_2023.webp",
    alt: "Affiche Gala 2023 — 69e édition",
    label: "Gala 2023 — 69e édition",
  },
  {
    src: "/affiches/aff_2022.webp",
    alt: "Affiche Gala 2022 — 68e édition",
    label: "Gala 2022 — 68e édition",
  },
  {
    src: "/affiches/aff_2021.webp",
    alt: "Affiche Gala 2021 — 67e édition",
    label: "Gala 2021 — 67e édition",
  },
  {
    src: "/affiches/aff_2020.webp",
    alt: "Affiche Gala 2020 — 66e édition",
    label: "Gala 2020 — 66e édition",
  },
  {
    src: "/affiches/aff_2019.webp",
    alt: "Affiche Gala 2019 — 65e édition",
    label: "Gala 2019 — 65e édition",
  },
  {
    src: "/affiches/aff_2018.webp",
    alt: "Affiche Gala 2018 — 64e édition",
    label: "Gala 2018 — 64e édition",
  },
  {
    src: "/affiches/aff_2017.webp",
    alt: "Affiche Gala 2017 — 63e édition",
    label: "Gala 2017 — 63e édition",
  },
  {
    src: "/affiches/aff_2016.webp",
    alt: "Affiche Gala 2016 — 62e édition",
    label: "Gala 2016 — 62e édition",
  },
  {
    src: "/affiches/aff_2015.webp",
    alt: "Affiche Gala 2015 — 61e édition",
    label: "Gala 2015 — 61e édition",
  },
  {
    src: "/affiches/aff_2014.webp",
    alt: "Affiche Gala 2014 — 60e édition",
    label: "Gala 2014 — 60e édition",
  },
  {
    src: "/affiches/aff_2013.webp",
    alt: "Affiche Gala 2013 — 59e édition",
    label: "Gala 2013 — 59e édition",
  },
  {
    src: "/affiches/aff_2012.webp",
    alt: "Affiche Gala 2012 — 58e édition",
    label: "Gala 2012 — 58e édition",
  },
  {
    src: "/affiches/aff_2011.webp",
    alt: "Affiche Gala 2011 — 57e édition",
    label: "Gala 2011 — 57e édition",
  },
  {
    src: "/affiches/aff_2010.webp",
    alt: "Affiche Gala 2010 — 56e édition",
    label: "Gala 2010 — 56e édition",
  },
  {
    src: "/affiches/aff_2009.webp",
    alt: "Affiche Gala 2009 — 55e édition",
    label: "Gala 2009 — 55e édition",
  },
  {
    src: "/affiches/aff_2008.webp",
    alt: "Affiche Gala 2008 — 54e édition",
    label: "Gala 2008 — 54e édition",
  },
  {
    src: "/affiches/aff_2007.webp",
    alt: "Affiche Gala 2007 — 53e édition",
    label: "Gala 2007 — 53e édition",
  },
  {
    src: "/affiches/aff_2006.webp",
    alt: "Affiche Gala 2006 — 52e édition",
    label: "Gala 2006 — 52e édition",
  },
  {
    src: "/affiches/aff_2005.webp",
    alt: "Affiche Gala 2005 — 51e édition",
    label: "Gala 2005 — 51e édition",
  },
  {
    src: "/affiches/aff_2004.webp",
    alt: "Affiche Gala 2004 — 50e édition",
    label: "Gala 2004 — 50e édition",
  },
  {
    src: "/affiches/aff_2003.webp",
    alt: "Affiche Gala 2003 — 49e édition",
    label: "Gala 2003 — 49e édition",
  },
  {
    src: "/affiches/aff_2002.webp",
    alt: "Affiche Gala 2002 — 48e édition",
    label: "Gala 2002 — 48e édition",
  },
  {
    src: "/affiches/aff_2001.webp",
    alt: "Affiche Gala 2001 — 47e édition",
    label: "Gala 2001 — 47e édition",
  },
  {
    src: "/affiches/aff_2000.webp",
    alt: "Affiche Gala 2000 — 46e édition",
    label: "Gala 2000 — 46e édition",
  },
  {
    src: "/affiches/aff_1999.webp",
    alt: "Affiche Gala 1999 — 45e édition",
    label: "Gala 1999 — 45e édition",
  },
  {
    src: "/affiches/aff_1994.webp",
    alt: "Affiche Gala 1994 — 40e édition",
    label: "Gala 1994 — 40e édition",
  },
  {
    src: "/affiches/aff_1992.webp",
    alt: "Affiche Gala 1992 — 38e édition",
    label: "Gala 1992 — 38e édition",
  },
  {
    src: "/affiches/aff_1991.webp",
    alt: "Affiche Gala 1991 — 37e édition",
    label: "Gala 1991 — 37e édition",
  },
  {
    src: "/affiches/aff_1990.webp",
    alt: "Affiche Gala 1990 — 36e édition",
    label: "Gala 1990 — 36e édition",
  },
];

const AUTOPLAY_DURATION = 25;

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

  return (
    <section className="relative overflow-hidden py-12 sm:py-24 md:py-32">
      <div className="container mx-auto mb-8 sm:mb-16 px-5 md:px-6">
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
          Plongez dans l&rsquo;ambiance des années passées
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
          onPointerDown={() => stopAutoplay()}
          onPointerUp={() => startAutoplay()}
          onPointerLeave={() => startAutoplay()}
          onDragEnd={() => startAutoplay()}
        >
          {[...GALLERY_IMAGES, ...GALLERY_IMAGES].map((image, index) => (
            <div
              key={`${image.label}-${index}`}
              className="relative h-64 flex-shrink-0 overflow-hidden md:h-[420px]"
              style={{
                boxShadow: "var(--shadow-md)",
              }}
            >
              {image.src ? (
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-auto object-contain pointer-events-none"
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