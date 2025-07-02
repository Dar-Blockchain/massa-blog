import React, { FC } from "react";
import { Link } from "react-router-dom";
import PostCardMeta from "../PostCardMeta/PostCardMeta";
import { UIPostDataType } from "../../data/types";
import PostTypeFeaturedIcon from "../PostTypeFeaturedIcon/PostTypeFeaturedIcon";

export interface Card12Props {
  className?: string;
  post: UIPostDataType;
}

const Card12: FC<Card12Props> = ({ className = "h-full", post }) => {
  const { title, href, featuredImage, desc, postType } = post;

  return (
    <div className={`nc-Card12 group relative flex flex-col ${className}`}>
      <Link
        to={href || "/"}
        className="block flex-shrink-0 flex-grow relative w-full h-0 aspect-w-4 aspect-h-3 rounded-3xl overflow-hidden"
      >
        <div>
          <img
            src={featuredImage}
            className="object-cover w-full h-full"
            alt={title}
          />
        </div>
        <span>
          <PostTypeFeaturedIcon
            className="absolute top-3 left-3"
            postType={postType}
            wrapSize="w-7 h-7"
            iconSize="w-4 h-4"
          />
        </span>
      </Link>

      <div className="mt-5 px-4 flex flex-col">
        <h2
          className={`nc-card-title block font-semibold text-neutral-900 dark:text-neutral-100 transition-colors text-base sm:text-lg lg:text-base xl:text-lg`}
        >
          <Link to={href || "/"} className="line-clamp-2" title={title}>
            {title}
          </Link>
        </h2>
        <span className="block text-neutral-500 dark:text-neutral-400 text-sm line-clamp-2 sm:text-base mt-4">
          {desc}
        </span>
        <PostCardMeta className="mt-5 text-sm" meta={post} />
      </div>
    </div>
  );
};

export default Card12;
