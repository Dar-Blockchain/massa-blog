import React, { useEffect, useState } from "react";
import rightImg from "../images/hero-right.png";
import Vector1 from "../images/Vector1.png";
import { TaxonomyType } from "../data/types";
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
import { CategoryService } from "../services/categoryService";
import { DEMO_CATEGORIES } from "../data/taxonomies";

const LandingPage: React.FC = () => {
  const { connectedAccount } = useAccountStore();
  const [authors, setAuthors] = useState<PostAuthorType[]>([]);
  const [categories, setCategories] = useState<TaxonomyType[]>(DEMO_CATEGORIES);

  const fetchAuthors = async () => {
    try {
      const profiles: Profile[] = await AuthorService.getAuthors(connectedAccount);
      console.log('profiles,,,,,,,,,,,,,,,,,', profiles);
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

  const fetchCategories = async () => {
    try {
      const fetchedCategories = await CategoryService.getCategories(connectedAccount);
      if (fetchedCategories && fetchedCategories.length > 0) {
        const mappedCategories: TaxonomyType[] = fetchedCategories.map(cat => ({
          id: cat.id.toString(),
          name: cat.name,
          href: `/categories/${cat.name.toLowerCase().replace(/\s+/g, '-')}`,
          count: Number(cat.count),
          thumbnail: cat.thumbnail || "https://via.placeholder.com/500",
          taxonomy: "category"
        }));
        setCategories(mappedCategories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      // Don't show error toast since we're falling back to demo categories
      // toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    if (connectedAccount) {
      fetchAuthors();
      fetchCategories();
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
          categories={categories}
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
