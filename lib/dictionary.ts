import { Word } from "../types"

export const dictionaries = [
  { id: "en", name: "English" },
  { id: "es", name: "Spanish" }
] as const

export type Dictionaries = typeof dictionaries[number]["id"]

const fetcher = <T>(url: string) =>
  fetch(url).then((res) => res.json() as Promise<T>)

type DictletResponse = {
  data: Word
}

export const queryEnglishWord = (word: string) =>
  fetcher<DictletResponse>(
    `https://dictlet-api.tunkshif.one/api/collins-en-cn/query/${word}`
  )

export const querySpanishWord = (word: string) =>
  fetcher<DictletResponse>(
    `https://dictlet-api.tunkshif.one/api/spanishdict/query/${word}`
  )
