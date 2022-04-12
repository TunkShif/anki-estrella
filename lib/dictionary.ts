import useSWR from "swr"
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

const queryEnWord = (word: string) =>
  fetcher(`https://dictlet-api.tunkshif.one/api/collins-en-cn/query/${word}`)

const queryEsWord = (word: string) =>
  fetcher(`https://dictlet-api.tunkshif.one/api/spanishdict/query/${word}`)

const createDictionary =
  (fetcher: (word: string) => Promise<Word>) => (query: string) =>
    useSWR([fetcher, query], (fetcher, query) => fetcher(query))

export const useEnDictionary = createDictionary(queryEnWord)
export const useEsDicrionary = createDictionary(queryEsWord)
