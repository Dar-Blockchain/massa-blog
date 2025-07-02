import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccountStore } from "@massalabs/react-ui-kit";
import Heading from "../components/Heading/Heading";
import NcImage from "../components/NcImage/NcImage";
import { DEMO_CATEGORIES } from "../data/taxonomies";
import { CategoryService } from "../services/categoryService";
import { toast } from "react-toastify";
import { TaxonomyType } from "../data/types";

const CategoriesPage: React.FC = () => {
  const navigate = useNavigate();
  const { connectedAccount } = useAccountStore();
  const [categories, setCategories] = useState<TaxonomyType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoriesWithCounts = async () => {
      if (!connectedAccount) return;

      try {
        const categoriesWithCounts = await Promise.all(
          DEMO_CATEGORIES.map(async (category) => {
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
        toast.error("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesWithCounts();
  }, [connectedAccount]);

  if (loading) {
    return (
      <div className="container mx-auto py-16">
        <div className="text-center">Loading categories...</div>
      </div>
    );
  }

  return (
    <div className="nc-CategoriesPage">
      <div className="container px-4 py-16 lg:pb-28 lg:pt-20">
        <div className="relative">
          <Heading
            className="mb-12 text-neutral-900 dark:text-neutral-50 md:mb-16 lg:mb-20"
            fontClass="text-3xl md:text-4xl font-semibold"
            isCenter
            desc="Explore our diverse collection of articles across various topics"
          >
            Blog Categories
          </Heading>

          <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="relative flex flex-col group cursor-pointer"
                onClick={() => navigate(category.href)}
              >
                <div className="relative inline-block overflow-hidden rounded-2xl">
                  <NcImage
                    containerClassName="aspect-w-7 aspect-h-5"
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                    src={category.thumbnail || ''}
                    alt={category.name}
                  />
                </div>
                <div className="mt-4 flex items-center">
                  <div className={`w-10 h-10 rounded-full bg-${category.color || 'gray'}-100 dark:bg-${category.color || 'gray'}-800 flex items-center justify-center`}>
                    <span className={`text-${category.color || 'gray'}-600 dark:text-${category.color || 'gray'}-200 text-xl font-bold`}>
                      {category.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-primary-900 dark:group-hover:text-primary-300">
                      {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                    </h3>
                    <span className="block mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                      {category.count || 0} {(category.count || 0) === 1 ? 'Article' : 'Articles'}
                    </span>
                  </div>
                </div>
                <span className="absolute inset-0 rounded-2xl bg-neutral-900 dark:bg-neutral-100 opacity-0 group-hover:opacity-5 transition-opacity duration-200"></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage; 