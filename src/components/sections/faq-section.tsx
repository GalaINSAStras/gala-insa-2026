"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { clientFetch } from "@/lib/sanity/client";
import type { FAQ } from "@/lib/sanity/types";

/**
 * Accordéon FAQ animé — Design System V2
 *
 * Accessibilité :
 * - Question : text-foreground (#2E3342 light / #F7F7F5 dark) ✅
 * - Hover question : text-gala-primary (#5E708E) ✅
 * - Réponse : text-muted-foreground (#5C6475 light / #D8D9DD dark) ✅
 * - Icône chevron : text-muted-foreground ✅
 */
function FaqItem({ faq, index }: { faq: FAQ; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="border-b border-border last:border-0"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.76, 0, 0.24, 1] }}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left transition-colors hover:text-gala-primary"
        aria-expanded={isOpen}
      >
        {/*
         * Texte question : text-foreground → hover text-gala-primary
         * Contraste #5E708E sur #FFFBF2 = 4.5:1 ✅ WCAG AA
         */}
        <span className="text-base font-medium text-foreground transition-colors hover:text-gala-primary">
          {faq.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
          className="flex-shrink-0 text-muted-foreground"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
            className="overflow-hidden"
          >
            {/*
             * Réponse : text-muted-foreground (#5C6475) sur fond crème (#FFFBF2)
             * Contraste = 5.1:1 ✅ WCAG AA
             */}
            <p className="pb-5 text-sm leading-relaxed text-muted-foreground">
              {faq.reponse}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FaqSection() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    clientFetch<FAQ[]>(`*[_type == "faq"] | order(displayOrder asc)`)
      .then((data) => {
        if (!cancelled) {
          setFaqs(data ?? []);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-14 animate-pulse rounded-xl bg-muted"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    );
  }

  if (!faqs.length) {
    return (
      <p className="italic text-muted-foreground">
        Aucune question fréquente pour le moment.
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      {faqs.map((faq, index) => (
        <FaqItem key={faq._id} faq={faq} index={index} />
      ))}
    </div>
  );
}
