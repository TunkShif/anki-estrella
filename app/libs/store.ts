import { atom, getDefaultStore } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { AnkiConnect } from "~/libs/anki-connect"
import type { AnkiConnectSettings } from "~/libs/settings"

export const store = getDefaultStore()
export const settingsAtom = atomWithStorage<AnkiConnectSettings>("anki-connect-settings", {
  hostname: "http://localhost",
  port: 8765
})
export const clientAtom = atom<AnkiConnect>((get) => new AnkiConnect(get(settingsAtom)))
