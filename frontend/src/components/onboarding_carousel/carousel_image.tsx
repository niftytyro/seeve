import React from "react";

function CarouselImage({ imageTitle }: { imageTitle: String }) {
	return (
		<>
			{imageTitle ? (
				<img
					className="w-full h-4/5 object-contain"
					src={`${process.env.PUBLIC_URL}/vectors/${imageTitle}.jpg`}
					alt="meditation"
				/>
			) : null}
		</>
	);
}

export default CarouselImage;
