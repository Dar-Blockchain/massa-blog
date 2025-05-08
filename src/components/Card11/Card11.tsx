import { FC, useEffect, useState } from "react";
import { PostDataType } from "../../data/types";
import PostFeaturedMedia from "../PostFeaturedMedia/PostFeaturedMedia";
import { Link } from "react-router-dom";
import CategoryBadgeList from "../CategoryBadgeList/CategoryBadgeList";
import PostCardMeta from "../PostCardMeta/PostCardMeta";
import PostCardLikeAndComment from "../PostCardLikeAndComment/PostCardLikeAndComment";
import PostCardSaveAction from "../PostCardSaveAction/PostCardSaveAction";
import { Profile } from "../../struct/Profile";

export interface Card11Props {
  className?: string;
  post: PostDataType;
  ratio?: string;
  hiddenAuthor?: boolean;
  profile: Profile;
}

const Card11: FC<Card11Props> = ({
  className = "h-full",
  post,
  hiddenAuthor = false,
  ratio = "aspect-w-4 aspect-h-3",
  profile,
}) => {

  const [isHover, setIsHover] = useState(false);
  useEffect(() => {
    console.log("postCard", post);
    console.log("profile", profile);
  }, [post, profile]);
  return (
    <>
      {post && profile &&
        <div
          className={`nc-Card11 relative flex flex-col group rounded-3xl overflow-hidden bg-white dark:bg-neutral-900 ${className}`}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        //
        >
          <div
            className={`block flex-shrink-0 relative w-full rounded-t-3xl overflow-hidden z-10 ${ratio}`}
          >
            <div>
              <PostFeaturedMedia post={post} isHover={isHover} />
            </div>
          </div>
          <Link to={`/author/${profile.address}/post/${post.id}`} className="absolute inset-0"></Link>
          {/* <span className="absolute top-3 inset-x-3 z-10">
            <CategoryBadgeList categories={1} />
          </span> */}

          <div className="p-4 flex flex-col space-y-3">
            {!hiddenAuthor && profile ? (
              <PostCardMeta meta={profile} />
            ) : (
              <span className="text-xs text-neutral-500">{post.createdAt}</span>
            )}
            <h3 className="nc-card-title block text-base font-semibold text-neutral-900 dark:text-neutral-100">
              <span className="line-clamp-2" title={post.title}>
                {post.title}
              </span>
            </h3>
            <span title={post.title}>
              {post.excerpt}
            </span>
            <div className="flex items-end justify-between mt-auto">
              <PostCardLikeAndComment className="relative" />
              <PostCardSaveAction className="relative" />
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Card11;
