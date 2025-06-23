/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./.vitepress/**/*.{js,ts,jsx,tsx,vue,md}",
    "./.vitepress/components/*",
    "./src/**/*.{vue,js,ts,jsx,tsx,md}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
