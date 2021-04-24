const DefaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	purge: ["./src/**/*.{js,ts,jsx,tsx}", "./public/index.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				_active: "#000",
				_hover: "#E5E8F1",
				_inactive: "#FFF",
			},
			fontFamily: {
				sans: ["Poppins", ...DefaultTheme.fontFamily.sans],
			},
			textColor: {
				_active: "#FFF",
				_hover: "#000",
				_inactive: "#A5A8B1",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
