import AppHeader from "../components/app_header/app_header";

function Login() {
	return (
		<div className="login-body flex flex-col justify-center items-center h-full">
			<AppHeader />
			<div className="w-1/2 h-1/2 bg-red-500 overflow-x-scroll whitespace-nowrap">
				<div className="inline-block w-full h-full bg-green-500"></div>
				<div className="inline-block w-full h-full bg-blue-500"></div>
				<div className="inline-block w-full h-full bg-gray-500"></div>
			</div>
		</div>
	);
}

export default Login;
