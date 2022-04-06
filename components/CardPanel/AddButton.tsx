import { PlusCircleIcon } from "@heroicons/react/outline"
import { useAtom } from "jotai"
import { AnkiConnect } from "../../lib"
import { deckAtom, formAtom, modelAtom } from "../../store"

const AddButton = () => {
  const [deck, _setDeck] = useAtom(deckAtom)
  const [model, _setModel] = useAtom(modelAtom)
  const [form, _setForm] = useAtom(formAtom)

  const onSubmit = () => {
    AnkiConnect.addNote({
      deckName: deck,
      modelName: model,
      fields: form
    }).then(console.log)
  }

  return (
    <button
      onClick={onSubmit}
      className="inline-flex items-center rounded-md bg-white px-3 py-1.5 text-gray-600 shadow-sm hover:bg-gray-50 disabled:bg-gray-50 disabled:text-gray-300"
    >
      <PlusCircleIcon className="mr-2 h-6 w-6" />
      <span className="font-bold">ADD</span>
    </button>
  )
}

export default AddButton
