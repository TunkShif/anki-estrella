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
        className="inline-flex items-center rounded-md bg-white px-4 py-2 shadow-md"
      >
        <TooltipPrimitives.Arrow className="fill-current text-sm text-white" />
        <span className="block text-gray-600">{text}</span>
      </TooltipPrimitives.Content>
    </TooltipPrimitives.Root>
  )
}

export default Tooltip
