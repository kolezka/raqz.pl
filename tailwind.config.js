/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
        },
      },
      animation: {
        // Background animations
        float: 'float 6s ease-in-out infinite',
        'float-reverse': 'float-reverse 8s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-reverse-slow': 'float-reverse 10s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',

        // Scroll-based animations
        'fade-up': 'fade-up 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'fade-down': 'fade-down 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'fade-left': 'fade-left 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'fade-right': 'fade-right 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'zoom-in': 'zoom-in 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'zoom-out': 'zoom-out 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'scale-in': 'scale-in 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-up': 'slide-up 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'flip-up': 'flip-up 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',

        // Interactive animations
        'button-press': 'button-press 0.1s cubic-bezier(0.4, 0, 1, 1)',
        shimmer: 'shimmer 2s linear infinite',
        wiggle: 'wiggle 0.5s ease-in-out',
        'bounce-gentle': 'bounce-gentle 0.6s ease-in-out',
      },
      keyframes: {
        // Background animations
        float: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(-20px) translateX(10px) rotate(1deg)' },
          '50%': { transform: 'translateY(-10px) translateX(-15px) rotate(-1deg)' },
          '75%': { transform: 'translateY(-30px) translateX(5px) rotate(0.5deg)' },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(20px) translateX(-10px) rotate(-1deg)' },
          '50%': { transform: 'translateY(10px) translateX(15px) rotate(1deg)' },
          '75%': { transform: 'translateY(30px) translateX(-5px) rotate(-0.5deg)' },
        },

        // Scroll-based animations
        'fade-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-left': {
          '0%': {
            opacity: '0',
            transform: 'translateX(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        'fade-right': {
          '0%': {
            opacity: '0',
            transform: 'translateX(-20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        'zoom-in': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.95)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        'zoom-out': {
          '0%': {
            opacity: '0',
            transform: 'scale(1.05)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        'scale-in': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.9)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        'slide-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'flip-up': {
          '0%': {
            opacity: '0',
            transform: 'perspective(400px) rotateX(90deg)',
          },
          '100%': {
            opacity: '1',
            transform: 'perspective(400px) rotateX(0deg)',
          },
        },

        // Interactive animations
        'button-press': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.95)' },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-200% center',
          },
          '100%': {
            backgroundPosition: '200% center',
          },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-3deg)' },
          '75%': { transform: 'rotate(3deg)' },
        },
        'bounce-gentle': {
          '0%, 100%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(-10px)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
      },
    },
  },
  plugins: [],
}
