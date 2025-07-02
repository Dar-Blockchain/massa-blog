import { FC, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { useParams } from "react-router-dom";
import { useAccountStore } from "@massalabs/react-ui-kit";
import { useAppDispatch } from "../redux/store";
import { getPostComments } from "../redux/slices/userSlice";
import { Comment } from "../struct/Comment";
import CommentCard from "./CommentCard/CommentCard";
import ButtonPrimary from "./Button/ButtonPrimary";

export interface SingleCommentListsProps {}

export interface SingleCommentListsRef {
  refreshComments: () => void;
}

const SingleCommentLists = forwardRef<SingleCommentListsRef, SingleCommentListsProps>(({}, ref) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreComments, setHasMoreComments] = useState(true);
  const [totalComments, setTotalComments] = useState(0);
  
  const dispatch = useAppDispatch();
  const { connectedAccount } = useAccountStore();
  const { authorId, postId } = useParams<{ authorId: string; postId: string }>();

  const fetchComments = async (page: number, append: boolean = false) => {
    if (!connectedAccount || !authorId || !postId) return;

    setIsLoading(true);
    try {
      const fetchedComments = await dispatch(getPostComments({
        connectedAccount,
        authorAddress: authorId,
        postId: BigInt(postId),
        selectionPart: page,
      })).unwrap();
      console.log("fetchedComments", fetchedComments);
      if (append) {
        setComments(prev => [...prev, ...fetchedComments]);
      } else {
        setComments(fetchedComments);
      }

      // If we got fewer comments than expected, we've reached the end
      if (fetchedComments.length === 0) {
        setHasMoreComments(false);
      }

      // Update total count (this is an approximation)
      if (!append) {
        setTotalComments(fetchedComments.length);
      } else {
        setTotalComments(prev => prev + fetchedComments.length);
      }

    } catch (error) {
      console.error("Failed to fetch comments:", error);
      setHasMoreComments(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMoreComments = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchComments(nextPage, true);
  };

  const refreshComments = () => {
    // Refresh comments when a new comment is added
    setCurrentPage(1);
    setHasMoreComments(true);
    fetchComments(1, false);
  };

  // Expose the refresh function to parent components
  useImperativeHandle(ref, () => ({
    refreshComments,
  }));

  useEffect(() => {
    fetchComments(1, false);
  }, [connectedAccount, authorId, postId]);

  // Convert Comment to the format expected by CommentCard
  const convertCommentToCardFormat = (comment: Comment) => ({
    id: Number(comment.id),
    date: new Date(Number(comment.createdAt)).toLocaleDateString(),
    content: comment.text,
    like: {
      count: Number(comment.likesNbr),
      isLiked: false, // TODO: Add isLiked state when available from smart contract
    },
    author: comment.commenter,
    commenterFirstName: comment.commenterFirstName,
    commenterLastName: comment.commenterLastName,
    commenterProfilePic: comment.commenterProfilePic,
  });

  return (
    <ul className="nc-SingleCommentLists space-y-5">
      {comments.map((comment) => (
        <CommentCard
          key={comment.id.toString()}
          comment={convertCommentToCardFormat(comment)}
        />
      ))}

      {hasMoreComments && comments.length > 0 && (
        <ButtonPrimary 
          className="dark:bg-primary-700 w-full"
          onClick={handleLoadMoreComments}
          disabled={isLoading}
        >
          {isLoading 
            ? "Loading..." 
            : currentPage === 1 
              ? `Load More)`
              : "Load More"
          }
        </ButtonPrimary>
      )}

      {!hasMoreComments && comments.length === 0 && !isLoading && (
        <div className="text-center py-8 text-neutral-500 dark:text-neutral-400">
          No comments yet. Be the first to comment!
        </div>
      )}

      {!hasMoreComments && comments.length > 0 && (
        <div className="text-center py-4 text-neutral-500 dark:text-neutral-400">
          No more comments to load.
        </div>
      )}
    </ul>
  );
});

SingleCommentLists.displayName = 'SingleCommentLists';

export default SingleCommentLists;
