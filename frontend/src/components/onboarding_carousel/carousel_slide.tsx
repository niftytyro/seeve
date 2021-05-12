import React from "react";

function CarouselSlide({ children }: { children?: React.ReactNode }) {
  return <div className="flex-shrink-0 w-full h-full">{children}</div>;
}

export default CarouselSlide;
