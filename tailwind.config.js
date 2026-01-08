/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // 👈 ব্যানার এবং ডার্ক মোডের জন্য এটি খুবই গুরুত্বপূর্ণ
  theme: {
    extend: {
      colors: {
        primary: "#10B981", 
        secondary: "#3B82F6",
      },
    },
  },
  plugins: [],
}