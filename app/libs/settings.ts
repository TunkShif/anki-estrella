import localforage from "localforage"
import { z } from "zod"

export type AnkiConnectSettings = z.infer<typeof AnkiConnectSettings>
export const AnkiConnectSettings = z.object({
  hostname: z.string().url(),
  port: z.number().int().gte(0)
})

export const Settings = {
  async get() {
    const settings = await localforage.getItem("settings")
    return AnkiConnectSettings.nullable().parse(settings)
  },
  async set(settings: AnkiConnectSettings) {
    localforage.setItem("settings", settings)
  }
}
