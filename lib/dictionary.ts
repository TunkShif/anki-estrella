import { Word } from "../types"

export const dictionaries = [
  { id: "en", name: "English" },
  { id: "es", name: "Spanish" }
] as const

export type Dictionaries = typeof dictionaries[number]["id"]

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.data) {
        return data.data as Word
      }
      throw new Error("word not found")
    })

export const queryEnglishWord = (word: string) =>
  fetcher(`https://dictlet-api.tunkshif.one/api/collins-en-cn/query/${word}`)

export const querySpanishWord = (word: string) =>
  fetcher(`https://dictlet-api.tunkshif.one/api/spanishdict/query/${word}`)
