import { FC } from "react";

import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { PostAuthorType } from "../../data/types";
import { Link } from "react-router-dom";
import NcImage from "../NcImage/NcImage";
import Avatar from "../Avatar/Avatar";

export interface CardAuthorBox2Props {
  className?: string;
  author: PostAuthorType;
}

const CardAuthorBox2: FC<CardAuthorBox2Props> = ({
  className = "",
  author,
}) => {
  const { displayName, href = "/", avatar, jobName, count, bgImage } = author;
  return (
    <Link
      to={href}
      className={`nc-CardAuthorBox2 flex flex-col overflow-hidden bg-white dark:bg-neutral-800 rounded-3xl ${className}`}
    >
      <div className="relative flex-shrink-0 ">
        <div>
          <NcImage
            alt="author"
            containerClassName="flex aspect-w-7 aspect-h-5 w-full h-0"
            src={bgImage || ""}
            sizes="(max-width: 600px) 480px, 33vw"
          />
        </div>
    
      </div>

      <div className="-mt-8 m-8 text-center">
        <Avatar
          containerClassName="ring-2 ring-white"
          sizeClass="w-16 h-16 text-2xl"
          radius="rounded-full"
          imgUrl={avatar}
          userName={displayName}
        />
        <div className="mt-3">
          <h2 className={`text-base font-medium`}>
            <span className="line-clamp-1">{displayName}</span>
          </h2>
          <span
            className={`block mt-1 text-sm text-neutral-500 dark:text-neutral-400`}
          >
            @{jobName}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CardAuthorBox2;
