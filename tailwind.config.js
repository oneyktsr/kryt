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
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "var(--accent)",
        border: "var(--border)", // Yeni eklenen border değişkeni
      },
      fontFamily: {
        // Layout.js'den gelen değişken
        sans: ["var(--font-primary)", "sans-serif"],
        custom: ["var(--font-primary)", "sans-serif"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"), // CMS içeriği için gerekli
  ],
};
