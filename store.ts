import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import _ from "lodash"
import { AnkiConnect } from "./lib"
import { Dictionaries } from "./lib/dictionary"

export const connectedAtom = atom(false)
export const tryConnectAtom = atom(null, (_get, set, _update) => {
  AnkiConnect.connect()
    .then((_res) => set(connectedAtom, true))
    .catch((_err) => set(connectedAtom, false))
})

export const dictAtom = atomWithStorage<Dictionaries>("dictionary", "en")
export const queryAtom = atom("")
export const isQueryEmptyAtom = atom((get) => _.isEmpty(get(queryAtom)))

export const deckAtom = atomWithStorage("deck", "")
export const decksAtom = atom<string[]>([])
export const fetchDecksAtom = atom(null, (get, set, _update) => {
  AnkiConnect.getDecks().then((res) => {
    set(decksAtom, res.result)
    if (_.isEmpty(get(deckAtom))) {
      const deck = _.last(res.result) || ""
      set(deckAtom, deck)
    }
  })
})

export const modelAtom = atomWithStorage("model", "")
export const modelsAtom = atom<string[]>([])
export const fetchModelsAtom = atom(null, (get, set, _update) => {
  AnkiConnect.getModels().then((res) => {
    set(modelsAtom, res.result)
    if (_.isEmpty(get(modelAtom))) {
      const model = _.first(res.result) || ""
      set(modelAtom, model)
    }
  })
})

export const formAtom = atom<Record<string, string>>({})
