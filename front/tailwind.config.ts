import type { Config } from 'tailwindcss'

export default {
  content: [],
  theme: {
    extend: {
      zIndex: {
        '100': '100',
        '101': '101',
        '102': '102',
        '1000': '1000',
        '1100': '1100',
        '2000': '2000',
      },
      height: {
        '100': '25rem',
        '104': '26rem',
        '108': '27rem',
        '112': '28rem',
        '116': '29rem',
        '120': '30rem',
        '124': '31rem',
        '128': '32rem',
        '132': '33rem',
        '136': '34rem',
        '140': '35rem',
        '144': '36rem',
        '148': '37rem',
        '152': '38rem',
        '156': '39rem',
        '160': '40rem',
      },
      animation: {
        "scale-in-hor-center": "scale-in-hor-center 0.5s cubic-bezier(0.860, 0.000, 0.070, 1.000) 0.2s  both",
        "fade-in": "fade-in 0.4s ease-in-out   both",
        "slide-in-bottom": "slide-in-bottom 0.8s cubic-bezier(0.215, 0.610, 0.355, 1.000)   both",
        "swing-out-right-bck": "swing-out-right-bck 0.55s ease-in   both",
        "slide-out-bottom": "slide-out-bottom 0.8s cubic-bezier(0.645, 0.045, 0.355, 1.000) 0.2s   both",
        "slide-out-top": "slide-out-top 0.3s cubic-bezier(0.645, 0.045, 0.355, 1.000)   both",
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
        },
        "slide-in-bottom": {
          "0%": {
            transform: "translateY(1000px)",
            opacity: "0"
          },
          to: {
            transform: "translateY(0)",
            opacity: "1"
          }
        },
        "swing-out-right-bck": {
          "0%": {
            transform: "rotateY(0)",
            "transform-origin": "right",
            opacity: "1"
          },
          to: {
            transform: "rotateY(-100deg)",
            "transform-origin": "right",
            opacity: "0"
          }
        },
        "slide-out-bottom": {
          "0%": {
            transform: "translateY(0)",
            opacity: "1"
          },
          to: {
            transform: "translateY(1000px)",
            opacity: "0"
          }
        },
        "slide-out-top": {
          "0%": {
            transform: "translateY(0)",
            opacity: "1"
          },
          to: {
            transform: "translateY(-1000px)",
            opacity: "0"
          }
        }
      }
    },
  },
  plugins: [],
} satisfies Config
