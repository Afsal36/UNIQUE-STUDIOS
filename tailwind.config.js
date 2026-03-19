/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          950: '#0B0B0F',
          900: '#1A1A2E',
          800: '#24183a',
          500: '#7C3AED',
          400: '#A855F7',
          300: '#C084FC',
        },
      },
      fontFamily: {
        display: ["Space Grotesk", 'sans-serif'],
        body: ["Inter", 'sans-serif'],
      },
      boxShadow: {
        glass: '0 20px 60px rgba(0, 0, 0, 0.42)',
        glow: '0 0 30px rgba(168, 85, 247, 0.24)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #7C3AED, #C084FC)',
      },
    },
  },
  plugins: [],
};


