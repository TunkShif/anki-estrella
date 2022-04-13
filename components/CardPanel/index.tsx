import AddButton from "./AddButton"
import ClearButton from "./ClearButton"
import DeckSelect from "./DeckSelect"
import FieldForm from "./FieldForm"
import ModelSelect from "./ModelSelect"
import ModeSwitch from "./ModeSwitch"

const CardPanel = () => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex h-10 items-center justify-between">
        <ModeSwitch />
        <div className="flex items-center justify-end space-x-2">
          <ClearButton />
          <AddButton />
        </div>
      </div>
      <div className="flex h-[640px] w-full flex-col space-y-4 overflow-y-auto rounded-md bg-white p-4 shadow-sm dark:bg-slate-800 dark:shadow-none dark:ring-1 dark:ring-inset dark:ring-white/10">
        <div className="flex items-center justify-between space-x-4">
          <DeckSelect />
          <ModelSelect />
        </div>
        <FieldForm />
      </div>
    </div>
  )
}

export default CardPanel
