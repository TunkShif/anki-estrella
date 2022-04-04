import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"

export const deckAtom = atomWithStorage("deck", "")
export const decksAtom = atom<string[]>([])

export const modelAtom = atomWithStorage("model", "")
export const modelsAtom = atom<string[]>([])

export const formAtom = atom<Record<string, string>>({})
