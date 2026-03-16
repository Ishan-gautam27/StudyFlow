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
        // These map to CSS variables — work in both light and dark mode
        base:    'var(--bg-base)',
        surface: 'var(--bg-surface)',
        card:    'var(--bg-card)',
        border:  'var(--border)',
        'border-bright': 'var(--border-bright)',
        bright:  'var(--text-bright)',
        soft:    'var(--text-soft)',
        dim:     'var(--text-dim)',
        muted:   'var(--text-muted)',
        // Fixed colors — same in both modes
        accent: {
          DEFAULT: '#6C8EF5',
          dim:     '#3D5BD4',
          bright:  '#92AAFF',
        },
        green:  { DEFAULT: '#34D399' },
        amber:  { DEFAULT: '#FBBF24' },
        red:    { DEFAULT: '#F87171' },
        purple: { DEFAULT: '#A78BFA' },
        teal:   { DEFAULT: '#2DD4BF' },
        coral:  { DEFAULT: '#FB923C' },
      },
      boxShadow: {
        'card':        'var(--shadow-card)',
        'card-hover':  'var(--shadow-card-hover)',
        'glow-accent': '0 0 24px rgba(108,142,245,0.15)',
      },
      animation: {
        'fade-in':    'fadeIn 0.3s ease-out',
        'slide-up':   'slideUp 0.4s cubic-bezier(0.16,1,0.3,1)',
        'slide-in-r': 'slideInR 0.35s cubic-bezier(0.16,1,0.3,1)',
        'scale-in':   'scaleIn 0.2s ease-out',
        'pulse-dot':  'pulseDot 2s ease-in-out infinite',
        'theme-in':   'themeSwitch 0.25s cubic-bezier(0.16,1,0.3,1)',
      },
      keyframes: {
        fadeIn:      { from: { opacity: '0' },                              to: { opacity: '1' } },
        slideUp:     { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideInR:    { from: { opacity: '0', transform: 'translateX(32px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        scaleIn:     { from: { opacity: '0', transform: 'scale(0.95)' },      to: { opacity: '1', transform: 'scale(1)' } },
        pulseDot:    { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.4' } },
        themeSwitch: { '0%': { transform: 'scale(0.85) rotate(-15deg)', opacity: '0' }, '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' } },
      },
    },
  },
  plugins: [],
}