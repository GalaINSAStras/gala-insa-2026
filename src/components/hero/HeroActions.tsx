import { CartoucheButton } from "@/components/ui/CartoucheButton";

export function HeroActions() {
  return (
    <div className="mt-10 flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-7 lg:mt-14">
      <CartoucheButton href="/billetterie" variant="primary">
        BILLETTERIE
      </CartoucheButton>

      <CartoucheButton href="/la-soiree" variant="secondary">
        DÉCOUVRIR LA SOIRÉE
      </CartoucheButton>
    </div>
  );
}
