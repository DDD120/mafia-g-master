import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
        serif: ["var(--font-serif)"],
      },
      colors: {
        red: "#D50000",
        black: "#201C1A",
        gray: "#939190",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
}
export default config
