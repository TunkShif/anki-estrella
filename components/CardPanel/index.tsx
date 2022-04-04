import AddButton from "./AddButton"
import DeckSelect from "./DeckSelect"
import FieldForm from "./FieldForm"
import ModelSelect from "./ModelSelect"
import ModeSwitch from "./ModeSwitch"

const CardPanel = () => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex h-10 items-center justify-between">
        <ModeSwitch />
        <AddButton />
      </div>
      <div className="flex h-[640px] w-full flex-col space-y-4 overflow-y-auto rounded-md bg-white p-4 shadow-sm">
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
