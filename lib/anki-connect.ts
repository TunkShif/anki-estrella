import { AnkiResponse, ModelStyling, ModelTemplate, Note } from "../types"

// TODO: configurable url

const VERSION = 6

const fetcher = <T>(action: string, params?: any) =>
  fetch("http://localhost:8765", {
    method: "POST",
    body: JSON.stringify({
      action,
      params,
      version: VERSION
    })
  }).then((res) => res.json() as Promise<AnkiResponse<T>>)

export const connect = () => fetcher<number>("version")

export const addNote = (note: Note) => fetcher<number>("addNote", { note })

export const getDecks = () => fetcher<string[]>("deckNames")

export const getModels = () => fetcher<string[]>("modelNames")

export const getModelFields = (modelName: string) =>
  fetcher<string[]>("modelFieldNames", { modelName })

export const getModelTemplates = (modelName: string) =>
  fetcher<Record<string, ModelTemplate>>("modelTemplates", { modelName })

export const getModelStyling = (modelName: string) =>
  fetcher<ModelStyling>("modelStyling", { modelName })
