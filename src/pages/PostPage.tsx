import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAccountStore } from "@massalabs/react-ui-kit";
import { PostService } from "../services/postService";
import { Post } from "../struct/Post";
import { toast } from "react-toastify";
import NcImage from "../components/NcImage/NcImage";
import SingleContent from "../components/SingleContent";
import SingleHeader from "../components/SingleHeader";
import SingleRelatedPosts from "../components/SingleRelatedPosts";

const PageSinglePost = () => {
  const { postId } = useParams();
  const { connectedAccount } = useAccountStore();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId || !connectedAccount) return;

      try {
        const postData = await PostService.getPost(connectedAccount, BigInt(postId));
        if (!postData) {
          toast.error("Post not found");
        } else {
          setPost(postData);
        }
      } catch (error) {
        console.error("Error loading post:", error);
        toast.error("Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId, connectedAccount]);

  if (loading) {
    return <div className="container text-center py-16">Loading post...</div>;
  }

  if (!post) {
    return <div className="container text-center py-16">Post not found.</div>;
  }

  return (
    <>
      <div className="nc-PageSingle pt-8 lg:pt-16">
        <header className="container rounded-xl">
          <div className="max-w-screen-md mx-auto">
            <SingleHeader
              title={post.title}
              excerpt={post.excerpt}
              readingTime={Number(post.readingTime)}
              categories={[
                {
                  id: post.categoryId || "default",
                  name: post.categoryId || "Uncategorized",
                  href: "/category/" + (post.categoryId || "default"),
                  taxonomy: "category",
                },
              ]}
            />
          </div>
        </header>

        {/* FEATURED IMAGE */}
        <NcImage
          alt={post.title}
          containerClassName="container my-10 sm:my-12"
          className="w-full rounded-xl"
          src={post.featuredImage}
          width={1260}
          height={750}
          sizes="(max-width: 1024px) 100vw, 1280px"
        />
      </div>

      <div className="container mt-10">
        <SingleContent content={post.content} featuredImage={post.featuredImage}/>
      </div>

      <SingleRelatedPosts />
    </>
  );
};

export default PageSinglePost;
