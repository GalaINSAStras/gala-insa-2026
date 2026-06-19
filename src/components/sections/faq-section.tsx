"use client";

import { useEffect, useState } from "react";
import { clientFetch } from "@/lib/sanity/client";
import type { FAQ } from "@/lib/sanity/types";

export function FaqSection() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    clientFetch<FAQ[]>(`*[_type == "faq"] | order(displayOrder asc)`)
      .then((data) => { if (!cancelled) { setFaqs(data ?? []); setLoading(false); } })
      .catch(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  if (loading) return <div className="mx-auto max-w-3xl space-y-4">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-12 animate-pulse rounded-lg bg-muted" />)}</div>;
  if (!faqs.length) return <p className="text-muted-foreground italic">Aucune question fréquente pour le moment.</p>;

  return (
    <div className="mx-auto max-w-3xl divide-y divide-border">
      {faqs.map((faq) => (
        <details key={faq._id} className="group py-4 [&[open]>summary]:mb-3">
          <summary className="flex cursor-pointer items-center justify-between text-base font-medium text-foreground hover:text-gala-primary transition-colors list-none">
            {faq.question}
            <span className="ml-2 shrink-0 text-muted-foreground transition-transform group-open:rotate-180">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
            </span>
          </summary>
          <div className="text-sm text-muted-foreground">{faq.answer}</div>
        </details>
      ))}
    </div>
  );
}