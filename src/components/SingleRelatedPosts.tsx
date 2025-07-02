import { FC, useEffect, useState } from "react";
import { PostDataType } from "../data/types";
import Heading from "./Heading/Heading";
import Card11 from "./Card11/Card11";
import { Post } from "../struct/Post";
import { CategoryService } from "../services/categoryService";
import { useAccountStore } from "@massalabs/react-ui-kit";

export interface SingleRelatedPostsProps {
  categoryName: string;
  currentPostId: string;
}

const SingleRelatedPosts: FC<SingleRelatedPostsProps> = ({
  categoryName,
  currentPostId
}) => {
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const { connectedAccount } = useAccountStore();

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      if (!categoryName || !connectedAccount) return;

      try {
        const posts = await CategoryService.getPostsByCategory(connectedAccount, categoryName, 1);
        // Filter out the current post and limit to 4 posts
        const filteredPosts = posts
          .filter(post => post.id.toString() !== currentPostId)
          .slice(0, 4);
        setRelatedPosts(filteredPosts);
      } catch (error) {
        console.error("Error fetching related posts:", error);
      }
    };

    fetchRelatedPosts();
  }, [categoryName, currentPostId, connectedAccount]);

  if (relatedPosts.length === 0) {
    return null;
  }

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

  return (
    <div className="relative bg-neutral-100 dark:bg-neutral-800 py-16 lg:py-28 mt-16 lg:mt-28">
      <div className="container">
        <div>
          <Heading
            className="mb-10 text-neutral-900 dark:text-neutral-50"
            desc=""
          >
            More from {categoryName}
          </Heading>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {relatedPosts.map((post) => (
              <Card11 key={post.id.toString()} post={mapPostToPostData(post)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleRelatedPosts;
