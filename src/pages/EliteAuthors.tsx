import React, { useEffect, useState } from "react";
import { useAccountStore } from "@massalabs/react-ui-kit";
import { AuthorService } from "../services/authorService";
import { Profile } from "../struct/Profile";
import { toast } from "react-toastify";
import SingleAuthor from "../components/SingleAuthor";
import Heading from "../components/Heading/Heading";

const EliteAuthors: React.FC = () => {
  const { connectedAccount } = useAccountStore();
  const [authors, setAuthors] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthors = async () => {
      if (!connectedAccount) return;

      try {
        const authorsList = await AuthorService.getAuthors(connectedAccount);
        setAuthors(authorsList);
      } catch (error) {
        console.error("Error fetching authors:", error);
        toast.error("Failed to load authors");
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, [connectedAccount]);

  if (loading) {
    return (
      <div className="container mx-auto py-16">
        <div className="text-center">Loading authors...</div>
      </div>
    );
  }

  if (!authors.length) {
    return (
      <div className="container mx-auto py-16">
        <div className="text-center">No authors found.</div>
      </div>
    );
  }

  return (
    <div className="nc-EliteAuthors relative">
      <div className="container px-4 py-16 lg:pb-28 lg:pt-20">
        <div className="relative">
          <Heading
            className="mb-12 text-neutral-900 dark:text-neutral-50 md:mb-16 lg:mb-20"
            fontClass="text-3xl md:text-4xl font-semibold"
            isCenter
            desc="Discover our talented writers and their unique perspectives"
          >
            Elite Authors
          </Heading>

          <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {authors.map((author) => (
              <div key={author.address} className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-5">
                <SingleAuthor profile={author} />
                <div className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
                  {author.bio || "No bio available"}
                </div>
                <div className="mt-4 flex gap-4">
                  {author.website && (
                    <a 
                      href={author.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-primary-600 hover:text-primary-500"
                    >
                      Website
                    </a>
                  )}
                  {author.twitter && (
                    <a 
                      href={`https://twitter.com/${author.twitter}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-primary-600 hover:text-primary-500"
                    >
                      Twitter
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EliteAuthors; 