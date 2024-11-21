import type { Config } from 'tailwindcss'

export default {
  content: [],
  theme: {
    extend: {
      zIndex: {
        '1000': '1000',
        '1100': '1100',
      },
      animation: {
        "scale-in-hor-center": "scale-in-hor-center 0.5s cubic-bezier(0.860, 0.000, 0.070, 1.000) 0.2s  both",
        "fade-in": "fade-in 0.4s ease-in-out   both",
      },
      keyframes: {
        "scale-in-hor-center": {
          "0%": {
            transform: "scaleX(0)",
            opacity: "1"
          },
          to: {
            transform: "scaleX(1)",
            opacity: "1"
          }
        },
        "fade-in": {
          "0%": {
            opacity: "0"
          },
          to: {
            opacity: "1"
          }
        }
      }
    },
  },
  plugins: [],
} satisfies Config
