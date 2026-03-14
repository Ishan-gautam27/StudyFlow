/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Sora"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        base:    '#0D0F14',
        surface: '#161B27',
        raised:  '#1C2333',
        border:  '#1E2535',
        'border-bright': '#2A3450',
        accent:  { DEFAULT: '#6C8EF5', dark: '#5A7AE8', glow: 'rgba(108,142,245,0.15)' },
        text:    { primary: '#E8EBF4', secondary: '#8B93A8', muted: '#525D78', faint: '#353D54' },
        green:   { DEFAULT: '#3DD68C', dim: 'rgba(61,214,140,0.12)' },
        red:     { DEFAULT: '#F05C6E', dim: 'rgba(240,92,110,0.12)'  },
        amber:   { DEFAULT: '#F5A623', dim: 'rgba(245,166,35,0.12)'  },
        purple:  { DEFAULT: '#A78BFA', dim: 'rgba(167,139,250,0.12)' },
        cat: {
          academic:  '#6C8EF5',
          campus:    '#3DD68C',
          services:  '#F5A623',
          community: '#F472B6',
          official:  '#A78BFA',
        }
      },
      boxShadow: {
        card:   '0 1px 3px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)',
        glow:   '0 0 24px rgba(108,142,245,0.18)',
        'glow-sm': '0 0 12px rgba(108,142,245,0.12)',
      },
      borderRadius: { '2xl':'1rem','3xl':'1.5rem','4xl':'2rem' },
      animation: {
        'fade-in':    'fadeIn 0.2s ease-out',
        'slide-up':   'slideUp 0.3s ease-out',
        'slide-in-r': 'slideInR 0.3s ease-out',
        'pulse-dot':  'pulseDot 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:   { from:{ opacity:0 },            to:{ opacity:1 } },
        slideUp:  { from:{ transform:'translateY(12px)', opacity:0 }, to:{ transform:'translateY(0)', opacity:1 } },
        slideInR: { from:{ transform:'translateX(100%)' }, to:{ transform:'translateX(0)' } },
        pulseDot: { '0%,100%':{ opacity:1, transform:'scale(1)' }, '50%':{ opacity:0.5, transform:'scale(0.85)' } },
      },
    },
  },
  plugins: [],
}