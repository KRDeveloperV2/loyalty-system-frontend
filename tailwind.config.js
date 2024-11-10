/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // ให้ Tailwind ใช้กับไฟล์ทั้งหมดใน src
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ['Kanit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
