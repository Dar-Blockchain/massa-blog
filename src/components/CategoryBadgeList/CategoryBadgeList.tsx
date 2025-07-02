import React, { FC } from "react";
import { Link } from "react-router-dom";
import { TaxonomyType, UIPostDataType } from "../../data/types";

export interface CategoryBadgeListProps {
  className?: string;
  itemClass?: string;
  categories?: TaxonomyType[];
}

const CategoryBadgeList: FC<CategoryBadgeListProps> = ({
  className = "flex flex-wrap space-x-2 rtl:space-x-reverse",
  itemClass,
  categories = [],
}) => {
  return (
    <div className={`nc-CategoryBadgeList ${className}`}>
      {categories.map((item, index) => (
        <Link
          key={index}
          to={item.href || "/"}
          className={`nc-Badge inline-flex px-2.5 py-1 rounded-full font-medium text-xs relative my-1 ${itemClass}`}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default CategoryBadgeList;
