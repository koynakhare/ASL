import React, { useEffect, useState } from "react";
import noImage from '../../assets/sign/noImage.jpg'
const CustomImage = ({
  src,
  alt = "Image",
  className = "",
  ...rest
}) => {
  const [imgSrc, setImgSrc] = useState(src || noImage);

  useEffect(() => {
    setImgSrc(src || noImage)
  }, [src])

  const handleError = () => setImgSrc(noImage);

  return (
    <img
      src={imgSrc || noImage}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
      {...rest}

    />
  );
};

export default CustomImage;
