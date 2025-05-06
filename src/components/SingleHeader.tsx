import { FC } from "react";
import { TaxonomyType } from "../data/types";
import CategoryBadgeList from "./CategoryBadgeList/CategoryBadgeList";
import SingleTitle from "./SingleTitle";
import PostMeta2 from "./PostMeta2/PostMeta2";
import SingleMetaAction2 from "./SingleMetaAction2";

export interface SingleHeaderProps {
  hiddenDesc?: boolean;
  titleMainClass?: string;
  className?: string;
  title: string;
  excerpt: string;
  readingTime?: number;
  categories?: TaxonomyType[];
  authorAddress?: string; // ✅ New prop

}

const SingleHeader: FC<SingleHeaderProps> = ({
  titleMainClass,
  hiddenDesc = false,
  className = "",
  title,
  excerpt,
  readingTime,
  categories = [],
}) => {
  return (
    <div className={`nc-SingleHeader ${className}`}>
      <div className="space-y-5">
        {categories.length > 0 && (
          <CategoryBadgeList itemClass="!px-3" categories={categories} />
        )}
        <SingleTitle mainClass={titleMainClass} title={title} />
        {!hiddenDesc && (
          <>
            <span className="block text-base text-neutral-500 md:text-lg dark:text-neutral-400 pb-1">
              {excerpt}
            </span>
            {readingTime !== undefined && (
              <span className="block text-sm text-neutral-500 dark:text-neutral-400">
                🕒 {readingTime} min read
              </span>
            )}
          </>
        )}
        {/* <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div> */}
        {/* <div className="flex flex-col sm:flex-row justify-between sm:items-end space-y-5 sm:space-y-0 sm:space-x-5 rtl:space-x-reverse">
          <PostMeta2
            size="large"
            className="leading-none flex-shrink-0"
            hiddenCategories
            avatarRounded="rounded-full shadow-inner"
          />
          <SingleMetaAction2 />
        </div> */}
      </div>
    </div>
  );
};

export default SingleHeader;
