import { z } from "zod"

export type AnkiConnectSettings = z.infer<typeof AnkiConnectSettings>
export const AnkiConnectSettings = z.object({
  hostname: z.string().url(),
  port: z.number().int().gte(0)
})

export const Settings = {
  get() {
    const settings = JSON.parse(localStorage.getItem("anki-connect-settings") ?? "null")
    return AnkiConnectSettings.nullable().parse(settings)
  },
  async set(settings: AnkiConnectSettings) {
    localStorage.setItem("anki-connect-settings", JSON.stringify(settings))
  }
}
