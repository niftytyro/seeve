import React from "react";

interface CarouselSlideProps {
  children?: React.ReactNode;
}

const CarouselSlide: React.FC<CarouselSlideProps> = ({ children }) => {
  return <div className="flex-shrink-0 w-full h-full">{children}</div>;
};

export default CarouselSlide;
