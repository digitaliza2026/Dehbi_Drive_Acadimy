/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f4fa',
          100: '#dae3f3',
          200: '#b5c7e7',
          300: '#8aa6d6',
          400: '#5d7fbf',
          500: '#3d5fa3',
          600: '#2c4682',
          700: '#1e3163',
          800: '#142149',
          900: '#0b1430',
          950: '#060b1f'
        },
        gold: {
          50: '#fdf8ea',
          100: '#faecc8',
          200: '#f5d88c',
          300: '#efbe50',
          400: '#eaa630',
          500: '#d68920',
          600: '#b96919',
          700: '#944b18',
          800: '#793c1a',
          900: '#67321b',
          950: '#3b190a'
        }
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif']
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' }
        }
      }
    }
  },
  plugins: []
};
