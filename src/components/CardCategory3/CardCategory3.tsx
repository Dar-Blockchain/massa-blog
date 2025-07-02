import React, { FC } from "react";
import { Link } from "react-router-dom";
import { TaxonomyType } from "../../data/types";
import { convertToStaticImageData } from "../../compat/next/image";

export interface CardCategory3Props {
  className?: string;
  taxonomy: TaxonomyType;
}

const CardCategory3: FC<CardCategory3Props> = ({
  className = "",
  taxonomy,
}) => {
  const { count, name, href = "/", thumbnail } = taxonomy;

  return (
    <Link
      to={href}
      className={`nc-CardCategory3 flex flex-col ${className}`}
    >
      <div className="flex-shrink-0 relative w-full aspect-w-5 aspect-h-4 sm:aspect-h-7 h-0 rounded-2xl overflow-hidden group">
        <img
          src={convertToStaticImageData(thumbnail || "")}
          className="object-cover w-full h-full rounded-2xl"
          alt={name}
        />
        <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity"></span>
      </div>
      <div className="mt-4 truncate">
        <h2 className={`text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-semibold truncate`}>
          {name}
        </h2>
        <span className={`block mt-2 text-sm text-neutral-500 dark:text-neutral-400`}>
          {count} Articles
        </span>
      </div>
    </Link>
  );
};

export default CardCategory3;
