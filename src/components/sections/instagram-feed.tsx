"use client";

import { motion } from "motion/react";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { SOCIAL } from "@/lib/constants";
import type { InstagramApiResponse } from "@/app/api/instagram/route";

/** Icône Instagram SVG inline */
function InstagramIcon({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const INSTAGRAM_PROFILE_URL = SOCIAL.instagram;

export function InstagramFeed() {
  const [data, setData] = useState<InstagramApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchInstagram = useCallback(async () => {
    try {
      const res = await fetch("/api/instagram", {
        next: { revalidate: 21600 },
      });
      if (res.ok) {
        const json: InstagramApiResponse = await res.json();
        setData(json);
      }
    } catch {
      // Silently fail — fallback will show
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInstagram();
  }, [fetchInstagram]);

  const profilePicUrl = data?.profilePicUrl ?? null;
  const latestPostUrl = data?.latestPostUrl ?? null;
  const hasPost = latestPostUrl && /\/p\//.test(latestPostUrl);

  return (
    <section
      id="instagram"
      className="py-20 md:py-28"
      aria-label="Dernière publication Instagram"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* En-tête de section */}
        <motion.div
          className="mb-10 flex flex-col items-start gap-3 md:flex-row md:items-end md:justify-between"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <div>
            <div className="mb-2 flex items-center gap-3">
              {/* Photo de profil Instagram (ou fallback icône) */}
              {!loading && profilePicUrl ? (
                <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-[rgba(217,169,86,0.3)]">
                  <Image
                    src={profilePicUrl}
                    alt="Photo de profil Instagram @gala_insa_strasbourg"
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gala-primary/10">
                  <InstagramIcon
                    className="h-5 w-5"
                    style={{ color: "#5E708E" }}
                  />
                </div>
              )}
              <span
                className="text-sm font-medium uppercase tracking-[0.15em]"
                style={{ color: "#5E708E" }}
              >
                Instagram
              </span>
            </div>
            <h2 className="font-display text-3xl font-bold text-gala-primary md:text-4xl">
              Suivez l'aventure
            </h2>
            <p className="mt-2 text-muted-foreground">
              Retrouvez toute l'actualité du Gala sur notre compte
              Instagram.
            </p>
          </div>

          <motion.a
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-300"
            style={{
              backgroundColor: "rgba(94,112,142,0.08)",
              color: "#5E708E",
              border: "1px solid rgba(94,112,142,0.2)",
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label="Voir le profil Instagram @gala_insa_strasbourg"
          >
            <InstagramIcon className="h-4 w-4" />
            @gala_insa_strasbourg
          </motion.a>
        </motion.div>

        {/* Contenu embed Instagram */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
        >
          <div
            className="w-full max-w-lg overflow-hidden rounded-2xl"
            style={{
              boxShadow: "0 14px 36px rgba(30, 40, 60, 0.12)",
              border: "1px solid rgba(94,112,142,0.12)",
              background: "#fff",
            }}
          >
            {loading ? (
              /* Squelette de chargement */
              <div className="flex flex-col items-center gap-4 px-6 py-16">
                <div className="h-16 w-16 animate-pulse rounded-full bg-muted" />
                <div className="h-4 w-48 animate-pulse rounded bg-muted" />
                <div className="h-3 w-32 animate-pulse rounded bg-muted" />
              </div>
            ) : hasPost && latestPostUrl ? (
              <InstagramPostEmbed postUrl={latestPostUrl} />
            ) : (
              <InstagramProfileCard />
            )}
          </div>
        </motion.div>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-sm text-muted-foreground">
            Suivez-nous pour ne rien manquer des coulisses et des annonces du
            Gala 2026.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Embed Instagram via blockquote officiel.
 * Nécessite le script instagram/embed.js qui convertit le blockquote en iframe.
 */
function InstagramPostEmbed({ postUrl }: { postUrl: string }) {
  useEffect(() => {
    // Re-trigger Instagram embeds.js s'il est déjà chargé
    if (typeof window !== "undefined") {
      const win = window as unknown as { instgrm?: { Embeds?: { process?: () => void } } };
      if (win.instgrm) {
        try {
          win.instgrm.Embeds?.process?.();
        } catch {
          // Silencieux
        }
      }
    }
  }, [postUrl]);

  return (
    <>
      <blockquote
        className="instagram-media"
        data-instgrm-captioned
        data-instgrm-permalink={postUrl}
        style={{
          background: "#FFF",
          border: 0,
          borderRadius: "3px",
          boxShadow:
            "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
          margin: "1px",
          maxWidth: "540px",
          minWidth: "326px",
          padding: 0,
          width: "calc(100% - 2px)",
        }}
      />
      <script async src="//www.instagram.com/embed.js" />
    </>
  );
}

/**
 * Carte fallback : affiche le profil Instagram avec photo si disponible,
 * sinon le logo gradient.
 */
function InstagramProfileCard() {
  return (
    <div className="flex flex-col items-center gap-6 px-6 py-12 text-center">
      <div
        className="flex h-20 w-20 items-center justify-center rounded-full"
        style={{
          background:
            "linear-gradient(135deg, #833AB4, #FD1D1D, #F77737, #FCAF45)",
        }}
      >
        <InstagramIcon className="h-10 w-10 text-white" />
      </div>
      <div>
        <h3 className="font-display text-xl font-bold text-gala-primary">
          @gala_insa_strasbourg
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Le Gala sur Instagram
        </p>
      </div>
      <motion.a
        href={INSTAGRAM_PROFILE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-300"
        style={{
          background:
            "linear-gradient(135deg, #833AB4, #FD1D1D, #F77737, #FCAF45)",
        }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <InstagramIcon className="h-4 w-4" />
        Voir sur Instagram
      </motion.a>
    </div>
  );
}