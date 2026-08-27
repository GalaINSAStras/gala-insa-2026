import type { ReactNode } from "react";

export function HeroStage({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      {/* Colonnes mobiles — visibles, croppées aux bords de l'écran */}
      <div aria-hidden className="pointer-events-none absolute inset-0 md:hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/ornaments/colonne_gauche.svg"
          alt=""
          className="absolute -left-4 top-0 h-full w-56 -translate-x-1/2 object-contain object-bottom sm:-left-6"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/ornaments/colonne_droite.svg"
          alt=""
          className="absolute -right-4 top-0 h-full w-56 translate-x-1/2 object-contain object-bottom sm:-right-6"
        />
      </div>

      <div className="grid items-stretch gap-0 grid-cols-1 md:grid-cols-[clamp(110px,14vw,210px)_minmax(0,1fr)_clamp(110px,15vw,210px)] lg:grid-cols-[clamp(150px,17vw,270px)_minmax(0,1fr)_clamp(150px,17vw,270px)]">
        {/* Colonne gauche */}
        <div className="relative hidden md:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/ornaments/colonne_gauche.svg"
            alt=""
            aria-hidden
            loading="eager"
            className="absolute inset-0 select-none object-contain object-bottom"
          />
        </div>

        {/* Contenu central */}
        <div className="relative px-4 pt-2 pb-10 text-center md:px-8 md:pt-4 md:pb-16 lg:pb-48">{children}</div>

        {/* Colonne droite */}
        <div className="relative hidden md:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/ornaments/colonne_droite.svg"
            alt=""
            aria-hidden
            loading="eager"
            className="absolute inset-0 select-none object-contain object-bottom"
          />
        </div>
      </div>
    </div>
  );
}
