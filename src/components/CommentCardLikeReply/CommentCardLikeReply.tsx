import { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAccountStore } from "@massalabs/react-ui-kit";
import { useAppDispatch } from "../../redux/store";
import { likeComment, getCommentLikes } from "../../redux/slices/userSlice";
import convertNumbThousand from "../../utils/convertNumbThousand";
import twFocusClass from "../../utils/twFocusClass";

export interface CommentCardLikeReplyProps {
  className?: string;
  onClickReply: () => void;
  likeCount: number;
  isLiked: boolean;
  commentId: bigint;
}

const CommentCardLikeReply: FC<CommentCardLikeReplyProps> = ({
  className = "",
  likeCount: initialLikeCount,
  isLiked: likedProps,
  onClickReply = () => {},
  commentId,
}) => {
  const [isLiked, setIsLiked] = useState(likedProps);
  const [localLikeCount, setLocalLikeCount] = useState(initialLikeCount);
  const [isLiking, setIsLiking] = useState(false);
  const dispatch = useAppDispatch();
  const { connectedAccount } = useAccountStore();
  const { authorId } = useParams<{ authorId: string }>();

  // Fetch real-time likes count
  useEffect(() => {
    const fetchLikes = async () => {
      if (!connectedAccount || !authorId) return;
      
      try {
        const likes = await dispatch(getCommentLikes({
          connectedAccount,
          authorAddress: authorId,
          commentId,
        })).unwrap();
        
        setLocalLikeCount(Number(likes));
      } catch (error) {
        console.error("Failed to fetch comment likes:", error);
      }
    };

    fetchLikes();
  }, [connectedAccount, authorId, commentId]);

  const handleLikeClick = async () => {
    if (!connectedAccount || !authorId || isLiking) return;

    setIsLiking(true);
    try {
      const success = await dispatch(likeComment({
        connectedAccount,
        authorAddress: authorId,
        commentId,
      })).unwrap();

      if (success) {
        setIsLiked(!isLiked);
        // After successful like/unlike, fetch the updated likes count
        const updatedLikes = await dispatch(getCommentLikes({
          connectedAccount,
          authorAddress: authorId,
          commentId,
        })).unwrap();
        setLocalLikeCount(Number(updatedLikes));
      }
    } catch (error) {
      console.error("Failed to like comment:", error);
    } finally {
      setIsLiking(false);
    }
  };

  const renderActionBtns = () => {
    return (
      <>
        <button
          className={`min-w-[68px] flex items-center rounded-full leading-none px-3 h-8 text-xs ${twFocusClass()} ${
            isLiked
              ? "text-rose-600 bg-rose-50"
              : "text-neutral-700 bg-neutral-100 dark:text-neutral-200 dark:bg-neutral-800 hover:bg-rose-50 hover:text-rose-600 dark:hover:text-rose-500"
          }`}
          onClick={handleLikeClick}
          disabled={isLiking}
          title="Like"
        >
          <svg
            className="h-5 w-5 me-1"
            fill={isLiked ? "currentColor" : "none"}
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M11.995 7.23319C10.5455 5.60999 8.12832 5.17335 6.31215 6.65972C4.49599 8.14609 4.2403 10.6312 5.66654 12.3892L11.995 18.25L18.3235 12.3892C19.7498 10.6312 19.5253 8.13046 17.6779 6.65972C15.8305 5.18899 13.4446 5.60999 11.995 7.23319Z"
              clipRule="evenodd"
            ></path>
          </svg>

          <span
            className={`${
              isLiked
                ? "text-rose-600"
                : "text-neutral-900 dark:text-neutral-200"
            }`}
          >
            {convertNumbThousand(localLikeCount)}
          </span>
        </button>
        
        <button
          className={`flex items-center min-w-[68px] rounded-full text-neutral-6000 bg-neutral-100 dark:text-neutral-200 dark:bg-neutral-800 px-3 h-8 hover:bg-teal-50 hover:text-teal-600 dark:hover:text-teal-500 ${twFocusClass()} `}
          title="Reply"
          onClick={onClickReply}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-[18px] w-[18px] me-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
            />
          </svg>
          <span className="text-xs leading-none text-neutral-900 dark:text-neutral-200">
            Reply
          </span>
        </button>
      </>
    );
  };

  return (
    <div
      className={`nc-CommentCardLikeReply flex items-center space-x-2 rtl:space-x-reverse ${className}`}
      data-nc-id="CommentCardLikeReply"
    >
      {renderActionBtns()}
    </div>
  );
};

export default CommentCardLikeReply;
