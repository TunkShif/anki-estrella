import "@fontsource-variable/figtree"
import {
  Link,
  Links,
  Meta,
  type MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react"
import { BookAIcon, LayersIcon, SettingsIcon } from "lucide-react"
import { css } from "styled-system/css"
import { Box } from "styled-system/jsx"
import { hstack } from "styled-system/patterns"
import { Toaster } from "~/components/toaster"
import { IconButton } from "~/components/ui/icon-button"
import styles from "~/style.css?url"

export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

export const meta: MetaFunction = () => {
  return [
    { title: "Anki Estrella" },
    { name: "description", content: "Anki Estrella helps you to make word card for Anki!" }
  ]
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="favicon.png" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <Toaster />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return (
    <Box py="6" mx="auto" maxW="lg">
      <Header />
      <main className={css({ mt: "2" })}>
        <Outlet />
      </main>
      <Toaster />
    </Box>
  )
}

const Header = () => {
  return (
    <header>
      <ul className={hstack({ justifyContent: "flex-end", gap: "0.5" })}>
        <li>
          <IconButton variant="ghost" asChild>
            <Link to="/workspace">
              <LayersIcon />
            </Link>
          </IconButton>
        </li>
        <li>
          <IconButton variant="ghost" asChild>
            <Link to="/dictionaries">
              <BookAIcon />
            </Link>
          </IconButton>
        </li>
        <li>
          <IconButton variant="ghost" asChild>
            <Link to="/settings">
              <SettingsIcon />
            </Link>
          </IconButton>
        </li>
      </ul>
    </header>
  )
}
