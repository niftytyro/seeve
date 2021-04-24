import React from "react";

function AppHeader() {
	return (
		<div className="flex items-center mb-8">
			<div className="w-16 h-6 mr-4">
				<img
					className="object-contain w-full h-full"
					src={`${process.env.PUBLIC_URL}/seeve.png`}
					alt="Seeve"
				/>
			</div>
			<div className="text-3xl font-medium">Seeve</div>
		</div>
	);
}

export default AppHeader;
