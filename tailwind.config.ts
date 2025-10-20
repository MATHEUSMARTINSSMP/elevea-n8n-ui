import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    container: { center: true, padding: '1rem' },
    extend: {
      fontFamily: { sans: ['Inter','ui-sans-serif','system-ui'] },
      colors: {
        brand: {
          50: '#fff1f2',
          500: '#f43f5e',   // mude aqui se quiser manter seu laranja
          600: '#e11d48',
        },
      },
      borderRadius: { xl: '1rem', '2xl': '1.25rem' },
      boxShadow: { soft: '0 8px 30px rgba(0,0,0,0.06)' },
    },
  },
  plugins: [],
} satisfies Config