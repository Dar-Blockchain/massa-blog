import React, { FC } from "react";
import { UIPostDataType } from "../../data/types";
import { Link } from "react-router-dom";
import GallerySlider from "./GallerySlider";

export interface PostFeaturedMediaProps {
  className?: string;
  post: UIPostDataType;
  isHover?: boolean;
}

const PostFeaturedMedia: FC<PostFeaturedMediaProps> = ({
  className = "w-full h-full",
  post,
  isHover = false,
}) => {
  const { featuredImage, postType, videoUrl, galleryImgs, audioUrl, id, href } = post;

  const renderGallerySlider = () => {
    if (!galleryImgs?.length) return null;
    return (
      <GallerySlider
        galleryImgs={galleryImgs}
        className="absolute inset-0 z-10"
        ratioClass="absolute inset-0"
      />
    );
  };

  const renderContent = () => {
    // Gallery
    if (postType === "gallery") {
      return renderGallerySlider();
    }

    // Video
    if (postType === "video" && videoUrl) {
      return (
        <div className="absolute inset-0">
          <img src={featuredImage} alt="video" className="object-cover w-full h-full" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white bg-opacity-30 rounded-full p-3">
              <i className="las la-play text-2xl"></i>
            </div>
          </div>
        </div>
      );
    }

    // Audio
    if (postType === "audio" && audioUrl) {
      return (
        <div className="absolute inset-0">
          <img src={featuredImage} alt="audio" className="object-cover w-full h-full" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white bg-opacity-30 rounded-full p-3">
              <i className="las la-music text-2xl"></i>
            </div>
          </div>
        </div>
      );
    }

    // Standard
    return (
      <img
        src={featuredImage}
        className="object-cover w-full h-full"
        alt={post.title}
      />
    );
  };

  return (
    <div className={`nc-PostFeaturedMedia relative ${className}`}>
      {renderContent()}
      <Link to={href || "/"} className="absolute inset-0"></Link>
    </div>
  );
};

export default PostFeaturedMedia;
