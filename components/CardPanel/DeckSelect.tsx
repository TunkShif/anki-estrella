import { CollectionIcon } from "@heroicons/react/outline"
import useDecks from "../../hooks/useDecks"
import Select from "../shared/Select"

const DeckSelect = () => {
  const [deck, decks, setDeck] = useDecks()

  return (
    <Select
      items={decks}
      value={deck}
      onValueChange={setDeck}
      icon={<CollectionIcon className="mr-3 h-5 w-5 text-gray-600 dark:text-slate-400" />}
    />
  )
}

export default DeckSelect
