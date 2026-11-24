/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#FF8A0A',
          50: '#FFF4E6',
          100: '#FFE4BF',
          200: '#FFCB80',
          300: '#FFB24D',
          400: '#FF9E26',
          500: '#FF8A0A',
          600: '#E67200',
          700: '#B85700',
          800: '#8A4200',
          900: '#5C2C00',
        },
        maroon: {
          DEFAULT: '#7F1521',
          light: '#9A1B2A',
          dark: '#5E0F18',
          gold: '#FFD27A',
        },
        cream: {
          DEFAULT: '#F5EBDC',
          surface: '#FFF8EE',
          border: '#E8D9C3',
        },
        ink: {
          DEFAULT: '#0A0A0A',
          surface: '#141011',
          border: '#2A2220',
        },
        textBase: '#1A1210',
        muted: '#6B5F57',
        success: '#2DBE60',
        danger: '#E5392B',
      },
      fontFamily: {
        display: ['Outfit', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        hand: ['Caveat', 'cursive'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        wide2: '0.15em',
      },
      borderRadius: {
        card: '24px',
      },
      boxShadow: {
        glow: '0 10px 40px -10px rgba(255, 138, 10, 0.45)',
        'glow-lg': '0 20px 60px -15px rgba(255, 138, 10, 0.55)',
        card: '0 8px 30px -12px rgba(10, 18, 16, 0.15)',
        'card-dark': '0 8px 30px -12px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out forwards',
        marquee: 'marquee 30s linear infinite',
        'pulse-dot': 'pulse-dot 1.4s ease-in-out infinite',
        'pop-in': 'pop-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      },
      textColor: {
        primary: 'var(--text-primary)',
        'muted-token': 'var(--text-muted)',
      },
      backgroundColor: {
        card: 'var(--surface-card)',
      },
      borderColor: {
        card: 'var(--border-card)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        'pop-in': {
          '0%': { opacity: '0', transform: 'scale(0.7)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
