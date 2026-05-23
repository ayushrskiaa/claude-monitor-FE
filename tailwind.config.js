/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#9945de',
        'accent-dim': '#6d2fa3',
        'accent-bright': '#b87ae8',
        'surface': '#0a0a0a',
        'surface-2': '#111111',
        'surface-3': '#1a1a1a',
        'border': 'rgba(255,255,255,0.07)',
        'border-hover': 'rgba(153,69,222,0.5)',
      },
      fontFamily: {
        mono: ['var(--font-space-mono)', 'Courier New', 'monospace'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        code: ['var(--font-jetbrains)', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'event-in': 'eventSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fadeIn 0.6s ease-out both',
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2.5s ease-in-out infinite',
        'scan': 'scan 8s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
        'blink': 'blink 1.2s step-end infinite',
      },
      keyframes: {
        eventSlideIn: {
          '0%': { transform: 'translateY(-12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(153,69,222,0)' },
          '50%': { boxShadow: '0 0 24px 4px rgba(153,69,222,0.3)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(153,69,222,0.2)',
        'glow': '0 0 24px rgba(153,69,222,0.3)',
        'glow-lg': '0 0 48px rgba(153,69,222,0.4)',
        'card': '0 1px 0 rgba(255,255,255,0.04), 0 4px 16px rgba(0,0,0,0.4)',
      },
      backgroundImage: {
        'dot-grid': 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
        'accent-gradient': 'linear-gradient(135deg, #9945de 0%, #6d2fa3 100%)',
      },
      backgroundSize: {
        'dot-grid': '24px 24px',
      },
    },
  },
  plugins: [],
};
