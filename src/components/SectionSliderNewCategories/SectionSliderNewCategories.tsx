import { FC, useEffect, useState } from "react";
import { useAccountStore } from "@massalabs/react-ui-kit";
import { TaxonomyType } from "../../data/types";
import CardCategory1 from "../CardCategory1/CardCategory1";
import CardCategory2 from "../CardCategory2/CardCategory2";
import CardCategory3 from "../CardCategory3/CardCategory3";
import CardCategory4 from "../CardCategory4/CardCategory4";
import CardCategory5 from "../CardCategory5/CardCategory5";
import Heading from "../Heading/Heading";
import MySlider from "../MySlider";
import { CategoryService } from "../../services/categoryService";

export interface SectionSliderNewCategoriesProps {
  className?: string;
  heading: string;
  subHeading: string;
  categories: TaxonomyType[];
  categoryCardType?: "card1" | "card2" | "card3" | "card4" | "card5";
  itemPerRow?: 4 | 5;
}

const SectionSliderNewCategories: FC<SectionSliderNewCategoriesProps> = ({
  heading,
  subHeading,
  className = "",
  categories: initialCategories,
  itemPerRow = 5,
  categoryCardType = "card3",
}) => {
  const { connectedAccount } = useAccountStore();
  const [categories, setCategories] = useState<TaxonomyType[]>(initialCategories);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoriesWithCounts = async () => {
      if (!connectedAccount) return;

      try {
        const categoriesWithCounts = await Promise.all(
          initialCategories.map(async (category) => {
            try {
              const posts = await CategoryService.getPostsByCategory(
                connectedAccount,
                category.name
              );
              return {
                ...category,
                count: posts.length
              };
            } catch (error) {
              console.error(`Error fetching posts for category ${category.name}:`, error);
              return {
                ...category,
                count: 0
              };
            }
          })
        );

        setCategories(categoriesWithCounts);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesWithCounts();
  }, [connectedAccount, initialCategories]);

  const renderCard = (item: TaxonomyType, index: number) => {
    const topIndex = index < 3 ? `#${index + 1}` : undefined;
    switch (categoryCardType) {
      case "card1":
        return <CardCategory1 key={index} taxonomy={item} />;
      case "card2":
        return <CardCategory2 key={index} index={topIndex} taxonomy={item} />;
      case "card3":
        return <CardCategory3 key={index} taxonomy={item} />;
      case "card4":
        return <CardCategory4 key={index} index={topIndex} taxonomy={item} />;
      case "card5":
        return <CardCategory5 key={index} taxonomy={item} />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className={`nc-SectionSliderNewCategories ${className}`}>
        <Heading desc={subHeading}>{heading}</Heading>
        <div className="flex justify-center items-center h-40">
          <span className="text-neutral-500">Loading categories...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`nc-SectionSliderNewCategories ${className}`}>
      <Heading desc={subHeading}>{heading}</Heading>
      <MySlider
        data={categories}
        renderItem={(item, indx) => renderCard(item, indx)}
        itemPerRow={itemPerRow}
      />
    </div>
  );
};

export default SectionSliderNewCategories;
