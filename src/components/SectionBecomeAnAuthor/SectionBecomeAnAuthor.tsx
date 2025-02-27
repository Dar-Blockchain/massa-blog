import { FC } from "react";
import rightImgDemo from "../../images/BecomeAnAuthorImg.png";
import ButtonPrimary from "../Button/ButtonPrimary";

export interface SectionBecomeAnAuthorProps {
  className?: string;
  rightImg?: string;
}

const SectionBecomeAnAuthor: FC<SectionBecomeAnAuthorProps> = ({
  className = "",
  rightImg = rightImgDemo,
}) => {
  return (
    <div
      className={`nc-SectionBecomeAnAuthor relative flex flex-col lg:flex-row items-center  ${className}`}
    >
      <div className="flex-shrink-0 mb-14 lg:mb-0 lg:mr-10 lg:w-2/5">
        <span className="text-xs uppercase tracking-wider font-medium text-neutral-400">
          supper change your planning powers
        </span>
        <h2 className="font-semibold text-3xl sm:text-4xl mt-3">
          Become a Blockchain Author on Massa Network
        </h2>
        <span className="block mt-8 text-neutral-500 dark:text-neutral-400">
          Share your insights and stories on our fully on-chain blog. Join a
          community of innovators and thought leaders, and contribute to the
          future of blockchain-based publishing. Everyone’s welcome to be part
          of this revolutionary platform.
        </span>
        <ButtonPrimary className="mt-8">Become an author</ButtonPrimary>
      </div>
      <div className="flex-grow">
        <img alt="hero" sizes="(max-width: 768px) 100vw, 50vw" src={rightImg} />
      </div>
    </div>
  );
};

export default SectionBecomeAnAuthor;
