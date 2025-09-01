import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter Variable', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Cal Sans', 'Inter Variable', 'sans-serif'],
        serifDisplay: ['Playfair Display', 'Georgia', 'serif'],
      },
      colors: {
        'accent-1': '#FAFAFA',
        'accent-2': '#EAEAEA',
        'accent-7': '#333',
        success: '#0070f3',
        cyan: '#79FFE1',
        // Dynamic theme tokens via CSS variables (updated by ThemeRuntime)
        'dark': 'var(--color-dark)',
        'dark-secondary': 'var(--color-dark-secondary)',
        'light': 'var(--color-light)',
        'electric': 'var(--accent-color)',
        'electric-secondary': 'var(--accent-secondary-color)',
        'accent': 'var(--accent-color)',
        'muted': '#6b7280',
        'surface': 'var(--color-surface)',
        'border': 'var(--color-border)'
      },
      spacing: {
        28: '7rem',
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      lineHeight: {
        tight: '1.2',
      },
      fontSize: {
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem',
      },
      boxShadow: {
        sm: '0 5px 10px rgba(0, 0, 0, 0.12)',
        md: '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
};
export default config;
