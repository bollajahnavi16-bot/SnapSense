/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        snapdragon: {
          crimson: '#E60012',
          red: '#FF3B30',
          dark: '#080B11',
          card: '#0F1523',
          border: '#1E293B',
          cyan: '#00F2FE',
          emerald: '#10B981',
          gold: '#FFB800'
        }
      },
      boxShadow: {
        'npu-glow': '0 0 25px -5px rgba(230, 0, 18, 0.4)',
        'cyan-glow': '0 0 20px -3px rgba(0, 242, 254, 0.3)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      }
    },
  },
  plugins: [],
}
