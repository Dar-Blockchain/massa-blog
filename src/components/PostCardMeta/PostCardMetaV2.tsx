import React, { FC } from "react";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import { UIPostDataType } from "../../data/types";

export interface PostCardMetaV2Props {
  className?: string;
  meta: UIPostDataType;
  hiddenCategories?: boolean;
  size?: "large" | "normal";
  avatarRounded?: string;
}

const PostCardMetaV2: FC<PostCardMetaV2Props> = ({
  className = "leading-none",
  meta,
  hiddenCategories = false,
  size = "normal",
  avatarRounded,
}) => {
  const { date, author, title, href } = meta;

  return (
    <div
      className={`nc-PostCardMetaV2 inline-flex items-center flex-wrap text-neutral-800 dark:text-neutral-200 ${
        size === "normal" ? "text-xs" : "text-sm"
      } ${className}`}
    >
      <div className="relative flex items-center space-x-2 rtl:space-x-reverse">
        <Avatar
          radius={avatarRounded}
          sizeClass={size === "normal" ? "h-6 w-6" : "h-10 w-10"}
          imgUrl=""
          userName={author}
        />
        <div>
          <h4 className="text-sm font-semibold">{author}</h4>
          <span className="block mt-1 text-neutral-500 dark:text-neutral-400">
            {date}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostCardMetaV2;
