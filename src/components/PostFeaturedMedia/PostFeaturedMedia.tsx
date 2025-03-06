import { FC } from "react";
import GallerySlider from "./GallerySlider";
import { PostDataType } from "../../data/types";
import { Link } from "react-router-dom";
import PostTypeFeaturedIcon from "../PostTypeFeaturedIcon/PostTypeFeaturedIcon";

export interface PostFeaturedMediaProps {
  className?: string;
  post: PostDataType;
  isHover?: boolean;
}

const PostFeaturedMedia: FC<PostFeaturedMediaProps> = ({
  className = "w-full h-full",
  post,
  isHover = false,
}) => {
  const { featuredImage, postType, videoUrl, galleryImgs, audioUrl, id, href } =
    post;

  const isPostMedia = () => postType === "video" || postType === "audio";

  const renderGallerySlider = () => {
    if (!galleryImgs) return null;
    return (
      <GallerySlider
        href={href}
        galleryImgs={galleryImgs}
        className="absolute inset-0 z-10"
        galleryClass="absolute inset-0"
        ratioClass="absolute inset-0"
      />
    );
  };

  const renderContent = () => {
    // GALLERY
    if (postType === "gallery") {
      return renderGallerySlider();
    }

    // // VIDEO
    // if (postType === "video" && !!videoUrl && isHover) {
    //   return <MediaVideo isHover videoUrl={videoUrl} />;
    // }

    // // AUDIO
    // if (postType === "audio" && !!audioUrl) {
    //   return <MediaAudio post={post} />;
    // }

    // ICON
    return isPostMedia() ? (
      <span className="absolute inset-0 flex items-center justify-center ">
        <PostTypeFeaturedIcon
          className="hover:scale-105 transform cursor-pointer transition-transform"
          postType={postType}
        />
      </span>
    ) : null;
  };

  return (
    <div className={`nc-PostFeaturedMedia relative ${className}`}>
      {postType !== "gallery" && (
        <img
          alt="featured"
          className="object-cover"
          src={featuredImage}
          sizes="(max-width: 600px) 480px, 800px"
        />
      )}
      {renderContent()}
      {postType !== "gallery" && (
        <Link
          to={href}
          className={`block absolute inset-0 ${
            !postType || postType === "standard"
              ? "bg-black/20 transition-opacity opacity-0 group-hover:opacity-100"
              : ""
          }`}
        />
      )}
    </div>
  );
};

export default PostFeaturedMedia;
