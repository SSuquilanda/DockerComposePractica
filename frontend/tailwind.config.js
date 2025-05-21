/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
      },
      colors: {
        background: '#ffffff',    // blanco
        primary: '#0ea5e9',       // sky-500
        secondary: '#cbd5e1',     // slate-300
        success: '#22c55e',       // green-500
        danger: '#f43f5e',        // rose-500
        text: '#334155',          // slate-700
      },
    },
  },
  plugins: [],
};
