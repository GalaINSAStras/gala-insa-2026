import { PageBackdrop } from "@/components/ornaments/PageBackdrop";
import { TeaserFrame } from "./TeaserFrame";
import { TeaserCarousel } from "./TeaserCarousel";
import { HeroStage } from "./HeroStage";
import { EditionBadge } from "./EditionBadge";
import { HeroTitle } from "./HeroTitle";
import { HeroMeta } from "./HeroMeta";
import { HeroActions } from "./HeroActions";
import { GALA, TEASER_SLIDES } from "@/lib/hero-data";

export function TopSection() {
  return (
    <header className="relative isolate overflow-hidden">
      <PageBackdrop />

      {/* Teaser — conteneur d'origine */}
      <div className="relative mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <div className="pt-10 md:pt-8 lg:pt-12">
          <TeaserFrame>
            <TeaserCarousel slides={TEASER_SLIDES} />
          </TeaserFrame>
        </div>
      </div>

      {/* Hero — conteneur plus large sur grand écran pour écarter les colonnes */}
      <div className="relative mx-auto mt-10 max-w-[1180px] px-4 sm:px-6 md:mt-14 lg:max-w-[1360px] lg:px-8">
        <HeroStage>
          <EditionBadge edition={GALA.edition} />
          <div className="mt-2 md:mt-3 lg:mt-5">
            <HeroTitle title={GALA.title} school={GALA.school} />
          </div>
          <HeroMeta />
          <HeroActions />
        </HeroStage>
      </div>
    </header>
  );
}
