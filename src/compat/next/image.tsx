import React from 'react';

export interface StaticImageData {
  src: string;
  height: number;
  width: number;
  blurDataURL?: string;
}

interface ImageProps {
  src: string | StaticImageData;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  loading?: 'lazy' | 'eager';
  blurDataURL?: string;
  placeholder?: 'blur' | 'empty';
  sizes?: string;
}

const Image: React.FC<ImageProps> = ({ 
  src,
  alt,
  width,
  height,
  className,
  loading = 'lazy',
  sizes,
  ...props
}) => {
  const imgSrc = typeof src === 'string' ? src : src.src;
  
  return (
    <img
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={loading}
      sizes={sizes}
      {...props}
    />
  );
};

export const convertToStaticImageData = (src: string | StaticImageData): string => {
  return typeof src === 'string' ? src : src.src;
};

export default Image; 