import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../index.html'
  ],
  theme: {
    extend: {
      colors: {
        'brand': 'var(--brand)',
        'brand-hover': 'var(--brand-hover)',
        'panel': 'var(--panel)',
        'panel-2': 'var(--panel-2)',
        'background': 'var(--bg)',
        'text-primary': 'var(--text)',
        'text-muted': 'var(--muted)',
        'border-color': 'var(--border)',
        'chip': 'var(--chip)',
        'chip-text': 'var(--chip-text)',
      },
      borderRadius: {
        'lg': '14px',
        'xl': '14px', // Updated to match screenshot
      },
      boxShadow: {
        'custom': 'var(--shadow)',
      }
    },
  },
  plugins: [],
}
export default config