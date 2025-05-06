import { FC, useEffect, useRef, useState } from "react";
import { ArrowUpIcon } from "@heroicons/react/24/solid";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import SingleAuthor from "./SingleAuthor";
import SingleCommentForm from "./SingleCommentForm";
import SingleCommentLists from "./SingleCommentLists";
import PostCardLikeAction from "./PostCardLikeAction/PostCardLikeAction";
import PostCardCommentBtn from "./PostCardCommentBtn/PostCardCommentBtn";

export interface SingleContentProps {
  content: string;
  featuredImage: string;
}

const SingleContent: FC<SingleContentProps> = ({ content, featuredImage }) => {
  const endedAnchorRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLButtonElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isShowScrollToTop, setIsShowScrollToTop] = useState<boolean>(false);

  const endedAnchorEntry = useIntersectionObserver(endedAnchorRef, {
    threshold: 0,
    root: null,
    rootMargin: "0%",
    freezeOnceVisible: false,
  });

  useEffect(() => {
    const handleProgressIndicator = () => {
      const entryContent = contentRef.current;
      const progressBarContent = progressRef.current;

      if (!entryContent || !progressBarContent) return;

      const totalEntryH = entryContent.offsetTop + entryContent.offsetHeight;
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      const scrolled = (winScroll / totalEntryH) * 100;

      progressBarContent.innerText = scrolled.toFixed(0) + "%";
      setIsShowScrollToTop(scrolled >= 100);
    };

    window.addEventListener("scroll", handleProgressIndicator);
    return () => window.removeEventListener("scroll", handleProgressIndicator);
  }, []);

  const showLikeAndCommentSticky =
    !endedAnchorEntry?.intersectionRatio &&
    (endedAnchorEntry?.boundingClientRect.top || 0) > 0;

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
          <SingleAuthor />
        </div>

        {/* COMMENT FORM */}
        <div id="comments" className="scroll-mt-20 max-w-screen-md mx-auto pt-8">
          <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-8">
            Responses (10)
          </h3>
          <SingleCommentForm />
        </div>

        {/* COMMENTS LIST */}
        <div className="max-w-screen-md mx-auto">
          <SingleCommentLists />
          <div ref={endedAnchorRef}></div>
        </div>
      </div>

      {/* STICKY BOTTOM BAR */}
      <div
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 ease-in-out transform ${
          showLikeAndCommentSticky ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <div className="bg-white dark:bg-neutral-800 shadow-[0_8px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_40px_rgba(255,255,255,0.08)] rounded-full ring-1 ring-neutral-900/5 p-2 flex items-center justify-center space-x-2 text-sm backdrop-blur-lg">
          <PostCardLikeAction className="px-4 h-10 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-full transition-colors" />
          <div className="border-s h-5 border-neutral-200 dark:border-neutral-700"></div>
          <PostCardCommentBtn isATagOnSingle className="flex px-4 h-10 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-full transition-colors" />
          <div className="border-s h-5 border-neutral-200 dark:border-neutral-700"></div>
          <button
            className={`w-10 h-10 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-full transition-all ${
              isShowScrollToTop ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <ArrowUpIcon className="w-5 h-5" />
          </button>
          <button
            ref={progressRef}
            className={`w-10 h-10 flex items-center justify-center font-medium ${
              isShowScrollToTop ? 'hidden' : 'flex'
            }`}
            title="Reading progress"
          >
            %
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleContent;
