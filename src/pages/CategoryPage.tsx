import SectionSliderNewAuthors from "../components/SectionSliderNewAthors/SectionSliderNewAuthors";
import { PostDataType, TaxonomyType } from "../data/types";
import { DEMO_POSTS } from "../data/posts";
import ModalCategories from "../components/ModalCategories";
import { DEMO_CATEGORIES } from "../data/taxonomies";
import ArchiveFilterListBox from "../components/ArchiveFilterListBox/ArchiveFilterListBox";
import Card11 from "../components/Card11/Card11";
import Pagination from "../components/Pagination/Pagination";
import ButtonPrimary from "../components/Button/ButtonPrimary";
import { DEMO_AUTHORS } from "../data/authors";
import { useParams } from "react-router-dom";
import { toast, useAccountStore } from "@massalabs/react-ui-kit";
import { useEffect, useState } from "react";
import { Post } from "../struct/Post";
import { Category } from "../struct/Category";
import { CategoryService } from "../services/categoryService";
import { Profile } from "../struct/Profile";
import Heading from "../components/Heading/Heading";

// Tag and category have same data type - we will use one demo data
const posts: PostDataType[] = DEMO_POSTS.filter((_, i) => i < 16);
const emptyProfile = new Profile();

// Mapping functions
const mapCategoryToTaxonomy = (category: Category): TaxonomyType => ({
  id: category.id.toString(),
  name: category.name,
  href: `/categories/${category.name.toLowerCase().replace(/\s+/g, '-')}`,
  count: Number(category.count),
  thumbnail: category.thumbnail,
  taxonomy: "category"
});

const mapPostToPostData = (post: Post): PostDataType => ({
  id: post.id.toString(),
  author: post.author,
  title: post.title,
  excerpt: post.excerpt,
  content: post.content,
  featuredImage: post.featuredImage,
  categoryId: post.categoryId.toString(),
  tags: post.tags,
  readingTime: Number(post.readingTime),
  createdAt: new Date(Number(post.createdAt)).toISOString()
});

const CategoryPage = ({}) => {
  const { categoryName } = useParams();
  const { connectedAccount } = useAccountStore();
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const FILTERS = [
    { name: "Most Recent" },
    { name: "Curated by Admin" },
    { name: "Most Appreciated" },
    { name: "Most Discussed" },
    { name: "Most Viewed" },
  ];

  const fetchCategories = async () => {
    try {
      const fetchedCategories = await CategoryService.getCategories(
        connectedAccount
      );
      setCategories(fetchedCategories);
      
      // Find the current category based on the URL parameter
      const category = fetchedCategories.find(
        (cat) => cat.name.toLowerCase().replace(/\s+/g, '-') === categoryName
      );
      setCurrentCategory(category || null);
      
      console.log("fetchedCategories", fetchedCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories");
    }
  };

  const fetchPosts = async () => {
    if (!categoryName) return;
    console.log('categoryName,,,,,,,,,,,,,,,,,', categoryName);
    setIsLoading(true);
    try {
      const fetchedPosts = await CategoryService.getPostsByCategoryName(
        connectedAccount,
        categoryName,
        currentPage
      );
      console.log('fetchedPosts,,,,,,,,,,,,,,,,,', fetchedPosts);
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast.error("Failed to load posts");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (connectedAccount) {
      fetchCategories();
    }
  }, [connectedAccount]);

  useEffect(() => {
    if (connectedAccount && categoryName) {
      fetchPosts();
    }
  }, [connectedAccount, categoryName, currentPage]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className={`nc-PageArchive`}>
      {/* HEADER */}
      <div className="w-full px-2 xl:max-w-screen-2xl mx-auto">
        <div className="relative aspect-w-16 aspect-h-13 sm:aspect-h-9 lg:aspect-h-8 xl:aspect-h-5 rounded-3xl md:rounded-[40px] overflow-hidden z-0">
          <img
            alt="archive"
            src="https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            className="object-cover w-full h-full rounded-3xl md:rounded-[40px]"
            sizes="(max-width: 1280px) 100vw, 1536px"
          />
          <div className="absolute inset-0 bg-black text-white bg-opacity-30 flex flex-col items-center justify-center">
            <h2 className="inline-block align-middle text-5xl font-semibold md:text-7xl ">
              {currentCategory?.name || categoryName}
            </h2>
            <span className="block mt-4 text-neutral-300">
              {(currentCategory?.count || 0).toString()} Articles
            </span>
          </div>
        </div>
      </div>
      {/* ====================== END HEADER ====================== */}

      <div className="container pt-10 pb-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
        <div>
         

          {/* LOOP ITEMS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-8 lg:mt-10">
            {posts.map((post) => (
              <Card11 key={post.id.toString()} post={mapPostToPostData(post)} />
            ))}
          </div>

          {/* PAGINATIONS */}
          <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
            <ButtonPrimary>Show me more</ButtonPrimary>
          </div>
        </div>

      
      </div>
    </div>
  );
};

export default CategoryPage;
