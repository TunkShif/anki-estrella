import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { MoonIcon, SunIcon } from "@heroicons/react/outline"
import * as Toggle from "@radix-ui/react-toggle"

const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <Toggle.Root
      pressed={theme === "dark"}
      onPressedChange={(pressed) => {
        console.log(pressed)
        console.log(theme)
        setTheme(pressed ? "dark" : "light")
      }}
    >
      {theme === "dark" ? (
        <SunIcon className="h-6 w-6 text-gray-600" />
      ) : (
        <MoonIcon className="h-6 w-6 text-gray-600" />
      )}
    </Toggle.Root>
  )
}

export default DarkModeToggle
