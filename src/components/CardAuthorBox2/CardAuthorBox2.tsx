import React, { FC } from "react";
import { PostAuthorType } from "../../data/types";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import NcImage from "../NcImage/NcImage";
import { convertToStaticImageData } from "../../compat/next/image";

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
      className={`nc-CardAuthorBox2 flex flex-col overflow-hidden bg-white dark:bg-neutral-900 rounded-3xl ${className}`}
    >
      <div className="relative flex-shrink-0 ">
        <div>
          <NcImage
            containerClassName="flex aspect-w-7 aspect-h-5 w-full h-0"
            src={convertToStaticImageData(bgImage || "")}
            alt={displayName}
          />
        </div>
        <div className="absolute top-3 inset-x-3 flex">
          <div className=" py-1 px-4 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center leading-none text-xs font-medium">
            {jobName}
          </div>
        </div>
      </div>

      <div className="text-center flex flex-col items-center border-2 border-neutral-200 dark:border-neutral-700 rounded-3xl mx-2 mb-2 transform -mt-14 space-y-3 px-4 py-4 bg-white dark:bg-neutral-900">
        <Avatar
          containerClassName="ring-4 ring-white dark:ring-neutral-900"
          sizeClass="w-20 h-20 text-2xl"
          radius="rounded-full"
          imgUrl={convertToStaticImageData(avatar)}
          userName={displayName}
        />
        <div className="mt-2">
          <h2 className={`text-base font-medium`}>
            <span className="line-clamp-1">{displayName}</span>
          </h2>
          <span
            className={`block mt-1 text-sm text-neutral-500 dark:text-neutral-400`}
          >
            @{displayName}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CardAuthorBox2;
