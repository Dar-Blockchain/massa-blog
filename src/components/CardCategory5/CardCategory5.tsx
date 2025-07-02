import React, { FC } from "react";

import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { TaxonomyType, TwMainColor } from "../../data/types";
import { Link } from "react-router-dom";
import Badge from "../Badge/Badge";
import { convertToStaticImageData } from "../../compat/next/image";

export interface CardCategory5Props {
  className?: string;
  taxonomy: TaxonomyType;
}

const CardCategory5: FC<CardCategory5Props> = ({
  className = "",
  taxonomy,
}) => {
  const { count, name, href = "/", thumbnail, color } = taxonomy;

  return (
    <Link
      to={href}
      className={`nc-CardCategory5 relative block group ${className}`}
    >
      <div className="flex-shrink-0 relative w-full aspect-w-8 aspect-h-5 h-0 rounded-3xl overflow-hidden z-0">
        <div>
          <div className="absolute inset-5">
            <img
              src={convertToStaticImageData(thumbnail || "")}
              className="absolute end-0 w-1/2 max-w-[260px] h-full object-contain"
              alt={name}
            />
          </div>
        </div>
        <span className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800"></span>
        <div className="absolute inset-5 flex flex-col">
          <div className="max-w-xs">
            <span className="opacity-75">{count} Articles</span>
            <h2 className={`mt-4 text-xl sm:text-2xl font-semibold`}>{name}</h2>
          </div>
        </div>
      </div>
      <Badge
        className="absolute top-3 end-3"
        color={color as TwMainColor}
        name={
          <div className="flex items-center">
            {count}
            <ArrowRightIcon className="ms-1.5 w-3.5 h-3.5 rtl:rotate-180" />
          </div>
        }
      />
    </Link>
  );
};

export default CardCategory5;
