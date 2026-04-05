/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#FFFFFF',
          alt: '#FAFAFA',
          border: '#EAEAEA',
          text: '#0A0A0A',
          muted: '#8A8A8A',
          accent: '#0A0A0A'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  corePlugins: {
    preflight: false, // Prevents Tailwind from wiping out vanilla CSS in the storefront
  },
  plugins: [],
}
