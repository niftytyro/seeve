import React from "react";
import "./App.css";
import Sidebar from "./components/sidebar/sidebar";

function App() {
	return (
		<div className="flex flex-row px-4 py-6 h-full divide-x divide-light-blue-400">
			<Sidebar />
		</div>
	);
}

export default App;
