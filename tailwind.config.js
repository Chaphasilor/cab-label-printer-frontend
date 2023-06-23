/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./main.js",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black': `hsla(0, 0%, 0%, 1)`,
        'text-blue': `hsla(196, 48%, 6%, 1)`,
        'text-white': `hsla(0, 0%, 100%, 1)`,
        'light-blue': `hsla(197, 49%, 80%, 1)`,
        'blue': `hsla(197, 49%, 65%, 1)`,
        'bluer': `hsla(197, 49%, 60%, 1)`,
        'black-inactive': `sla(0, 0%, 0%, 0.6)`,
        'dark-blue': `hsla(197, 80%, 25%, 1)`,
        'background-blue': `hsla(197, 37%, 96%, 1)`,
        'preview-text': `hsla(0, 0%, 27%, 1)`,
        'border': `hsla(0, 0%, 63%, 1)`,
      }
    },
  },
  plugins: [],
}

