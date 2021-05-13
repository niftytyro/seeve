import React from "react";

interface CarouselImageProps {
  imageTitle: string;
}

const CarouselImage: React.FC<CarouselImageProps> = ({ imageTitle }) => {
  return (
    <img
      className="w-full h-4/5 object-contain"
      src={`${process.env.PUBLIC_URL}/vectors/${imageTitle}.jpg`}
      alt="meditation"
    />
  );
};

export default CarouselImage;
