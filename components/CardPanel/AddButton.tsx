import { PlusCircleIcon } from "@heroicons/react/outline"
import useSaveNote from "../../hooks/useSaveNote"
import Button from "../shared/Button"

const AddButton = () => {
  const saveNote = useSaveNote()

  return (
    <Button
      onClick={saveNote}
      label="Add"
      icon={<PlusCircleIcon className="mr-2 h-6 w-6" />}
    />
  )
}

export default AddButton
