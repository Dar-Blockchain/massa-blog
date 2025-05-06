import React, { useEffect, useState } from "react";
import rightImg from "../images/hero-right.png";
import Vector1 from "../images/Vector1.png";
import { DEMO_CATEGORIES } from "../data/taxonomies";
import SectionHero from "../components/SectionHero/SectionHero";
import BackgroundSection from "../components/BackgroundSection/BackgroundSection";
import SectionSliderNewCategories from "../components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSliderNewAuthors from "../components/SectionSliderNewAthors/SectionSliderNewAuthors";
import SectionBecomeAnAuthor from "../components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import { AuthorService } from "../services/authorService";
import { Profile } from "../struct/Profile";
import { PostAuthorType } from "../data/types";
import { toast } from "react-toastify";
import { useAccountStore } from "@massalabs/react-ui-kit";

const LandingPage: React.FC = () => {
  const { connectedAccount } = useAccountStore();
  const [authors, setAuthors] = useState<PostAuthorType[]>([]);

  const fetchAuthors = async () => {
    try {
      const profiles: Profile[] = await AuthorService.getAuthors(connectedAccount);

      const mapped: PostAuthorType[] = profiles.map((profile) => ({
        id: profile.address,
        firstName: profile.firstName,
        lastName: profile.lastName,
        desc: profile.bio || "",
        displayName: `${profile.firstName} ${profile.lastName}`,
        avatar: profile.profilePicUrl || "https://via.placeholder.com/150",
        jobName: profile.firstName.toLowerCase(),
        href: `/author/${profile.address}`,
        count: 0,
        bgImage: profile.coverPhotoUrl?.trim() !== ""
          ? profile.coverPhotoUrl
          : "https://plus.unsplash.com/premium_photo-1673177667569-e3321a8d8256?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y292ZXIlMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D",
      }));

      setAuthors(mapped);
    } catch (error) {
      console.error("Error fetching authors:", error);
      toast.error("Failed to load authors");
    }
  };

  useEffect(() => {
    if (connectedAccount) {
      fetchAuthors();
    }
  }, [connectedAccount]);

  return (
    <div className="nc-PageHomeDemo3 relative">
      <div className="container relative">
        <SectionHero
          rightImg={rightImg}
          className="pt-10 pb-16 md:py-16 lg:pb-28 lg:pt-20"
          heading={
            <span>
              Voices unbound <br /> etched on{" "}
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
            heading="Authors"
            subHeading="Say hello to Our Authors"
            authors={authors}
          />
        </div>

        <SectionBecomeAnAuthor className="py-16 lg:py-28" />
      </div>
    </div>
  );
};

export default LandingPage;
