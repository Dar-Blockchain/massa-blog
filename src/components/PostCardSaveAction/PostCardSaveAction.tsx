import { FC } from "react";

export interface PostCardSaveActionProps {
  className?: string;
  readingTime?: number;
  hidenReadingTime?: boolean;
}

const PostCardSaveAction: FC<PostCardSaveActionProps> = ({
  className = "",
  hidenReadingTime = true,
  readingTime = 3,
}) => {
  return (
    <div
      className={`nc-PostCardSaveAction flex items-center space-x-2 text-xs text-neutral-700 dark:text-neutral-300 ${className}`}
    >
      {!hidenReadingTime && !!readingTime && (
        <span>{readingTime} min read</span>
      )}
    </div>
  );
};

export default PostCardSaveAction;
