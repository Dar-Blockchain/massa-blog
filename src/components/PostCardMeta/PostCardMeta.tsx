import { FC, useEffect } from "react";

import { Link } from "react-router-dom";
import { PostDataType } from "../../data/types";
import Avatar from "../Avatar/Avatar";
import { Profile } from "../../struct/Profile";

export interface PostCardMetaProps {
  className?: string;
  hiddenAvatar?: boolean;
  avatarSize?: string;
  meta: Profile;
}

const PostCardMeta: FC<PostCardMetaProps> = ({
  className = "leading-none text-xs",
  meta,
  hiddenAvatar = false,
  avatarSize = "h-7 w-7 text-sm",
}) => {
  useEffect(() => {
    console.log("dataMeta", meta);
  }, [meta]);
  return (
    <>
    {meta &&
    <div
      className={`nc-PostCardMeta inline-flex items-center flex-wrap text-neutral-800 dark:text-neutral-200 ${className}`}
    >
      <Link
        to={`/author/${meta.address}`}
        className="relative flex items-center space-x-2 rtl:space-x-reverse"
      >
        {!hiddenAvatar && (
          <Avatar
            radius="rounded-full"
            sizeClass={avatarSize}
            imgUrl={meta.profilePicUrl}
            userName={meta.firstName}
          />
        )}
        <span className="block text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium">
          {meta.firstName} {meta.lastName}
        </span>
      </Link>
      <>
        <span className="text-neutral-500 dark:text-neutral-400 mx-[6px] font-medium">
          ·
        </span>
        
      </>
    </div>
    }
    </> 
  );
};

export default PostCardMeta;
