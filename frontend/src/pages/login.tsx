import React from "react";
import AppHeader from "../components/app_header";
import OnboardingCarousel from "../components/onboarding_carousel";

const Login: React.FC = () => {
  return (
    <div className="login-body flex flex-col justify-center items-center h-full">
      <AppHeader />
      <OnboardingCarousel />
    </div>
  );
};

export default Login;
