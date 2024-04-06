import { z } from "zod"
import { settingsAtom, store } from "~/libs/store"

export type AnkiConnectSettings = z.infer<typeof AnkiConnectSettings>
export const AnkiConnectSettings = z.object({
  hostname: z.string().url(),
  port: z.number().int().gte(0)
})

export const Settings = {
  get() {
    return store.get(settingsAtom)
  },
  async set(settings: AnkiConnectSettings) {
    store.set(settingsAtom, settings)
  }
}
