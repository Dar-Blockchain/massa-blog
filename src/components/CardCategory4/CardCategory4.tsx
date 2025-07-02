import React, { FC } from "react";
import { TaxonomyType } from "../../data/types";
import { Link } from "react-router-dom";
import { convertToStaticImageData } from "../../compat/next/image";

export interface CardCategory4Props {
  className?: string;
  taxonomy: TaxonomyType;
}

const CardCategory4: FC<CardCategory4Props> = ({
  className = "",
  taxonomy,
}) => {
  const { count, name, href = "/", thumbnail } = taxonomy;

  return (
    <Link
      to={href}
      className={`nc-CardCategory4 flex flex-col ${className}`}
      data-nc-id="CardCategory4"
    >
      <div className="flex-shrink-0 relative w-full aspect-w-7 aspect-h-5 h-0 rounded-3xl overflow-hidden group">
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
    </Link>
  );
};

export default CardCategory4;
