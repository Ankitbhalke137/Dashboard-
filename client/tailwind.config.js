/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['Geist', 'system-ui', 'sans-serif'],
        display: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        surface: {
          dim: '#060e20',
          low: '#131b2e',
          DEFAULT: '#171f33',
          high: '#222a3d',
          highest: '#2d3449',
          bright: '#31394d',
        },
        primary: {
          DEFAULT: '#dbfcff',
          container: '#00f0ff',
          fixed: '#7df4ff',
          'fixed-dim': '#00dbe9',
        },
        secondary: {
          DEFAULT: '#ffffff',
          container: '#c3f400',
          fixed: '#c3f400',
          'fixed-dim': '#abd600',
        },
        tertiary: {
          container: '#e9d0ff',
          'fixed-dim': '#dcb8ff',
        },
        'on-surface': '#dae2fd',
        'on-surface-variant': '#b9cacb',
        outline: '#849495',
        'outline-variant': '#3b494b',
        'on-primary': '#00363a',
        'on-primary-container': '#006970',
        'on-secondary-container': '#1a3400',
        'on-tertiary-container': '#8523dd',
        error: {
          DEFAULT: '#ffb4ab',
          container: '#93000a',
        },
        'on-error': '#690005',
      },
      fontSize: {
        'headline-xl': ['48px', { lineHeight: '1.1', fontWeight: '700', letterSpacing: '-0.02em' }],
        'headline-lg': ['32px', { lineHeight: '1.2', fontWeight: '600', letterSpacing: '-0.01em' }],
        'headline-md': ['20px', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'label-md': ['14px', { lineHeight: '1.2', fontWeight: '500', textTransform: 'uppercase' }],
        'label-sm': ['12px', { lineHeight: '1.2', fontWeight: '500', textTransform: 'uppercase' }],
      },
      boxShadow: {
        'neon-cyan': '0 0 15px rgba(0, 240, 255, 0.2)',
        'neon-lime': '0 0 15px rgba(195, 244, 0, 0.2)',
        'neon-gold': '0 0 15px rgba(255, 215, 0, 0.3)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'pulse-cyan': 'pulseCyan 3s ease-in-out infinite',
        'pulse-gold': 'pulseGold 3s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'cyber-ring': 'cyberRing 10s linear infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'reveal': 'reveal 0.6s ease-out forwards',
        'glow-cyan': 'glowCyan 2s ease-in-out infinite alternate',
      },
      keyframes: {
        pulseCyan: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(0, 240, 255, 0.3)' },
          '50%': { boxShadow: '0 0 25px rgba(0, 240, 255, 0.6), 0 0 50px rgba(0, 240, 255, 0.3)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(255, 215, 0, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(255, 215, 0, 0.6), 0 0 60px rgba(255, 215, 0, 0.3)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        cyberRing: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        reveal: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glowCyan: {
          '0%': { textShadow: '0 0 5px rgba(0, 240, 255, 0.5)' },
          '100%': { textShadow: '0 0 20px rgba(0, 240, 255, 0.8), 0 0 40px rgba(0, 240, 255, 0.4)' },
        },
      },
    },
  },
  plugins: [],
}
