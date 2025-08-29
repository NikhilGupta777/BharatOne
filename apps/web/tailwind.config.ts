import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../index.html'
  ],
  theme: {
    extend: {
      colors: {
        'brand': '#ff7a00',
        'brand-2': '#007f5f',
        'panel': '#141821',
        'panel-2': '#0d1117',
        'background': '#0f1115',
        'text-primary': '#e6e6e6',
        'text-muted': '#9ba4b5',
        'border-color': '#232a36',
      },
      borderRadius: {
        'lg': '14px',
        'xl': '22px',
      }
    },
  },
  plugins: [],
}
export default config
