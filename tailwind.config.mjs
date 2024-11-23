/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Cal Sans', 'Inter var', 'system-ui', '-apple-system', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            a: {
              color: 'var(--tw-prose-links)',
              textDecoration: 'none',
              '&:hover': {
                color: 'var(--tw-prose-links-hover)',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 