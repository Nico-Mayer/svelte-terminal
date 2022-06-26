import { defineConfig } from "windicss/helpers"

export default defineConfig({
  attributify: true,
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        type: "type 0.5s steps(30, end)",
      },
      keyframes: {
        type: {
          "0%": { width: " 0%" },
          "100%": { width: "100%" },
        },
      },
    },
  },
  shortcuts: {
    line: " block m-0 overflow-hidden whitespace-pre animate-type",
  },
})
