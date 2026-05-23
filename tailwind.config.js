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
        accent: '#d97757',
        'accent-dim': '#b85f3f',
        'accent-bright': '#e8916f',
        'bg': '#1a1612',
        'surface': '#221e18',
        'surface-2': '#2a2520',
        'surface-3': '#332d27',
        'cream': '#f5f0e8',
        'cream-dim': '#b8ab9c',
        'cream-muted': '#6b5f52',
        'border': 'rgba(245,240,232,0.07)',
        'border-hover': 'rgba(217,119,87,0.5)',
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
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(217,119,87,0)' },
          '50%': { boxShadow: '0 0 24px 4px rgba(217,119,87,0.3)' },
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
        'glow-sm': '0 0 10px rgba(217,119,87,0.2)',
        'glow': '0 0 24px rgba(217,119,87,0.3)',
        'glow-lg': '0 0 48px rgba(217,119,87,0.4)',
        'card': '0 1px 0 rgba(255,255,255,0.04), 0 4px 16px rgba(0,0,0,0.4)',
      },
      backgroundImage: {
        'dot-grid': 'radial-gradient(circle, rgba(245,240,232,0.05) 1px, transparent 1px)',
        'accent-gradient': 'linear-gradient(135deg, #d97757 0%, #b85f3f 100%)',
      },
      backgroundSize: {
        'dot-grid': '24px 24px',
      },
    },
  },
  plugins: [],
};
