import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0A0E1A',
        'bg-secondary': '#111827',
        'bg-card': 'rgba(255,255,255,0.05)',
        'bg-card-hover': 'rgba(255,255,255,0.08)',
        'accent-blue': '#3B7DED',
        'accent-gold': '#F5C542',
        'text-primary': '#F0F0F0',
        'text-secondary': '#8899AA',
        'border-subtle': 'rgba(255,255,255,0.06)',
      },
      borderRadius: {
        card: '14px',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.2em',
      },
    },
  },
  plugins: [],
}

export default config
