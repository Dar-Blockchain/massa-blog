import { FC } from "react";
import { PostAuthorType } from "../data/types";
import { Link } from "react-router-dom";
import Avatar from "./Avatar/Avatar";
import { DEMO_AUTHORS } from "../data/authors";
import { Profile } from "../struct/Profile";

export interface SingleAuthorProps {
  author?: PostAuthorType;
  profile?: Profile;
}

const SingleAuthor: FC<SingleAuthorProps> = ({ author = DEMO_AUTHORS[1], profile }) => {
  return (
    <div className="nc-SingleAuthor flex">
      <Link to={author.href}>
        <Avatar
          imgUrl={profile?.profilePicUrl}
          userName={profile?.firstName}
          sizeClass="h-12 w-12 text-lg sm:text-xl sm:h-24 sm:w-24"
        />
      </Link>
      <div className="flex flex-col ml-3 max-w-lg sm:ml-5">
        <span className="text-xs text-neutral-400 uppercase tracking-wider">
          WRITTEN BY
        </span>
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
          <Link to={`/author/${profile?.address}`}>{profile?.firstName + " " + profile?.lastName}</Link>
        </h2>
        <span className="block mt-1 text-sm text-neutral-500 sm:text-base dark:text-neutral-300">
          {profile?.bio}
          {/* <Link className="text-primary-6000 font-medium ml-1" to={author.href}>
            Read more
          </Link> */}
        </span>
      </div>
    </div>
  );
};

export default SingleAuthor;
