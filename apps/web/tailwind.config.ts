import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#f6f3ec',
        surface: '#fffdf8',
        ink: {
          DEFAULT: '#17150f',
          muted: '#6b6355',
          soft: '#9a9182',
        },
        line: '#e2dbcc',
        primary: {
          50: '#fdf2ee',
          100: '#fbe0d7',
          200: '#f6c1b0',
          300: '#ee9a80',
          400: '#e4704f',
          500: '#d64f2c',
          600: '#b93c1e',
          700: '#972f18',
          800: '#7b2815',
          900: '#652414',
          950: '#371008',
        },
        gray: {
          50: '#f8f5ef',
          100: '#f2ede3',
          200: '#e5ded0',
          300: '#d2c8b6',
          400: '#a79b87',
          500: '#7f7462',
          600: '#625a4b',
          700: '#4a4337',
          800: '#302b23',
          900: '#1d1a14',
          950: '#12100b',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      borderRadius: {
        none: '0px',
        sm: '2px',
        DEFAULT: '3px',
        md: '4px',
        lg: '5px',
        xl: '6px',
        '2xl': '8px',
        '3xl': '12px',
      },
      boxShadow: {
        lift: '0 24px 48px -28px rgba(23, 21, 15, 0.45)',
        plate: '0 1px 0 0 rgba(226, 219, 204, 0.9)',
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [],
};

export default config;
