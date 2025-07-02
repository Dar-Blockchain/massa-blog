"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthorService } from "../services/authorService";
import { Profile } from "../struct/Profile";
import { useAccountStore } from "@massalabs/react-ui-kit";
import { toast } from "react-toastify";

import { PostAuthorType, PostDataType } from "../data/types";
import { DEMO_POSTS } from "../data/posts";
import NcImage from "../components/NcImage/NcImage";
import { GlobeAltIcon, ShareIcon } from "@heroicons/react/24/solid";
import SocialsList from "../components/SocialsList/SocialsList";
import NcDropDown from "../components/NcDropDown/NcDropDown";
import { SOCIALS_DATA } from "../components/SocialsShare/SocialsShare";
import Nav from "../components/Nav/Nav";
import NavItem from "../components/NavItem/NavItem";
import Card11 from "../components/Card11/Card11";
import BackgroundSection from "../components/BackgroundSection/BackgroundSection";
import { DEMO_CATEGORIES } from "../data/taxonomies";
import ButtonSecondary from "../components/Button/ButtonSecondary";
import SectionSliderNewAuthors from "../components/SectionSliderNewAthors/SectionSliderNewAuthors";
import { DEMO_AUTHORS } from "../data/authors";
import SectionSubscribe2 from "../components/SectionSubscribe2/SectionSubscribe2";
import SectionGridCategoryBox from "../components/SectionGridCategoryBox/SectionGridCategoryBox";
import AccountActionDropdown from "../components/AccountActionDropdown/AccountActionDropdown";
import FollowButton from "../components/FollowButton";
import VerifyIcon from "../components/VerifyIcon";
import Pagination from "../components/Pagination/Pagination";
import ButtonPrimary from "../components/Button/ButtonPrimary";
import { avatarImgs } from "../contains/fakeData";

// const posts: PostDataType[] = DEMO_POSTS.filter((_, i) => i < 12);
const TABS = ["Articles", "Favorites", "Saved"];

const PageAuthor = () => {
  const [tabActive, setTabActive] = useState<string>(TABS[0]);
  const { authorId } = useParams();
  const { connectedAccount } = useAccountStore();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!authorId || !connectedAccount) return;
      try {
        const data = await AuthorService.getAuthorProfile(authorId, connectedAccount);
        setProfile(data);
        console.log("profile", data);
      } catch (err) {
        toast.error("Failed to load profile.");
        console.error(err);
      }
    };

    fetchProfile();
  }, [authorId, connectedAccount]);

  const handleClickTab = (item: string) => {
    if (item === tabActive) return;
    setTabActive(item);
  };
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
  const [posts, setPosts] = useState<PostDataType[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!authorId || !connectedAccount) return;
      try {
        console.log("authorId", authorId);
        const fetchedPosts = await AuthorService.getPostsByAuthor(authorId, connectedAccount);

        const formattedPosts: PostDataType[] = fetchedPosts.map((post) => ({
          id: post.id?.toString?.() || "",
          author: post.author,
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          featuredImage: post.featuredImage || `https://source.unsplash.com/random/800x600?sig=${post.id}`,
          categoryId: post.categoryId,
          tags: post.tags,
          readingTime: Number(post.readingTime?.toString?.() || 0),
          createdAt: new Date(Number(post.createdAt?.toString?.() || 0)).toISOString(),
          href: `/post/${post.id?.toString?.() || ""}`,
          like: {
            count: 0,
            isLiked: false,
          },
          bookmark: {
            count: 0,
            isBookmarked: false,
          },
          commentCount: 0,
          viewdCount: 0,
          postType: "standard",
        }));

        setPosts(formattedPosts);
        console.log("formattedPosts", formattedPosts);
      } catch (err) {
        toast.error("Failed to load posts.");
        console.error(err);
      }
    };

    fetchPosts();
    console.log("posts2", posts);
  }, [authorId, connectedAccount]);

  return (
    <div className="nc-PageAuthor">
      {/* HEADER */}
      <div className="w-full">
        <div className="relative w-full h-40 md:h-60 2xl:h-72">
          <NcImage
            alt=""
            containerClassName="absolute inset-0"
            sizes="(max-width: 1280px) 100vw, 1536px"
            src="https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="container -mt-10 lg:-mt-16">
          <div className="relative bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 p-5 lg:p-8 rounded-3xl md:rounded-[40px] shadow-xl flex flex-col md:flex-row">
            <div className="w-32 lg:w-40 flex-shrink-0 mt-12 sm:mt-0">
              <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold rounded-full w-20 h-20 text-xl lg:text-2xl lg:w-36 lg:h-36 ring-4 ring-white dark:ring-0 shadow-2xl z-0">
                <img
                  alt="Avatar"
                  src={
                    profile?.profilePicUrl?.trim()
                      ? profile.profilePicUrl
                      : avatarImgs[3]
                  }
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Author information */}
            <div className="pt-5 md:pt-1 lg:ml-6 xl:ml-12 flex-grow">
              <div className="max-w-screen-sm space-y-3.5">
                <h2 className="inline-flex items-center text-2xl sm:text-3xl lg:text-4xl font-semibold">
                  <span>
                    {profile
                      ? `${profile.firstName} ${profile.lastName}`
                      : "Author name"}
                  </span>
                  <VerifyIcon
                    className="ml-2"
                    iconClass="w-6 h-6 sm:w-7 sm:h-7 xl:w-8 xl:h-8"
                  />
                </h2>
                <span className="block text-sm text-neutral-500 dark:text-neutral-400">
                  {profile?.bio ||
                    "This author has not added a biography yet."}
                </span>
                <a
                  href={profile?.website || "#"}
                  className="flex items-center text-xs font-medium space-x-2.5 rtl:space-x-reverse cursor-pointer text-neutral-500 dark:text-neutral-400 truncate"
                >
                  <GlobeAltIcon className="flex-shrink-0 w-4 h-4" />
                  <span className="text-neutral-700 dark:text-neutral-300 truncate">
                    {profile?.website || "https://example.com/me"}
                  </span>
                </a>
                <SocialsList itemClass="block w-7 h-7" />
              </div>
            </div>

          
          </div>
        </div>
      </div>
      {/* END HEADER */}

      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
        <main>
          {/* TABS FILTER */}
        

          {/* LOOP ITEMS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-8 lg:mt-10">
            {posts && posts.map((post) => (
              <Card11 key={post.id} post={post} profile={profile as Profile} />
            ))}
          </div>

          {/* PAGINATION */}
          <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
            <ButtonPrimary>Show me more</ButtonPrimary>
          </div>
        </main>

        {/* SECTION: Categories grid */}
        {/* <div className="relative py-16">
          <BackgroundSection />
          <SectionGridCategoryBox
            categories={DEMO_CATEGORIES.filter((_, i) => i < 10)}
          />
          <div className="text-center mx-auto mt-10 md:mt-16">
            <ButtonSecondary>Show me more</ButtonSecondary>
          </div>
        </div> */}

        {/* SECTION: Slider for authors */}
        <SectionSliderNewAuthors
          heading="Top elite authors"
          subHeading="Discover our elite writers"
          authors={authors}
        />

        {/* SUBSCRIBE SECTION */}
        {/* <SectionSubscribe2 /> */}
      </div>
    </div>
  );
};

export default PageAuthor;
