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
    <div
      className={containerClassName}
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      <img
        className={className}
        alt={alt}
        {...args}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

export default NcImage;
