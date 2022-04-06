import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { Dictionaries } from "./lib/dictionary"

export const dictAtom = atomWithStorage<Dictionaries>("dictionary", "en")
export const queryAtom = atom("")

export const deckAtom = atomWithStorage("deck", "")
export const decksAtom = atom<string[]>([])

export const modelAtom = atomWithStorage("model", "")
export const modelsAtom = atom<string[]>([])

export const formAtom = atom<Record<string, string>>({})
