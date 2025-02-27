import { FC } from "react";
import { PostAuthorType } from "../../data/types";
import Heading from "../Heading/Heading";
import MySlider from "../MySlider";
import CardAuthorBox2 from "../CardAuthorBox2/CardAuthorBox2";

export interface SectionSliderNewAuthorsProps {
  className?: string;
  heading: string;
  subHeading: string;
  authors: PostAuthorType[];
  itemPerRow?: number;
}

const SectionSliderNewAuthors: FC<SectionSliderNewAuthorsProps> = ({
  heading = "Suggestions for discovery",
  subHeading = "Popular places to recommends for you",
  className = "",
  authors,
  itemPerRow = 5,
}) => {
  return (
    <div className={`nc-SectionSliderNewAuthors ${className}`}>
      <Heading desc={subHeading} isCenter>
        {heading}
      </Heading>
      <MySlider
        itemPerRow={itemPerRow}
        data={authors}
        renderItem={(item, index) => (
          <CardAuthorBox2 key={index} author={item} />
        )}
      />
    </div>
  );
};

export default SectionSliderNewAuthors;
