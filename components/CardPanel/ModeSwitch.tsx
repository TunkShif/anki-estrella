import { EyeIcon, PencilAltIcon } from "@heroicons/react/outline"
import * as Switch from "@radix-ui/react-switch"
import * as Tooltip from "@radix-ui/react-tooltip"

const EditIcon = () => {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <span className="inline-flex rounded-md p-1 hover:bg-gray-200">
          <PencilAltIcon className="h-6 w-6 text-gray-600" />
        </span>
      </Tooltip.Trigger>
      <Tooltip.Content
        sideOffset={4}
        className="inline-flex items-center rounded-md bg-white px-4 py-2 shadow-md"
      >
        <Tooltip.Arrow className="fill-current text-sm text-white" />
        <span className="block text-gray-600">Edit Mode</span>
      </Tooltip.Content>
    </Tooltip.Root>
  )
}

const PreviewIcon = () => {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <span className="inline-flex rounded-md p-1 hover:bg-gray-200">
          <EyeIcon className="h-6 w-6 text-gray-600" />
        </span>
      </Tooltip.Trigger>
      <Tooltip.Content
        sideOffset={4}
        className="inline-flex items-center rounded-md bg-white px-4 py-2 shadow-md"
      >
        <Tooltip.Arrow className="fill-current text-sm text-white" />
        <span className="block text-gray-600">Preview Mode</span>
      </Tooltip.Content>
    </Tooltip.Root>
  )
}

const ModeSwitch = () => {
  return (
    <div className="flex items-center space-x-2">
      <EditIcon />
      <Switch.Root className="group relative inline-flex h-[24px] w-[44px] items-center rounded-full border-2 border-gray-200 radix-state-checked:bg-anki-blue radix-state-unchecked:bg-gray-200">
        <Switch.Thumb className="inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg duration-300 ease-in-out group-radix-state-checked:translate-x-5 group-radix-state-unchecked:translate-x-0" />
      </Switch.Root>
      <PreviewIcon />
    </div>
  )
}

export default ModeSwitch
