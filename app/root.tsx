import "@fontsource-variable/figtree"
import { ManifestLink } from "@remix-pwa/sw"
import {
  Links,
  Meta,
  type MetaFunction,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation
} from "@remix-run/react"
import { QueryClientProvider } from "@tanstack/react-query"
import { BookAIcon, HomeIcon, SettingsIcon } from "lucide-react"
import { css } from "styled-system/css"
import { Box } from "styled-system/jsx"
import { hstack } from "styled-system/patterns"
import { Spinner } from "~/components/spinner"
import { Toaster } from "~/components/toaster"
import { Tooltip } from "~/components/tooltip"
import { IconButton } from "~/components/ui/icon-button"
import { queryClient } from "~/libs/query"
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
        <link rel="icon" type="image/png" href="/favicon.png" />
        <ManifestLink />
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
  const navigation = useNavigation()
  const isNavigating = navigation.state !== "idle"

  return (
    <QueryClientProvider client={queryClient}>
      <Box py="6" mx="auto" maxW="lg">
        <Header />
        <main
          className={css({
            mt: "2",
            _loading: { opacity: "0.6" }
          })}
          aria-busy={isNavigating || undefined}
        >
          <Outlet />
        </main>
        <Toaster />
      </Box>
    </QueryClientProvider>
  )
}

const Header = () => {
  const navigation = useNavigation()
  const isNavigating = navigation.state !== "idle"

  return (
    <header className={hstack({ gap: "0", justifyContent: "space-between" })}>
      <Box>{isNavigating && <Spinner color="accent.text" />}</Box>

      <ul className={hstack({ justifyContent: "flex-end", gap: "0.5" })}>
        <li>
          <Tooltip content="Home">
            <IconButton variant="ghost" asChild>
              <NavLink to="/workspace">
                <HomeIcon />
              </NavLink>
            </IconButton>
          </Tooltip>
        </li>

        <li>
          <Tooltip content="Dictionaries">
            <IconButton variant="ghost" asChild>
              <NavLink to="/dictionaries">
                <BookAIcon />
              </NavLink>
            </IconButton>
          </Tooltip>
        </li>

        <li>
          <Tooltip content="Settings">
            <IconButton variant="ghost" asChild>
              <NavLink to="/settings">
                <SettingsIcon />
              </NavLink>
            </IconButton>
          </Tooltip>
        </li>
      </ul>
    </header>
  )
}
