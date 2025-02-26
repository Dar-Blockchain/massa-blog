import { FC, ImgHTMLAttributes } from "react";

export interface NcImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
}

const NcImage: FC<NcImageProps> = ({
  containerClassName = "",
  alt = "nc-imgs",
  className = "object-cover w-full h-full",
  sizes,
  ...args
}) => {
  return (
    <div className={containerClassName}>
      <img className={className} alt={alt} {...args} />
    </div>
  );
};

export default NcImage;
