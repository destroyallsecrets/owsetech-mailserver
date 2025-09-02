/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'bg-retroGray', 'bg-retroBlue', 'bg-white',
    'text-retroBlue', 'text-retroGray', 'text-white',
    'border-retroBlue', 'border-retroGray',
    'shadow-retro', 'shadow-insetRetro',
    'rounded-retro', 'p-retro-pad',
    'min-w-retro', 'max-w-retro',
    'hover:bg-retroGray/20', 'hover:bg-retroBlue/80',
    'hover:text-retroBlue', 'hover:text-white',
    'transition-all', 'ease-out',
    'animate-fade-in', 'animate-window-open',
  ],
  theme: {
    extend: {
      colors: {
        retroGray: '#e5e7eb',
        retroBlue: '#3a6ea5',
      },
      boxShadow: {
        retro: '0 2px 8px 0 #b0b0b0, 0 1px 0 0 #fff inset',
        insetRetro: 'inset 2px 2px 6px #b0b0b0, inset -2px -2px 6px #fff',
      },
      borderRadius: {
        retro: '6px',
      },
      padding: {
        'retro-pad': '0.5rem',
      },
      minWidth: {
        retro: '320px',
      },
      maxWidth: {
        retro: '100vw',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'window-open': 'windowOpen 0.4s cubic-bezier(0.4,0,0.2,1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        windowOpen: {
          '0%': { opacity: 0, transform: 'scale(0.98)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
      },
    },
  },
  plugins: [],
};
