import { FC, useEffect, useState } from "react";
import { UIPostDataType } from "../../data/types";
import PostFeaturedMedia from "../PostFeaturedMedia/PostFeaturedMedia";
import { Link } from "react-router-dom";
import PostCardMeta from "../PostCardMeta/PostCardMeta";
import PostCardSaveAction from "../PostCardSaveAction/PostCardSaveAction";
import { Profile } from "../../struct/Profile";
import { AuthorService } from "../../services/authorService";
import { useAccountStore } from "@massalabs/react-ui-kit";

export interface Card11Props {
  className?: string;
  post: UIPostDataType;
  ratio?: string;
  hiddenAuthor?: boolean;
  profile?: Profile;
}

const Card11: FC<Card11Props> = ({
  className = "h-full",
  post,
  hiddenAuthor = false,
  ratio = "aspect-w-4 aspect-h-3",
  profile,
}) => {
  const [isHover, setIsHover] = useState(false);
  const [authorProfile, setAuthorProfile] = useState<Profile | null>(profile || null);
  const { connectedAccount } = useAccountStore();

  useEffect(() => {
    const fetchAuthorProfile = async () => {
      if (post.author && connectedAccount && !profile) {
        try {
          const profile = await AuthorService.getAuthorProfile(post.author, connectedAccount);
          setAuthorProfile(profile);
        } catch (error) {
          console.error("Error fetching author profile:", error);
        }
      }
    };

    fetchAuthorProfile();
  }, [post.author, connectedAccount, profile]);

  return (
    <div
      className={`nc-Card11 relative flex flex-col group rounded-3xl overflow-hidden bg-white dark:bg-neutral-900 ${className}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div
        className={`block flex-shrink-0 relative w-full rounded-t-3xl overflow-hidden z-10 ${ratio}`}
      >
        <div>
          <PostFeaturedMedia post={post} isHover={isHover} />
        </div>
      </div>
      <Link to={post.href || "/"} className="absolute inset-0"></Link>

      <div className="p-4 flex flex-col space-y-3">
        {!hiddenAuthor && authorProfile ? (
          <PostCardMeta meta={authorProfile} />
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
        <div className="flex items-end justify-end mt-auto">
          <PostCardSaveAction className="relative" />
        </div>
      </div>
    </div>
  );
};

export default Card11;
