import * as SelectPrimitives from "@radix-ui/react-select"
import { ChevronDownIcon } from "@heroicons/react/solid"
import { ReactElement } from "react"

type SelectProps = {
  items: string[]
  value: string
  onValueChange: (value: string) => void
  icon: ReactElement
}

const Select = ({ items, value, onValueChange, icon }: SelectProps) => {
  return (
    <SelectPrimitives.Root value={value} onValueChange={onValueChange}>
      <SelectPrimitives.Trigger className="inline-flex w-1/2 flex-1 items-center justify-between space-x-1 rounded-md border border-gray-200 p-2 text-gray-600 shadow-sm outline-none hover:bg-gray-100/60 dark:border-none dark:text-slate-400 dark:shadow-none dark:ring-1 dark:ring-inset dark:ring-white/10 dark:hover:bg-slate-700">
        <span className="inline-flex items-center">
          {icon}
          <span className="h-6 w-36 overflow-hidden text-left">
            <SelectPrimitives.Value />
          </span>
        </span>
        <SelectPrimitives.Icon>
          <ChevronDownIcon className="h-5 w-5 pt-[1px]" />
        </SelectPrimitives.Icon>
      </SelectPrimitives.Trigger>
      <SelectPrimitives.Content className="overflow-hidden rounded-md bg-white p-2 shadow-md dark:bg-slate-800 dark:ring-1 dark:ring-inset dark:ring-white/10">
        <SelectPrimitives.Viewport className="space-y-1">
          {items.map((item) => (
            <SelectPrimitives.Item
              value={item}
              key={item}
              className="cursor-pointer select-none rounded-md p-2 text-gray-600 outline-none hover:bg-gray-100 dark:text-slate-400 dark:hover:bg-slate-700"
            >
              <SelectPrimitives.ItemText>{item}</SelectPrimitives.ItemText>
            </SelectPrimitives.Item>
          ))}
        </SelectPrimitives.Viewport>
      </SelectPrimitives.Content>
    </SelectPrimitives.Root>
  )
}

export default Select
