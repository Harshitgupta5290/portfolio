/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './utils/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // ── Semantic colour tokens ─────────────────────────────────────────────
      // All map to CSS variables so dark/light theme flips without touching components
      colors: {
        bg:         'var(--bg)',
        surface:    'var(--surface)',
        'surface-2':'var(--surface-2)',
        card:       'var(--card)',

        // Text
        'ink':       'var(--ink)',          // highest contrast body text
        'ink-2':     'var(--ink-2)',         // secondary
        'ink-3':     'var(--ink-3)',         // muted / labels

        // Borders
        'line':      'var(--line)',          // default border
        'line-2':    'var(--line-2)',         // subtle border

        // Brand accents — same in both themes, used sparingly
        cyan:        '#16f2b3',
        gold:        '#e8c547',
        rose:        '#f87171',
      },

      // ── Typography ──────────────────────────────────────────────────────────
      fontFamily: {
        sans:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-inter)', 'sans-serif'],
        mono:    ['Courier New', 'Courier', 'monospace'],
      },

      fontSize: {
        // Editorial scale — dramatic contrast
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
        '10xl': ['10rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
      },

      letterSpacing: {
        widest2: '0.25em',
        widest3: '0.35em',
      },

      // ── Spacing ─────────────────────────────────────────────────────────────
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':  'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        // Topology line used as section accent
        'topology':        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cpath d='M0 200 Q100 150 200 200 T400 200' stroke='%2316f2b310' fill='none' stroke-width='1'/%3E%3C/svg%3E\")",
      },

      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '3rem',
          xl: '4rem',
          '2xl': '4rem',
        },
      },

      screens: { '4k': '1980px' },

      // ── Animations ──────────────────────────────────────────────────────────
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'draw-line': {
          '0%':   { strokeDashoffset: '1' },
          '100%': { strokeDashoffset: '0' },
        },
        'grain': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%':  { transform: 'translate(-2%, -3%)' },
          '20%':  { transform: 'translate(3%, 2%)' },
          '30%':  { transform: 'translate(-1%, 4%)' },
          '40%':  { transform: 'translate(4%, -1%)' },
          '50%':  { transform: 'translate(-3%, 3%)' },
          '60%':  { transform: 'translate(2%, -4%)' },
          '70%':  { transform: 'translate(-4%, 1%)' },
          '80%':  { transform: 'translate(1%, -2%)' },
          '90%':  { transform: 'translate(3%, 4%)' },
        },
        'cursor-blink': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        'node-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.7' },
          '50%':      { transform: 'scale(1.4)', opacity: '1'  },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'fade-up':      'fade-up 0.6s cubic-bezier(0.22,1,0.36,1) forwards',
        'fade-in':      'fade-in 0.5s ease forwards',
        'grain':        'grain 8s steps(1) infinite',
        'cursor-blink': 'cursor-blink 1.1s step-end infinite',
        'node-pulse':   'node-pulse 2.5s ease-in-out infinite',
        'float':        'float 4s ease-in-out infinite',
        'spin-slow':    'spin 20s linear infinite',
      },
    },
  },
  plugins: [],
}
