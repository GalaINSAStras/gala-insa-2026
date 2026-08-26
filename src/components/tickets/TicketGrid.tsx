import { TicketCard, type TicketCardProps } from "./TicketCard";

export function TicketGrid({ tickets }: { tickets: TicketCardProps[] }) {
  return (
    <ul className="mx-auto grid w-full max-w-[1180px] list-none grid-cols-1 gap-x-8 gap-y-14 px-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10">
      {tickets.map((t, i) => (
        <li key={t.id ?? `${t.variant}-${i}`} className="flex justify-center">
          <TicketCard
            {...t}
            className="w-full max-w-[360px]"
            delay={i * 0.09}
          />
        </li>
      ))}
    </ul>
  );
}
