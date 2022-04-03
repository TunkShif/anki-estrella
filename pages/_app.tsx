import "../styles/globals.css"
import type { AppProps } from "next/app"
import { ThemeProvider } from "next-themes"
import { Provider as TooltipProvider } from "@radix-ui/react-tooltip"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <TooltipProvider delayDuration={300}>
        <Component {...pageProps} />
      </TooltipProvider>
    </ThemeProvider>
  )
}

export default MyApp
