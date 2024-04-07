import type { KyInstance } from "ky"
import ky from "ky"
import { z } from "zod"
import { clientAtom, store } from "~/libs/store"

const ANKI_CONNECT_VERSION = 6

type NoParams = undefined

type AnkiConnectAction<Params, Data> = {
  params: Params
  response:
    | {
        result: Data
        error: null
      }
    | {
        result: null
        error: string
      }
}

type AnkiConnectActions = keyof AnkiConnectActionMap

type AnkiConnectActionMap = {
  requestPermission: AnkiConnectAction<
    NoParams,
    { permission: "granted" | "denied"; requireApiKey: boolean; version: number }
  >
  deckNames: AnkiConnectAction<NoParams, string[]>
  modelNames: AnkiConnectAction<NoParams, string[]>
  modelFieldNames: AnkiConnectAction<{ modelName: string }, string[]>
  addNote: AnkiConnectAction<{ note: AddNoteParams }, number>
}

type AnkiConnectResult<Data> =
  | { kind: "Success"; data: Data }
  | { kind: "APIError"; message: string }
  | { kind: "NetworkError"; message: string }

export type AddNoteParams = z.infer<typeof AddNoteParams>
export const AddNoteParams = z.object({
  deckName: z.string().trim().min(1),
  modelName: z.string().trim().min(1),
  fields: z.record(z.string().trim().min(1), z.string().optional())
})

type AnkiConnectOptions = {
  hostname: string
  port: number
}

export class AnkiConnect {
  #version: number
  #client: KyInstance

  constructor(options: AnkiConnectOptions) {
    const baseUrl = `${options.hostname}:${options.port}`

    this.#version = ANKI_CONNECT_VERSION
    this.#client = ky.extend({
      prefixUrl: baseUrl
    })
  }

  private async request<Action extends AnkiConnectActions>(
    action: Action,
    params?: AnkiConnectActionMap[Action]["params"]
  ): Promise<AnkiConnectResult<AnkiConnectActionMap[Action]["response"]["result"]>> {
    try {
      const response = await this.#client
        .post("", { json: { action, params, version: this.#version } })
        .json<AnkiConnectActionMap[Action]["response"]>()
      return response.error == null
        ? { kind: "Success", data: response.result }
        : { kind: "APIError", message: response.error }
    } catch (error) {
      return {
        kind: "NetworkError",
        message: error instanceof Error ? error.message : "Unknown error"
      }
    }
  }

  requestPermission() {
    return this.request("requestPermission")
  }

  deckNames() {
    return this.request("deckNames")
  }

  modelNames() {
    return this.request("modelNames")
  }

  modelFieldNames(modelName: string) {
    return this.request("modelFieldNames", { modelName })
  }

  addNote(params: AddNoteParams) {
    return this.request("addNote", { note: params })
  }
}

export const getClient = () => store.get(clientAtom)
