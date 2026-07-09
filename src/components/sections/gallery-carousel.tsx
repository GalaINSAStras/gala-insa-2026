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
    gradient: "from-gala-primary to-gala-gold",
    alt: "Affiche Gala 2026 \u2014 72e \u00e9dition",
    label: "Gala 2026 \u2014 72e \u00e9dition",
  },
  {
    src: "/affiches/aff_2025.webp",
    alt: "Affiche Gala 2025 \u2014 71e \u00e9dition",
    label: "Gala 2025 \u2014 71e \u00e9dition",
  },
  {
    src: "/affiches/aff_2024.webp",
    alt: "Affiche Gala 2024 \u2014 70e \u00e9dition",
    label: "Gala 2024 \u2014 70e \u00e9dition",
  },
  {
    src: "/affiches/aff_2023.webp",
    alt: "Affiche Gala 2023 \u2014 69e \u00e9dition",
    label: "Gala 2023 \u2014 69e \u00e9dition",
  },
  {
    src: "/affiches/aff_2022.webp",
    alt: "Affiche Gala 2022 \u2014 68e \u00e9dition",
    label: "Gala 2022 \u2014 68e \u00e9dition",
  },
  {
    src: "/affiches/aff_2021.webp",
    alt: "Affiche Gala 2021 \u2014 67e \u00e9dition",
    label: "Gala 2021 \u2014 67e \u00e9dition",
  },
  {
    src: "/affiches/aff_2020.webp",
    alt: "Affiche Gala 2020 \u2014 66e \u00e9dition",
    label: "Gala 2020 \u2014 66e \u00e9dition",
  },
  {
    src: "/affiches/aff_2019.webp",
    alt: "Affiche Gala 2019 \u2014 65e \u00e9dition",
    label: "Gala 2019 \u2014 65e \u00e9dition",
  },
  {
    src: "/affiches/aff_2018.webp",
    alt: "Affiche Gala 2018 \u2014 64e \u00e9dition",
    label: "Gala 2018 \u2014 64e \u00e9dition",
  },
  {
    src: "/affiches/aff_2017.webp",
    alt: "Affiche Gala 2017 \u2014 63e \u00e9dition",
    label: "Gala 2017 \u2014 63e \u00e9dition",
  },
  {
    src: "/affiches/aff_2016.webp",
    alt: "Affiche Gala 2016 \u2014 62e \u00e9dition",
    label: "Gala 2016 \u2014 62e \u00e9dition",
  },
  {
    src: "/affiches/aff_2015.webp",
    alt: "Affiche Gala 2015 \u2014 61e \u00e9dition",
    label: "Gala 2015 \u2014 61e \u00e9dition",
  },
  {
    src: "/affiches/aff_2014.webp",
    alt: "Affiche Gala 2014 \u2014 60e \u00e9dition",
    label: "Gala 2014 \u2014 60e \u00e9dition",
  },
  {
    src: "/affiches/aff_2013.webp",
    alt: "Affiche Gala 2013 \u2014 59e \u00e9dition",
    label: "Gala 2013 \u2014 59e \u00e9dition",
  },
  {
    src: "/affiches/aff_2012.webp",
    alt: "Affiche Gala 2012 \u2014 58e \u00e9dition",
    label: "Gala 2012 \u2014 58e \u00e9dition",
  },
  {
    src: "/affiches/aff_2011.webp",
    alt: "Affiche Gala 2011 \u2014 57e \u00e9dition",
    label: "Gala 2011 \u2014 57e \u00e9dition",
  },
  {
    src: "/affiches/aff_2010.webp",
    alt: "Affiche Gala 2010 \u2014 56e \u00e9dition",
    label: "Gala 2010 \u2014 56e \u00e9dition",
  },
  {
    src: "/affiches/aff_2009.webp",
    alt: "Affiche Gala 2009 \u2014 55e \u00e9dition",
    label: "Gala 2009 \u2014 55e \u00e9dition",
  },
  {
    src: "/affiches/aff_2008.webp",
    alt: "Affiche Gala 2008 \u2014 54e \u00e9dition",
    label: "Gala 2008 \u2014 54e \u00e9dition",
  },
  {
    src: "/affiches/aff_2007.webp",
    alt: "Affiche Gala 2007 \u2014 53e \u00e9dition",
    label: "Gala 2007 \u2014 53e \u00e9dition",
  },
  {
    src: "/affiches/aff_2006.webp",
    alt: "Affiche Gala 2006 \u2014 52e \u00e9dition",
    label: "Gala 2006 \u2014 52e \u00e9dition",
  },
  {
    src: "/affiches/aff_2005.webp",
    alt: "Affiche Gala 2005 \u2014 51e \u00e9dition",
    label: "Gala 2005 \u2014 51e \u00e9dition",
  },
  {
    src: "/affiches/aff_2004.webp",
    alt: "Affiche Gala 2004 \u2014 50e \u00e9dition",
    label: "Gala 2004 \u2014 50e \u00e9dition",
  },
  {
    src: "/affiches/aff_2003.webp",
    alt: "Affiche Gala 2003 \u2014 49e \u00e9dition",
    label: "Gala 2003 \u2014 49e \u00e9dition",
  },
  {
    src: "/affiches/aff_2002.webp",
    alt: "Affiche Gala 2002 \u2014 48e \u00e9dition",
    label: "Gala 2002 \u2014 48e \u00e9dition",
  },
  {
    src: "/affiches/aff_2001.webp",
    alt: "Affiche Gala 2001 \u2014 47e \u00e9dition",
    label: "Gala 2001 \u2014 47e \u00e9dition",
  },
  {
    src: "/affiches/aff_2000.webp",
    alt: "Affiche Gala 2000 \u2014 46e \u00e9dition",
    label: "Gala 2000 \u2014 46e \u00e9dition",
  },
  {
    src: "/affiches/aff_1999.webp",
    alt: "Affiche Gala 1999 \u2014 45e \u00e9dition",
    label: "Gala 1999 \u2014 45e \u00e9dition",
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
          onPointerDown={() => stopAutoplay()}
          onPointerUp={() => startAutoplay()}
          onPointerLeave={() => startAutoplay()}
          onDragEnd={() => startAutoplay()}
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