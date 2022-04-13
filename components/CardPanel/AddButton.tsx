import { PlusCircleIcon } from "@heroicons/react/outline"
import useSaveNote from "../../hooks/useSaveNote"

const AddButton = () => {
  const saveNote = useSaveNote()

  return (
    <button
      onClick={saveNote}
      className="inline-flex items-center rounded-md bg-white px-3 py-1.5 text-gray-600 shadow-sm hover:bg-gray-50 disabled:bg-gray-50 disabled:text-gray-300"
    >
      <PlusCircleIcon className="mr-2 h-6 w-6" />
      <span className="font-bold">ADD</span>
    </button>
  )
}

export default AddButton
