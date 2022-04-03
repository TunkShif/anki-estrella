export type AnkiResponse<T> = {
  result: T
  error: string | null
}

export type ModelTemplate = Record<"Front" | "Back", string>
export type ModelStyling = Record<"css", string>

export type Model = {
  fields: string[]
  template: ModelTemplate
  styling: ModelStyling
}

export type Note = {
  deckName: string
  modelName: string
  fields: Record<string, string>
  options?: {
    allowDuplicate?: boolean
    duplicateScope?: "deck" | "all"
  }
  tags?: string[]
}

export type Example = {
  example: string
  exampleTranslation?: string
}

export type Definition = {
  pos: string
  sense: string
  senseTranslation?: string
  examples: Example[]
}

export type Word = {
  word: string
  phonetics?: string
  audioUrl: string
  definitions: Definition[]
}
