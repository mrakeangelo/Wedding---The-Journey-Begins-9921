/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'script': ['Dancing Script', 'cursive'],
        'serif': ['Playfair Display', 'serif'],
      },
      colors: {
        blush: {
          50: '#fdf7f0',
          100: '#fbeee1',
          200: '#f7dbc2',
          300: '#f2c29e',
          400: '#eca072',
          500: '#e88454',
          600: '#da6d3a',
          700: '#b65530',
          800: '#92462d',
          900: '#753b28',
        },
        cream: {
          50: '#fefdfb',
          100: '#fdf9f0',
          200: '#faf2de',
          300: '#f6e8c7',
          400: '#f0d9a7',
          500: '#e8c686',
          600: '#ddb165',
          700: '#cc9a4a',
          800: '#a87c3e',
          900: '#896538',
        },
        dustyBlue: {
          50: '#f4f7fa',
          100: '#e8eef4',
          200: '#d6e3ec',
          300: '#bdd2e0',
          400: '#9fbbd1',
          500: '#86a5c4',
          600: '#7492b6',
          700: '#6981a6',
          800: '#5a6d87',
          900: '#4c5a6d',
        },
        lavender: {
          50: '#faf9fc',
          100: '#f4f2f8',
          200: '#ebe7f1',
          300: '#ddd6e7',
          400: '#cbbfda',
          500: '#b6a5cb',
          600: '#a08bb8',
          700: '#8c76a3',
          800: '#736186',
          900: '#5f516d',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'page-turn': 'pageTurn 1s ease-in-out',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'confetti': 'confetti 3s ease-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pageTurn: {
          '0%': { transform: 'rotateY(0deg)' },
          '50%': { transform: 'rotateY(-90deg)' },
          '100%': { transform: 'rotateY(0deg)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0', transform: 'scale(0)' },
          '50%': { opacity: '1', transform: 'scale(1)' },
        },
        confetti: {
          '0%': { transform: 'translateY(-100vh) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(360deg)', opacity: '0' },
        },
      },
      backgroundImage: {
        'paper-texture': "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\" viewBox=\"0 0 100 100\"%3E%3Cg fill-opacity=\"0.03\"%3E%3Cpolygon fill=\"%23000\" points=\"50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40\"/%3E%3C/g%3E%3C/svg%3E')",
        'watercolor': "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"200\" height=\"200\" viewBox=\"0 0 200 200\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.85\" numOctaves=\"1\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\" opacity=\"0.02\"/%3E%3C/svg%3E')",
      }
    },
  },
  plugins: [],
}