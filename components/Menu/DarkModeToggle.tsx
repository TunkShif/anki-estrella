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
        setTheme(pressed ? "dark" : "light")
      }}
    >
      {theme === "dark" ? (
        <SunIcon className="h-6 w-6 text-gray-600 transition duration-300 hover:text-gray-500 dark:text-slate-400 dark:hover:text-slate-200" />
      ) : (
        <MoonIcon className="h-6 w-6 text-gray-600 transition duration-300 hover:text-gray-500 dark:text-slate-400 dark:hover:text-slate-200" />
      )}
    </Toggle.Root>
  )
}

export default DarkModeToggle
