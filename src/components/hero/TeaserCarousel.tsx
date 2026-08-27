"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "motion/react";
import type { TeaserSlide } from "@/lib/hero-data";

const AUTOPLAY_MS = 6500;

export function TeaserCarousel({ slides }: { slides: TeaserSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + slides.length) % slides.length),
    [slides.length]
  );

  // autoplay
  useEffect(() => {
    if (paused || reduced || slides.length < 2) return;
    const t = setTimeout(() => go(1), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [index, paused, reduced, go, slides.length]);

  // ne lire que la vidéo active
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === index) void v.play().catch(() => {});
      else {
        v.pause();
        v.currentTime = 0;
      }
    });
  }, [index]);

  // clavier
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    }
  };

  return (
    <div
      role="region"
      aria-roledescription="carrousel"
      aria-label="Teaser du Gala 2026"
      tabIndex={0}
      onKeyDown={onKey}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="group relative aspect-[21/9] w-full outline-none focus-visible:ring-2 focus-visible:ring-[var(--or-fonce)] focus-visible:ring-offset-2"
    >
      {slides.map((s, i) => (
        <div
          key={s.id}
          aria-hidden={i !== index}
          className="absolute inset-0 transition-opacity duration-[900ms] ease-out"
          style={{ opacity: i === index ? 1 : 0 }}
        >
          {s.kind === "video" ? (
            <video
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              src={s.src}
              poster={s.poster}
              muted
              loop
              playsInline
              preload={i === 0 ? "auto" : "metadata"}
              className="h-full w-full object-cover"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={s.src} alt="" className="h-full w-full object-cover" />
          )}
          <span className="sr-only">{s.alt}</span>
        </div>
      ))}

      {/* voile pour lisibilité des contrôles */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_50%,transparent,rgba(20,32,45,.28))]"
      />

      {/* flèches */}
      {slides.length > 1 && (
        <>
          <NavButton side="left" onClick={() => go(-1)} />
          <NavButton side="right" onClick={() => go(1)} />
        </>
      )}

      {/* dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setIndex(i)}
              aria-label={`Aller au slide ${i + 1} : ${s.alt}`}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-[var(--or-moyen)]" : "w-2 bg-white/60 hover:bg-white/85"
              }`}
            />
          ))}
        </div>
      )}

      <p aria-live="polite" className="sr-only">
        Slide {index + 1} sur {slides.length} : {slides[index].alt}
      </p>
    </div>
  );
}

function NavButton({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      onClick={onClick}
      aria-label={side === "left" ? "Slide précédent" : "Slide suivant"}
      className={`absolute top-1/2 -translate-y-1/2 ${side === "left" ? "left-3" : "right-3"}
        grid h-9 w-9 place-items-center rounded-full
        border border-[var(--or-moyen)]/70 bg-[var(--ivoire)]/85 text-ardoise
        shadow-md backdrop-blur-sm transition
        hover:bg-[var(--ivoire)] hover:scale-105
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--or-fonce)]
        md:h-11 md:w-11`}
    >
      <Icon className="h-4 w-4 md:h-5 md:w-5" strokeWidth={2.2} />
    </button>
  );
}
