import { useCallback, useEffect, useRef, useState } from "react";
import CarouselImage from "./carousel_image";
import CarouselSlide from "./carousel_slide";
import CarouselSubtitle from "./carousel_subtitle";

function OnboardingCarousel() {
	const [carouselIndex, setCarouselIndex] = useState(0);
	const carouselRef = useRef<HTMLDivElement>(null);

	const next = () => {
		if (carouselIndex < 2) setCarouselIndex(carouselIndex + 1);
	};
	const previous = () => {
		if (carouselIndex > 0) setCarouselIndex(carouselIndex - 1);
	};

	const updateScrollPosition = useCallback(
		(useSmooth: Boolean) => {
			carouselRef.current?.scrollTo({
				left: (carouselIndex * window.innerWidth) / 2,
				behavior: useSmooth ? "smooth" : undefined,
			});
		},
		[carouselIndex]
	);

	useEffect(() => {
		updateScrollPosition(true);
		window.addEventListener("resize", () => updateScrollPosition(false));
		return () =>
			window.removeEventListener("resize", () => updateScrollPosition(false));
	}, [updateScrollPosition]);

	return (
		<div className="relative w-1/2 h-2/3">
			{carouselIndex > 0 ? (
				<div
					onClick={previous}
					className="absolute left-1 bottom-1/2 z-50 bg-_hover  px-2 rounded-2xl cursor-pointer transform hover:scale-125 transition-transform active:bg-blue-200"
				>
					&lt;
				</div>
			) : null}
			{carouselIndex < 2 ? (
				<div
					onClick={next}
					className="absolute right-1 bottom-1/2 z-50 bg-_hover px-2 rounded-2xl cursor-pointer transform hover:scale-125 transition-transform active:bg-blue-200"
				>
					&gt;
				</div>
			) : null}
			<div
				ref={carouselRef}
				className="flex relative w-full h-full overflow-x-hidden"
			>
				<CarouselSlide>
					<CarouselImage imageTitle="meditation" />
					<CarouselSubtitle>
						One single app to help you manage your personal life and work.
					</CarouselSubtitle>
				</CarouselSlide>
				<CarouselSlide>
					<CarouselImage imageTitle="schedule" />
					<CarouselSubtitle>
						Manage your tasks, goals, projects and life gracefully and
						effortlessly.
					</CarouselSubtitle>
				</CarouselSlide>
				<CarouselSlide>
					<div className="flex flex-col h-2/3 justify-evenly items-center">
						<CarouselSubtitle>Become a member.</CarouselSubtitle>
						<button className="py-2 px-16 border rounded-full font-medium border-yellow-200 active:bg-yellow-300 focus:outline-none active:text-white">
							Login with Google
						</button>
					</div>
				</CarouselSlide>
			</div>
		</div>
	);
}

export default OnboardingCarousel;
