import { getFaq } from "@/lib/sanity/queries";

export async function FaqSection() {
  const faqs = await getFaq();

  if (!faqs || faqs.length === 0) {
    return (
      <p className="text-muted-foreground italic">
        Aucune question fréquente pour le moment.
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-3xl divide-y divide-border">
      {faqs.map((faq) => (
        <details
          key={faq._id}
          className="group py-4 [&[open]>summary]:mb-3"
        >
          <summary className="flex cursor-pointer items-center justify-between text-base font-medium text-foreground hover:text-gala-primary transition-colors list-none">
            {faq.question}
            <span className="ml-2 shrink-0 text-muted-foreground transition-transform group-open:rotate-180">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </summary>
          <div className="prose prose-sm max-w-none text-muted-foreground">
            {faq.answer}
          </div>
        </details>
      ))}
    </div>
  );
}