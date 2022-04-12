import { EyeIcon, PencilAltIcon } from "@heroicons/react/outline"
import * as Switch from "@radix-ui/react-switch"
import Tooltip from "../shared/Tooltip"

const EditIcon = () => {
  return (
    <Tooltip text="Edit Mode">
      <span className="inline-flex rounded-md p-1 hover:bg-gray-200">
        <PencilAltIcon className="h-6 w-6 text-gray-600" />
      </span>
    </Tooltip>
  )
}

const PreviewIcon = () => {
  return (
    <Tooltip text="Preview Mode">
      <span className="inline-flex rounded-md p-1 hover:bg-gray-200">
        <EyeIcon className="h-6 w-6 text-gray-600" />
      </span>
    </Tooltip>
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
