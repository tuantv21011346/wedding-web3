/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'heading': ['Playfair Display', 'Times New Roman', 'serif'],
        'script': ['Dancing Script', 'cursive'],
        'elegant': ['Great Vibes', 'cursive'],
        'body': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'serif': ['Playfair Display', 'serif'],
      },
      colors: {
        primary: {
          50: '#FDF2F8',   // Ultra light pink-purple pastel
          100: '#FCE7F3',  // Very light pink-purple pastel
          200: '#FBCFE8',  // Light pink-purple pastel
          300: '#F9A8D4',  // Medium light pink-purple pastel
          400: '#F472B6',  // Medium pink-purple pastel
          500: '#EC4899',  // Main primary color (soft pink-purple)
          600: '#DB2777',  // Darker pink-purple
          700: '#BE185D',  // Dark pink-purple
          800: '#9D174D',  // Very dark pink-purple
          900: '#831843',  // Darkest pink-purple
        },
        accent: {
          50: '#FAF5FF',   // Ultra light purple pastel
          100: '#F3E8FF',  // Very light purple pastel
          200: '#E9D5FF',  // Light purple pastel
          300: '#D8B4FE',  // Medium light purple pastel
          400: '#C084FC',  // Medium purple pastel
          500: '#A855F7',  // Main accent color (soft purple)
          600: '#9333EA',  // Darker purple
          700: '#7C3AED',  // Dark purple
          800: '#6B21A8',  // Very dark purple
          900: '#581C87',  // Darkest purple
        },
        wedding: {
          50: '#FEF7FF',   // Ultra light lavender
          100: '#FCEEFF',  // Very light lavender
          200: '#F8DDFF',  // Light lavender
          300: '#F2BCFF',  // Medium light lavender
          400: '#E899FF',  // Medium lavender
          500: '#DA77FF',  // Main wedding color (bright lavender)
          600: '#C855F7',  // Darker lavender
          700: '#B444E8',  // Dark lavender
          800: '#9333D9',  // Very dark lavender
          900: '#7A22CA',  // Darkest lavender
        },
        'pastel-purple': {
          50: '#FAF5FF',
          100: '#F3E8FF',
          200: '#E9D5FF',
          300: '#D8B4FE',
          400: '#C084FC',
          500: '#A855F7',
          600: '#9333EA',
          700: '#7C3AED',
          800: '#6B21A8',
          900: '#581C87',
        },
        'pastel-pink': {
          50: '#FDF2F8',
          100: '#FCE7F3',
          200: '#FBCFE8',
          300: '#F9A8D4',
          400: '#F472B6',
          500: '#EC4899',
          600: '#DB2777',
          700: '#BE185D',
          800: '#9D174D',
          900: '#831843',
        },      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
