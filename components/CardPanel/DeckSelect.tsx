import { useEffect } from "react"
import { useAtom } from "jotai"
import * as Select from "@radix-ui/react-select"
import { CollectionIcon } from "@heroicons/react/outline"
import { ChevronDownIcon } from "@heroicons/react/solid"
import { AnkiConnect } from "../../lib"
import _ from "lodash"
import { deckAtom, decksAtom } from "../../store"

const DeckSelect = () => {
  const [decks, setDecks] = useAtom(decksAtom)
  const [deck, setDeck] = useAtom(deckAtom)

  useEffect(() => {
    AnkiConnect.getDecks().then((res) => {
      setDecks(res.result)
      if (_.isEmpty(deck)) {
        const deck = _.last(res.result) || ""
        setDeck(deck)
      }
    })
  }, [])

  return (
    <Select.Root value={deck} onValueChange={(value) => setDeck(value)}>
      <Select.Trigger className="inline-flex w-1/2 flex-1 items-center justify-between space-x-1 rounded-md border border-gray-200 p-2 text-gray-600 shadow-sm outline-none hover:bg-gray-100 hover:bg-opacity-60">
        <span className="inline-flex items-center">
          <CollectionIcon className="mr-3 h-5 w-5 text-gray-600" />
          <span className="h-6 w-36 overflow-hidden text-left">
            <Select.Value />
          </span>
        </span>
        <Select.Icon>
          <ChevronDownIcon className="h-5 w-5 pt-[1px]" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Content className="overflow-hidden rounded-md bg-white p-2 shadow-md">
        <Select.Viewport className="space-y-1">
          {decks.map((dict) => (
            <Select.Item
              value={dict}
              key={dict}
              className="cursor-pointer select-none rounded-md p-2 text-gray-600 outline-none hover:bg-gray-100"
            >
              <Select.ItemText>{dict}</Select.ItemText>
            </Select.Item>
          ))}
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  )
}

export default DeckSelect
