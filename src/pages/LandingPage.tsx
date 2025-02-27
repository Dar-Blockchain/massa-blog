import React from "react";
import rightImg from "../images/hero-right.png";
import Vector1 from "../images/Vector1.png";
import { DEMO_CATEGORIES } from "../data/taxonomies";
import SectionHero from "../components/SectionHero/SectionHero";
import BackgroundSection from "../components/BackgroundSection/BackgroundSection";
import SectionSliderNewCategories from "../components/SectionSliderNewCategories/SectionSliderNewCategories";
import { DEMO_AUTHORS } from "../data/authors";
import SectionSliderNewAuthors from "../components/SectionSliderNewAthors/SectionSliderNewAuthors";
import SectionBecomeAnAuthor from "../components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";

const LandingPage: React.FC = () => {
  return (
    <div className="nc-PageHomeDemo3 relative">
      <div className="container relative">
        <SectionHero
          rightImg={rightImg}
          className="pt-10 pb-16 md:py-16 lg:pb-28 lg:pt-20"
          heading={
            <span>
              Voices unbound <br /> etched on {` `}
              <span className="relative pr-3">
                <img
                  className="w-full absolute top-1/2 -start-1 transform -translate-y-1/2"
                  src={Vector1}
                  alt=""
                />
                <span className="relative">Massa</span>
              </span>
            </span>
          }
          btnText="Start Sharing"
          subHeading="A decentralized space where your stories thrive, owned by no one, shared by all—powered by Massa 🎉"
        />

        <SectionSliderNewCategories
          className="py-16 lg:py-28"
          heading="Most popular topics"
          subHeading="Dive into Various Themes"
          categories={DEMO_CATEGORIES.filter((_, i) => i < 10)}
          categoryCardType="card4"
        />

        <div className="relative py-16">
          <BackgroundSection />
          <SectionSliderNewAuthors
            heading="Newest authors"
            subHeading="Say hello to future creator potentials"
            authors={DEMO_AUTHORS.filter((_, i) => i < 10)}
          />
        </div>

        <SectionBecomeAnAuthor className="py-16 lg:py-28" />
      </div>
    </div>
  );
};

export default LandingPage;
