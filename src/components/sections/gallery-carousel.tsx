"use client";

import { motion, useMotionValue, animate } from "motion/react";
import { useRef, useCallback, useEffect } from "react";

interface GalleryImage {
  src?: string;
  alt: string;
  label: string;
  gradient?: string;
  cancelled?: boolean;
}

const GALLERY_IMAGES: GalleryImage[] = [
  {
    gradient: "from-gala-primary to-gala-gold",
    alt: "Affiche Gala 2026 — 72e édition",
    label: "Gala 2026 — 72e édition",
  },
  {
    src: "/affiches/aff_2025.webp",
    alt: "Affiche Gala 2025 — 71e édition (édition annulée)",
    label: "Gala 2025 — 71e édition",
    cancelled: true,
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

/** Sépare le libellé « Gala 2024 — 70e édition » en { year, edition }. */
function splitLabel(label: string): { year: string; edition: string } {
  const year = label.match(/(?:19|20)\d{2}/)?.[0] ?? "";
  const edition = label.split(" — ")[1] ?? "";
  return { year, edition };
}

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
    <section className="relative overflow-hidden py-12 sm:py-24 md:pb-32 md:pt-24">
      <div className="container mx-auto mb-8 sm:mb-16 px-5 md:px-6">
        <motion.h2
          className="font-titre text-center text-3xl font-bold text-gala-primary md:text-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          Galerie des éditions précédentes
        </motion.h2>
        <motion.p
          className="mt-2 text-center text-muted-foreground"
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
          className="flex cursor-grab items-start gap-4 active:cursor-grabbing md:gap-8"
          style={{ x, touchAction: "pan-y" }}
          drag="x"
          dragMomentum={false}
          onPointerDown={() => stopAutoplay()}
          onPointerUp={() => startAutoplay()}
          onPointerLeave={() => startAutoplay()}
          onDragEnd={() => startAutoplay()}
        >
          {[...GALLERY_IMAGES, ...GALLERY_IMAGES].map((image, index) => {
            const { year, edition } = splitLabel(image.label);
            return (
              <div
                key={`${image.label}-${index}`}
                className="relative flex flex-shrink-0 flex-col rounded-2xl border-2 border-[var(--or-moyen)]/60 bg-[linear-gradient(180deg,#FFFDF8,#F6F0E1)] p-4 shadow-[0_18px_48px_rgba(34,49,74,.22)] md:p-6"
              >
                {/* double liseré doré */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-2 rounded-xl border border-[var(--or-moyen)]/40"
                />
                {/* fleuron sommital */}
                <div
                  aria-hidden
                  className="absolute -top-2.5 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-2 border-[var(--or-moyen)] bg-ivoire"
                />

                {/* Affiche — hauteur fixe, largeur naturelle */}
                <div className="relative self-center">
                  {image.src ? (
                    <img
                      src={image.src}
                      alt={image.alt}
                      className={`block h-64 max-w-none w-auto rounded-t-lg md:h-[400px] ${
                        image.cancelled ? "grayscale opacity-60" : ""
                      }`}
                    />
                  ) : (
                    <div
                      className={`h-64 w-[180px] rounded-t-lg bg-gradient-to-br md:h-[400px] md:w-[286px] ${image.gradient}`}
                    />
                  )}

                  {image.cancelled && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="rounded-full bg-marine/85 px-4 py-1.5 text-sm font-semibold text-white">
                        Édition annulée
                      </span>
                    </div>
                  )}
                </div>

                {/* trait de séparation doré */}
                <div className="mt-4 flex items-center justify-center gap-2 md:mt-5">
                  <span
                    aria-hidden
                    className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--or-moyen)]"
                  />
                  <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-[var(--or-moyen)]" />
                  <span
                    aria-hidden
                    className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--or-moyen)]"
                  />
                </div>

                {/* description (année + édition) */}
                <div className="pt-3 text-center">
                  <p className="font-garamond text-2xl font-bold italic text-marine">
                    {year}
                  </p>
                  <p className="mt-0.5 font-garamond text-xs italic uppercase tracking-[0.18em] text-[var(--or-fonce)]">
                    {edition}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
