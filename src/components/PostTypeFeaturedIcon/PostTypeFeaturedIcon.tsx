import React, { FC } from "react";
import { UIPostDataType } from "../../data/types";
import { PlayIcon } from "@heroicons/react/24/solid";
import { PhotoIcon, MusicalNoteIcon } from "@heroicons/react/24/outline";

export interface PostTypeFeaturedIconProps {
  className?: string;
  postType?: UIPostDataType["postType"];
  wrapSize?: string;
  iconSize?: string;
}

const PostTypeFeaturedIcon: FC<PostTypeFeaturedIconProps> = ({
  className = "",
  postType = "standard",
  wrapSize = "w-11 h-11",
  iconSize = "w-6 h-6",
}) => {
  const renderIcon = () => {
    switch (postType) {
      case "video":
        return <PlayIcon className={iconSize} />;
      case "audio":
        return <MusicalNoteIcon className={iconSize} />;
      case "gallery":
        return <PhotoIcon className={iconSize} />;
      default:
        return null;
    }
  };

  if (!postType || postType === "standard") {
    return null;
  }

  return (
    <div
      className={`nc-PostTypeFeaturedIcon ${className}`}
      data-nc-id="PostTypeFeaturedIcon"
    >
      <div
        className={`flex items-center justify-center ${wrapSize} bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-200 rounded-full`}
      >
        {renderIcon()}
      </div>
    </div>
  );
};

export default PostTypeFeaturedIcon;
