import { useAtom } from "jotai"
import { useEffect } from "react"
import { deckAtom, decksAtom, fetchDecksAtom } from "../store"

const useDecks = () => {
  const [decks] = useAtom(decksAtom)
  const [, fetchDecks] = useAtom(fetchDecksAtom)
  const [deck, setDeck] = useAtom(deckAtom)

  useEffect(() => {
    fetchDecks()
  }, [])

  return [deck, decks, setDeck] as const
}

export default useDecks
