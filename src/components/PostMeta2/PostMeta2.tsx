import React, { FC } from "react";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import { UIPostDataType } from "../../data/types";

export interface PostMeta2Props {
  className?: string;
  meta: UIPostDataType;
  hiddenCategories?: boolean;
  size?: "large" | "normal";
  avatarRounded?: string;
}

const PostMeta2: FC<PostMeta2Props> = ({
  className = "leading-none",
  meta,
  hiddenCategories = false,
  size = "normal",
  avatarRounded,
}) => {
  const { date, author, categories } = meta;

  return (
    <div
      className={`nc-PostMeta2 flex items-center flex-wrap text-neutral-800 dark:text-neutral-200 ${
        size === "normal" ? "text-xs" : "text-sm"
      } ${className}`}
    >
      <div className="flex items-center">
        <Avatar
          radius={avatarRounded}
          sizeClass={size === "normal" ? "h-6 w-6" : "h-10 w-10"}
          imgUrl=""
          userName={author}
        />
        <div className="ml-3">
          <div className="flex items-center">
            <h4 className="font-semibold">{author}</h4>
            <span className="mx-2 font-semibold">·</span>
            <span className="text-neutral-500 dark:text-neutral-400">{date}</span>
          </div>
          {!hiddenCategories && categories && categories.length > 0 && (
            <div className="text-xs mt-[6px]">
              <span className="text-neutral-500 dark:text-neutral-400">
                {categories.map((cat, index) => (
                  <Link
                    key={cat.id}
                    to={cat.href || "/"}
                    className="text-neutral-900 dark:text-neutral-200 hover:text-primary-500 dark:hover:text-primary-400"
                  >
                    {cat.name}
                    {index < categories.length - 1 && ", "}
                  </Link>
                ))}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostMeta2;
