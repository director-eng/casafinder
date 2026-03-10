import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Primary blues
          blue:            '#0F5AE5',
          'blue-hover':    '#0B4CC4',
          'blue-active':   '#0A44B0',
          'blue-soft':     '#EAF2FF',

          // Typography
          'text-primary':   '#1F2937',
          'text-secondary': '#5B6472',
          'text-muted':     '#7A8494',

          // Borders & backgrounds
          'border-light':  '#E5E7EB',
          'bg-subtle':     '#F5F7FA',
          'panel-gray':    '#F8F9FB',

          // Semantic
          success:  '#1F8F5F',
          warning:  '#B7791F',
          error:    '#C73E3A',

          // Optional accent (use sparingly)
          'palm-green': '#2F7D57',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'sans-serif',
        ],
      },
      fontSize: {
        'display': ['3.5rem',    { lineHeight: '1.1',  fontWeight: '800', letterSpacing: '-0.02em' }],
        'h1':      ['2.5rem',    { lineHeight: '1.2',  fontWeight: '700', letterSpacing: '-0.01em' }],
        'h2':      ['2rem',      { lineHeight: '1.25', fontWeight: '700', letterSpacing: '-0.01em' }],
        'h3':      ['1.5rem',    { lineHeight: '1.3',  fontWeight: '600' }],
        'h4':      ['1.25rem',   { lineHeight: '1.35', fontWeight: '600' }],
        'body-lg': ['1.125rem',  { lineHeight: '1.6' }],
        'body-sm': ['0.875rem',  { lineHeight: '1.5' }],
        'ui':      ['0.8125rem', { lineHeight: '1.4',  fontWeight: '500', letterSpacing: '0.005em' }],
        'micro':   ['0.6875rem', { lineHeight: '1.4',  letterSpacing: '0.01em' }],
      },
      borderRadius: {
        'sm':   '6px',
        'md':   '8px',
        'lg':   '12px',
        'xl':   '16px',
        'pill': '9999px',
      },
      boxShadow: {
        'xs':  '0 1px 2px rgba(16,24,40,0.06)',
        'sm':  '0 2px 4px rgba(16,24,40,0.07)',
        'md':  '0 4px 10px rgba(16,24,40,0.08)',
        'lg':  '0 12px 24px rgba(16,24,40,0.10)',
        'map': '0 2px 8px rgba(16,24,40,0.12)',
      },
      transitionDuration: {
        'fast':   '120ms',
        'normal': '180ms',
        'medium': '240ms',
        'slow':   '300ms',
      },
    },
  },
  plugins: [],
}

export default config
