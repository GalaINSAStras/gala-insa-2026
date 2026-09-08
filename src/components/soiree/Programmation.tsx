"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ButtonFleuron } from "@/components/ui/ButtonFleuron";
import { FloralEdge } from "@/components/ornaments/FloralEdge";
import { NotifyForm } from "./NotifyForm";
import type { ProgrammePhase, LineupItem } from "@/lib/sanity/types";

type TimelineEntry = {
  _key: string;
  heure?: string;
  titre?: string;
  description?: string;
  statut: "confirme" | "a_confirmer";
  mentionAttente?: string;
};

function buildEntries(
  programme: ProgrammePhase[],
  lineup: LineupItem[],
  revealed: boolean
): TimelineEntry[] {
  const phases: TimelineEntry[] = (programme ?? []).map((p) => ({
    _key: p._key,
    heure: p.heure,
    titre: p.titre,
    description: p.description,
    statut: p.statut ?? "confirme",
    mentionAttente: p.mentionAttente,
  }));

  const artists: TimelineEntry[] = revealed
    ? (lineup ?? []).map((l) => ({
        _key: l._id,
        heure: l.stageTime,
        titre: l.artistName,
        description: l.genre
          ? l.description
            ? `${l.genre} — ${l.description}`
            : l.genre
          : l.description,
        statut: "confirme" as const,
      }))
    : [];

  return [...phases, ...artists];
}

function Medallion({ confirmed }: { confirmed: boolean }) {
  return (
    <span
      aria-hidden
      className={`flex h-8 w-8 items-center justify-center rounded-full md:h-10 md:w-10 ${
        confirmed
          ? "border border-[var(--or-fonce)] bg-[linear-gradient(180deg,var(--or-clair),var(--or-moyen))] shadow-[0_2px_8px_rgba(168,134,63,.4)]"
          : "border border-dashed border-[var(--or-moyen)] bg-ivoire"
      }`}
    >
      {confirmed ? (
        <ButtonFleuron className="h-4 w-4 md:h-5 md:w-5" />
      ) : (
        <span className="h-2 w-2 rotate-45 border border-[var(--or-moyen)]" />
      )}
    </span>
  );
}

function TimelineItem({ entry, index }: { entry: TimelineEntry; index: number }) {
  const isLeft = index % 2 === 0;
  const attente =
    entry.statut === "a_confirmer" ? entry.mentionAttente ?? "À confirmer" : null;

  return (
    <motion.li
      className="relative"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* médaillon sur le filet */}
      <span className="absolute left-4 top-1 z-10 -translate-x-1/2 md:left-1/2">
        <Medallion confirmed={entry.statut === "confirme"} />
      </span>

      <div
        className={`pl-12 md:w-[calc(50%-2.5rem)] ${
          isLeft
            ? "md:mr-auto md:pl-0 md:pr-10 md:text-right"
            : "md:ml-auto md:pl-10"
        }`}
      >
        {entry.heure && (
          <p className="font-garamond text-lg font-semibold text-[var(--or-fonce)] tabular-nums md:text-xl">
            {entry.heure}
          </p>
        )}
        {entry.titre && (
          <h3 className="mt-1 font-heading text-xl text-marine md:text-2xl">
            {entry.titre}
          </h3>
        )}
        {entry.description && (
          <p className="mt-2 text-ardoise/85 leading-relaxed">{entry.description}</p>
        )}
        {attente && (
          <p className="mt-2 inline-flex items-center gap-2 text-sm italic text-ardoise/70">
            <span aria-hidden className="h-px w-4 bg-[var(--or-moyen)]" />
            {attente}
          </p>
        )}
      </div>
    </motion.li>
  );
}

export function Programmation({
  programme,
  lineup,
  revealed,
}: {
  programme: ProgrammePhase[];
  lineup: LineupItem[];
  revealed: boolean;
}) {
  const entries = buildEntries(programme, lineup, revealed);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.35"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  if (entries.length === 0) {
    return (
      <div className="mx-auto max-w-2xl text-center">
        <FloralEdge className="mx-auto h-28 w-28 opacity-70" />
        <p className="mt-4 font-heading text-2xl text-marine">
          Programmation dévoilée prochainement
        </p>
        <p className="mt-2 text-ardoise/80">
          Laissez-nous votre e-mail pour être prévenu·e en avant-première de la
          programmation.
        </p>
        <NotifyForm />
      </div>
    );
  }

  return (
    <div ref={ref} className="relative mx-auto max-w-4xl">
      {/* filet de fond */}
      <div
        aria-hidden
        className="absolute bottom-0 left-4 top-0 w-px bg-[var(--or-moyen)]/20 md:left-1/2"
      />
      {/* filet qui se dessine au scroll */}
      <motion.div
        aria-hidden
        style={reduce ? { scaleY: 1 } : { scaleY }}
        className="absolute bottom-0 left-4 top-0 w-px origin-top bg-[linear-gradient(180deg,var(--or-clair),var(--or-moyen),var(--or-fonce))] md:left-1/2"
      />
      <ul className="space-y-12 md:space-y-16">
        {entries.map((entry, index) => (
          <TimelineItem key={entry._key} entry={entry} index={index} />
        ))}
      </ul>
    </div>
  );
}
