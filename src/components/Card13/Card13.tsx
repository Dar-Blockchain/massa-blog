import React, { FC } from "react";
import { Link } from "react-router-dom";
import { UIPostDataType } from "../../data/types";
import PostCardMeta from "../PostCardMeta/PostCardMeta";
import PostTypeFeaturedIcon from "../PostTypeFeaturedIcon/PostTypeFeaturedIcon";

export interface Card13Props {
  className?: string;
  post: UIPostDataType;
}

const Card13: FC<Card13Props> = ({ className = "h-full", post }) => {
  const { title, href, desc, featuredImage, date, postType } = post;

  return (
    <div className={`nc-Card13 relative flex flex-col group ${className}`}>
      <div className="block flex-shrink-0 flex-grow relative w-full h-0 pt-[75%] sm:pt-[55%] rounded-3xl overflow-hidden">
        <div className="absolute inset-0">
          <img src={featuredImage} className="object-cover w-full h-full" alt={title} />
        </div>
        <span className="absolute top-3 left-3">
          <PostTypeFeaturedIcon
            className=""
            postType={postType}
            wrapSize="w-7 h-7"
            iconSize="w-4 h-4"
          />
        </span>
      </div>
      <div className="mt-5 sm:mt-8 pe-10 flex flex-col">
        <h2 className={`nc-card-title block font-semibold text-neutral-900 dark:text-neutral-100 transition-colors sm:text-lg lg:text-2xl`}>
          <Link to={href || "/"} className="line-clamp-2" title={title}>
            {title}
          </Link>
        </h2>
        <span className="hidden sm:block mt-4 text-neutral-500 dark:text-neutral-400">
          <span className="line-clamp-2">{desc}</span>
        </span>
        <PostCardMeta className="mt-5 text-sm" meta={post} />
      </div>
    </div>
  );
};

export default Card13;
