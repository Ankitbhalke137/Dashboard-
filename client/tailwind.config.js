/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
        display: ['"Space Grotesk"', 'sans-serif'],
      },
      colors: {
        neon: {
          green: '#00ff41',
          blue: '#00d4ff',
          pink: '#ff00ff',
          yellow: '#ffff00',
          cyan: '#00ffff',
        },
        dark: {
          50: '#f0f0f0',
          100: '#1a1a2e',
          200: '#16213e',
          300: '#0f3460',
          400: '#0a0a0a',
          500: '#0d1117',
          600: '#161b22',
          700: '#21262d',
          800: '#30363d',
          900: '#484f58',
        },
        card: {
          DEFAULT: '#1a1a2e',
          hover: '#16213e',
          border: '#00ff41',
        },
      },
      animation: {
        'pulse-neon': 'pulseNeon 2s ease-in-out infinite',
        'glow': 'glow 1.5s ease-in-out infinite alternate',
        'typing': 'typing 3.5s steps(40, end)',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        pulseNeon: {
          '0%, 100%': { boxShadow: '0 0 5px #00ff41, 0 0 10px #00ff41' },
          '50%': { boxShadow: '0 0 20px #00ff41, 0 0 40px #00ff41' },
        },
        glow: {
          '0%': { textShadow: '0 0 5px currentColor' },
          '100%': { textShadow: '0 0 20px currentColor, 0 0 40px currentColor' },
        },
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

