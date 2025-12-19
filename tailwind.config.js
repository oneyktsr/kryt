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
        // Senin renk paletin (CSS değişkenlerinden çekecek)
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "var(--accent)",
        border: "var(--border)",
      },
      fontFamily: {
        // Layout.js'den gelen fontu bağlıyoruz
        sans: ["var(--font-primary)", "sans-serif"],
        // Senin özel 'font-medium-custom' sınıfın için
        custom: ["var(--font-primary)", "sans-serif"],
      },
      // Grid ve Breakpoint ayarları Tailwind default değerlerinde kalsın,
      // biz özel ayarları globals.css'te senin yaptığın gibi yöneteceğiz.
    },
  },
  plugins: [],
};
