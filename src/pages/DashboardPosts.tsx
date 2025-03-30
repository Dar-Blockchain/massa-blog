import { useEffect, useState } from "react";
import Pagination from "../components/Pagination/Pagination";
import { Post } from "../struct/Post";
import { toast, useAccountStore } from "@massalabs/react-ui-kit";
import { PostService } from "../services/postService";

const people = [
  {
    id: 1,
    title: "Tokyo Fashion Week Is Making Itself Great Again",
    image:
      "https://images.unsplash.com/photo-1617059063772-34532796cdb5?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60",
    liveStatus: true,
    payment: "Not Applicable",
  },
  {
    id: 2,
    title: "Traveling Tends to Magnify All Human Emotions",
    image:
      "https://images.unsplash.com/photo-1622987437805-5c6f7c2609d7?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60",
    liveStatus: true,
    payment: "Not Applicable",
  },
  {
    id: 3,
    title: "Interior Design: Hexagon is the New Circle in 2018",
    image:
      "https://images.unsplash.com/photo-1617201277988-f0efcc14e626?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60",
    liveStatus: true,
    payment: "Not Applicable",
  },
  {
    id: 4,
    title: "Heritage Museums & Gardens to Open with New Landscape",
    image:
      "https://images.unsplash.com/photo-1622960748096-1983e5f17824?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60",
    liveStatus: true,
    payment: "Not Applicable",
  },
  {
    id: 5,
    title:
      "Man agrees to complete $5,000 Hereford Inlet Lighthouse painting job",
    image:
      "https://images.unsplash.com/photo-1617202227468-7597afc7046d?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60",
    liveStatus: false,
    payment: "Not Applicable",
  },
  {
    id: 6,
    title:
      "Denton Corker Marshall the mysterious black box is biennale pavilion",
    image:
      "https://images.unsplash.com/photo-1622978147823-33d5e241e976?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzM3x8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60",
    liveStatus: true,
    payment: "Not Applicable",
  },
];

const DashboardPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { connectedAccount } = useAccountStore();
  const [currentPage, setCurrentPage] = useState(1);

  const fetchPosts = async (page: number) => {
    setIsLoading(true);
    try {
      const fetchedPosts = await PostService.getPosts(connectedAccount, page);
      setPosts(fetchedPosts);
      // Test getPost function with ID 1
      const singlePost = await PostService.getPost(connectedAccount, 1n);
      console.log("Single Post with ID 1:", singlePost);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast.error("Failed to load posts");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (connectedAccount) {
      fetchPosts(currentPage);
    }
  }, [connectedAccount, currentPage]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }
  return (
    <div className="flex flex-col space-y-8">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full px-1 sm:px-6 lg:px-8">
          <div className="shadow dark:border dark:border-neutral-800 overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
              <thead className="bg-neutral-50 dark:bg-neutral-800">
                <tr className="text-start text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
                  <th scope="col" className="px-6 py-3">
                    Article
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Payment
                  </th>

                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-800">
                {posts.length > 0 ? (
                  posts.map((post) => (
                    <tr key={post.title}>
                      <td className="px-6 py-4">
                        <div className="flex items-center w-96 lg:w-auto max-w-md overflow-hidden">
                          <img
                            className="flex-shrink-0 h-12 w-12 rounded-lg relative z-0 overflow-hidden lg:h-14 lg:w-14"
                            src={
                              post.featuredImage || "/default-post-image.jpg"
                            }
                            alt={post.title}
                          />
                          <div className="ms-4 flex-grow">
                            <h2 className="inline-flex line-clamp-2 text-sm font-semibold dark:text-neutral-300">
                              {post.title}
                            </h2>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1">
                              {post.excerpt}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
                        {/* {new Date(post.date).toLocaleDateString()} */}
                        date
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
                        {/* {post.viewCount} */}
                        view count
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => {
                            /* Add edit functionality */
                          }}
                          className="text-primary-600 hover:text-primary-900 dark:text-primary-500 dark:hover:text-primary-400"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-4 text-center text-neutral-500 dark:text-neutral-400"
                    >
                      No posts found. Start creating your first post!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Pagination />
    </div>
  );
};

export default DashboardPosts;
