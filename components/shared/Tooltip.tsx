import * as TooltipPrimitives from "@radix-ui/react-tooltip"
import { ReactNode } from "react"

type TooltipProps = {
  text: string
  children: ReactNode
}

const Tooltip = ({ text, children }: TooltipProps) => {
  return (
    <TooltipPrimitives.Root>
      <TooltipPrimitives.Trigger asChild>{children}</TooltipPrimitives.Trigger>
      <TooltipPrimitives.Content
        sideOffset={4}
        className="inline-flex items-center rounded-md bg-white px-4 py-2 shadow-md dark:bg-slate-800 dark:shadow-none dark:ring-1 dark:ring-inset dark:ring-white/10 dark:hover:bg-slate-700"
      >
        <TooltipPrimitives.Arrow className="fill-current text-sm text-white dark:text-slate-800" />
        <span className="block text-gray-600 dark:text-slate-400">{text}</span>
      </TooltipPrimitives.Content>
    </TooltipPrimitives.Root>
  )
}

export default Tooltip
