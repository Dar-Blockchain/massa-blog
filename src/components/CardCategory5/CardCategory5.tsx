import { FC } from "react";

import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { TaxonomyType, TwMainColor } from "../../data/types";
import { Link } from "react-router-dom";
import Badge from "../Badge/Badge";

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
      <div
        className={`flex-shrink-0 relative w-full aspect-w-8 aspect-h-5 h-0 rounded-3xl overflow-hidden z-0 group`}
      >
        <img
          alt="thumbnail"
          src={thumbnail || ""}
          className="object-cover w-full h-full rounded-2xl"
          sizes="(min-width: 1024px) 20rem, (min-width: 640px) 16rem, 12rem"
        />
        <span className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-colors"></span>
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
      <div className="absolute inset-0 flex items-center justify-center">
        <h2
          className={`text-base font-medium px-4 py-2 sm:px-6 sm:py-3 bg-white text-neutral-900 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-full border-2 border-white border-opacity-60`}
        >
          {name}
        </h2>
      </div>
    </Link>
  );
};

export default CardCategory5;
