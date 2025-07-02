import { FC, useEffect, useRef, useState } from "react";
import { ArrowUpIcon } from "@heroicons/react/24/solid";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import SingleAuthor from "./SingleAuthor";
import SingleCommentForm from "./SingleCommentForm";
import SingleCommentLists, { SingleCommentListsRef } from "./SingleCommentLists";
import { Profile } from "../struct/Profile";

export interface SingleContentProps {
  content: string;
  featuredImage: string;
  profile: Profile | null;
  commentNbr: number;
}

const SingleContent: FC<SingleContentProps> = ({ content, featuredImage, profile, commentNbr }) => {
  const endedAnchorRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const commentsListRef = useRef<SingleCommentListsRef>(null);
  const [isShowScrollToTop, setIsShowScrollToTop] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const endedAnchorEntry = useIntersectionObserver(endedAnchorRef, {
    rootMargin: "-200px 0px 0px 0px",
  });

  useEffect(() => {
    if (endedAnchorEntry?.isIntersecting) {
      setIsShowScrollToTop(true);
    } else {
      setIsShowScrollToTop(false);
    }
  }, [endedAnchorEntry?.isIntersecting]);

  const handleCommentAdded = () => {
    // Refresh the comments list when a new comment is added
    if (commentsListRef.current) {
      commentsListRef.current.refreshComments();
    }
  };

  const showScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div className="nc-SingleContent space-y-12">
        {/* FEATURED IMAGE */}
        <div className="container relative max-w-screen-lg mx-auto my-10 sm:my-12">
          <div className={`relative aspect-[16/9] overflow-hidden rounded-2xl shadow-2xl transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 animate-pulse"></div>
            <img
              src={featuredImage}
              alt="Post cover"
              className="absolute inset-0 w-full h-full object-cover"
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          <div
            id="single-entry-content"
            className="prose prose-lg lg:prose-xl !max-w-screen-md mx-auto dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-relaxed prose-img:rounded-xl prose-a:text-primary-600 dark:prose-a:text-primary-400 transition-colors duration-300"
            ref={contentRef}
            dangerouslySetInnerHTML={{ __html: content }}
          /> 
        </div>

        {/* ENTRY CONTENT */}
        {/* <div
          id="single-entry-content"
          className="prose prose-lg lg:prose-xl !max-w-screen-md mx-auto dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-relaxed prose-img:rounded-xl prose-a:text-primary-600 dark:prose-a:text-primary-400 transition-colors duration-300"
          ref={contentRef}
          dangerouslySetInnerHTML={{ __html: content }}
        /> */}

        {/* AUTHOR */}
        <div className="max-w-screen-md mx-auto border-b border-t border-neutral-100 dark:border-neutral-700 py-2 my-10"></div>
        <div className="max-w-screen-md mx-auto">
          {profile && <SingleAuthor profile={profile} />}
        </div>

        {/* COMMENT FORM */}
        <div id="comments" className="scroll-mt-20 max-w-screen-md mx-auto pt-8">
          <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-8">
            Responses ({commentNbr})
          </h3>
          <SingleCommentForm onCommentAdded={handleCommentAdded} />
        </div>

        {/* COMMENTS LIST */}
        <div className="max-w-screen-md mx-auto">
          <SingleCommentLists ref={commentsListRef} />
          <div ref={endedAnchorRef}></div>
        </div>
      </div>

      {isShowScrollToTop && (
        <button
          type="button"
          className="fixed right-4 bottom-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-white shadow-lg transition-all hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
          onClick={showScrollToTop}
        >
          <ArrowUpIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default SingleContent;
