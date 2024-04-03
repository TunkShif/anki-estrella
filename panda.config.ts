import { defineConfig } from "@pandacss/dev"
import { createPreset } from "@park-ui/panda-preset"

export default defineConfig({
  preflight: true,
  presets: [
    "@pandacss/preset-base",
    createPreset({
      grayColor: "slate",
      accentColor: "blue",
      borderRadius: "lg"
    })
  ],
  include: ["./app/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  theme: {
    extend: {
      tokens: {
        fonts: {
          "fig-tree": { value: "var(--font-fig-tree), sans-serif" }
        }
      }
    }
  },
  jsxFramework: "react",
  outdir: "styled-system"
})
