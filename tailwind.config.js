/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Sora"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        base:    '#0D0F14',
        surface: '#131720',
        card:    '#161B27',
        border:  '#1E2535',
        'border-bright': '#2A3347',
        muted:   '#3D4F6B',
        dim:     '#6B7FA3',
        soft:    '#A8B8D4',
        bright:  '#E2E8F4',
        accent: {
          DEFAULT: '#6C8EF5',
          dim:     '#3D5BD4',
          glow:    '#6C8EF522',
          bright:  '#92AAFF',
        },
        green:  { DEFAULT: '#34D399', dim: '#064E3B', glow: '#34D39922' },
        amber:  { DEFAULT: '#FBBF24', dim: '#78350F', glow: '#FBBF2422' },
        red:    { DEFAULT: '#F87171', dim: '#7F1D1D', glow: '#F8717122' },
        purple: { DEFAULT: '#A78BFA', dim: '#4C1D95', glow: '#A78BFA22' },
        teal:   { DEFAULT: '#2DD4BF', dim: '#134E4A', glow: '#2DD4BF22' },
        coral:  { DEFAULT: '#FB923C', dim: '#7C2D12', glow: '#FB923C22' },
      },
      boxShadow: {
        'glow-accent': '0 0 24px rgba(108,142,245,0.15)',
        'glow-green':  '0 0 20px rgba(52,211,153,0.12)',
        'card':        '0 4px 24px rgba(0,0,0,0.4)',
        'card-hover':  '0 8px 40px rgba(0,0,0,0.6)',
      },
      animation: {
        'fade-in':    'fadeIn 0.3s ease-out',
        'slide-up':   'slideUp 0.4s cubic-bezier(0.16,1,0.3,1)',
        'slide-in-r': 'slideInR 0.35s cubic-bezier(0.16,1,0.3,1)',
        'scale-in':   'scaleIn 0.2s ease-out',
        'pulse-dot':  'pulseDot 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:   { from: { opacity: '0' },                              to: { opacity: '1' } },
        slideUp:  { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideInR: { from: { opacity: '0', transform: 'translateX(32px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        scaleIn:  { from: { opacity: '0', transform: 'scale(0.95)' },      to: { opacity: '1', transform: 'scale(1)' } },
        pulseDot: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.4' } },
      },
    },
  },
  plugins: [],
}