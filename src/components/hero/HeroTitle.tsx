import { Fleuron } from "./Fleuron";

export function HeroTitle({ title, school }: { title: string; school: string }) {
  return (
    <div className="relative w-full">
      <h1
        className="whitespace-nowrap leading-[.95] text-ardoise text-[clamp(3rem,11vw,7.5rem)] [text-shadow:0_2px_18px_rgba(63,91,118,.14)]"
        style={{ fontFamily: "var(--font-title)" }}
      >
        {title}
      </h1>

      <div className="mt-1 flex items-center justify-center gap-3 lg:mt-3">
        <Fleuron className="h-3 w-10 md:w-14" />
        <p className="font-titre whitespace-nowrap text-[clamp(.85rem,2vw,1.2rem)] tracking-[.14em] text-ardoise/90">
          {school.toUpperCase()}
        </p>
        <Fleuron className="h-3 w-10 scale-x-[-1] md:w-14" />
      </div>
    </div>
  );
}
