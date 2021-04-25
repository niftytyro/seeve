import AppHeader from "../components/app_header/app_header";
import OnboardingCarousel from "../components/onboarding_carousel/onboarding_carousel";

function Login() {
	return (
		<div className="login-body flex flex-col justify-center items-center h-full">
			<AppHeader />
			<OnboardingCarousel />
		</div>
	);
}

export default Login;
