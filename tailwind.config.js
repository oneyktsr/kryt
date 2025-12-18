/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#121212",
        white: "#F4F1EC",
        "brand-red": "#EE382B",
      },
      fontFamily: {
        sans: ["Neue Montreal", "sans-serif"],
      },
      spacing: {
        nav: "32px",
        gutter: "20px", // Grid gap
        "gap-mobile": "60px",
        "gap-desktop": "80px",
        "pad-mobile": "20px",
        "pad-desktop": "40px",
      },
    },
  },
  plugins: [],
};
