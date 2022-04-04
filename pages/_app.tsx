import type { AppProps } from "next/app"
import { ThemeProvider } from "next-themes"
import { Provider as JotaiProvider } from "jotai"
import { Provider as TooltipProvider } from "@radix-ui/react-tooltip"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import "../styles/globals.css"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <JotaiProvider>
      <ThemeProvider attribute="class">
        <DndProvider backend={HTML5Backend}>
          <TooltipProvider delayDuration={300}>
            <Component {...pageProps} />
          </TooltipProvider>
        </DndProvider>
      </ThemeProvider>
    </JotaiProvider>
  )
}

export default MyApp
