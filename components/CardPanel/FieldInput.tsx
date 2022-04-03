import { PencilIcon } from "@heroicons/react/outline"
import * as Toggle from "@radix-ui/react-toggle"

const EditToggle = () => {
  return (
    <Toggle.Root className="inline-flex rounded-md p-2 hover:bg-gray-200 radix-state-on:bg-gray-200">
      <PencilIcon className="h-5 w-5" />
    </Toggle.Root>
  )
}

const FieldInput = () => {
  return (
    <div className="block space-y-2 rounded-md">
      <div className="flex items-baseline justify-between font-bold text-gray-600">
        <span className="">FIELD</span>
        <EditToggle />
      </div>
      <input
        type="text"
        className="w-full rounded-md border border-gray-200 text-gray-600 shadow-sm focus:border-gray-400 focus:ring-0"
      />
    </div>
  )
}

export default FieldInput
