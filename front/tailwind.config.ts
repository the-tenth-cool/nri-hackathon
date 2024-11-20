import type { Config } from 'tailwindcss'

export default {
  content: [],
  theme: {
    extend: {
      zIndex: {
        '1000': '1000',
        '1100': '1100',
      }
    },
  },
  plugins: [],
} satisfies Config
