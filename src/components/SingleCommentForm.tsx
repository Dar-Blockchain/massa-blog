import React, { FC, useState } from "react";
import { useParams } from "react-router-dom";
import Textarea from "./Textarea/Textarea";
import ButtonPrimary from "./Button/ButtonPrimary";
import Button from "./Button/Button";
import { useAppDispatch } from "../redux/store";
import { addComment } from "../redux/slices/userSlice";
import { useAccountStore } from "@massalabs/react-ui-kit";

export interface SingleCommentFormProps {
  className?: string;
  onClickSubmit?: (commentText: string) => void;
  onClickCancel?: () => void;
  onCommentAdded?: () => void;
  textareaRef?: React.MutableRefObject<HTMLTextAreaElement | null>;
  defaultValue?: string;
  rows?: number;
  parentCommentId?: bigint;
}

const SingleCommentForm: FC<SingleCommentFormProps> = ({
  className = "mt-5",
  onClickSubmit,
  onClickCancel,
  onCommentAdded,
  textareaRef,
  defaultValue = "",
  rows = 4,
  parentCommentId,
}) => {
  const [commentText, setCommentText] = useState(defaultValue);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();
  const { connectedAccount } = useAccountStore();
  const { authorId, postId } = useParams<{ authorId: string; postId: string }>();

  const handleSubmit = async () => {
    if (!commentText.trim()) {
      return;
    }

    if (!connectedAccount) {
      console.error("No connected account");
      return;
    }

    if (!postId) {
      console.error("No post ID provided");
      return;
    }

    if (!authorId) {
      console.error("No author ID provided");
      return;
    }

    setIsSubmitting(true);

    try {
      await dispatch(addComment({
        connectedAccount,
        authorAddress: authorId,
        postId: BigInt(postId),
        text: commentText.trim(),
        parentCommentId,
      })).unwrap();

      // Clear the textarea after successful submission
      setCommentText("");
      if (textareaRef?.current) {
        textareaRef.current.value = "";
      }

      // Call the parent's onClickSubmit if provided
      if (onClickSubmit) {
        onClickSubmit(commentText.trim());
      }

      // Notify that a comment was added
      if (onCommentAdded) {
        onCommentAdded();
      }
    } catch (error) {
      console.error("Failed to add comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Textarea
        placeholder="Add to discussion"
        ref={textareaRef}
        required={true}
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        rows={rows}
      />
      <div className="mt-2 space-x-3">
        <ButtonPrimary 
          onClick={handleSubmit} 
          type="submit"
          disabled={isSubmitting || !commentText.trim()}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </ButtonPrimary>
        <Button type="button" pattern="white" onClick={onClickCancel}>
          Cancel
        </Button>
      </div>
    </>
  );
};

export default SingleCommentForm;
