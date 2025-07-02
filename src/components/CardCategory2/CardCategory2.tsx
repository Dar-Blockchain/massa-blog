import React, { FC } from "react";
import { TaxonomyType } from "../../data/types";
import { Link } from "react-router-dom";
import NcImage from "../NcImage/NcImage";
import { convertToStaticImageData } from "../../compat/next/image";

export interface CardCategory2Props {
  className?: string;
  taxonomy: TaxonomyType;
  index?: string;
}

const CardCategory2: FC<CardCategory2Props> = ({
  className = "",
  taxonomy,
  index,
}) => {
  const { count, name, href = "/", thumbnail } = taxonomy;

  return (
    <Link
      to={href}
      className={`nc-CardCategory2 relative flex flex-col items-center justify-center text-center px-3 py-5 sm:p-6 bg-white dark:bg-neutral-900 rounded-3xl transition-colors ${className}`}
    >
      {index && (
        <div className="absolute w-8 h-8 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 text-sm rounded-full left-3 top-3">
          {index}
        </div>
      )}
      <NcImage
        containerClassName="flex-shrink-0 w-20 h-20 rounded-full overflow-hidden"
        src={convertToStaticImageData(thumbnail || "")}
        alt={name}
      />
      <div className="mt-3">
        <h2 className={`text-base font-semibold`}>{name}</h2>
        <span className="block mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          {count} Articles
        </span>
      </div>
    </Link>
  );
};

export default CardCategory2;
