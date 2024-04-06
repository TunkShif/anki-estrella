import Dexie, { type Table } from "dexie"
import { DEFAULT_DICTIONARIES } from "~/libs/dictionary"

export type Dictionary = {
  id: number
  name: string
  url: string
}

export type Profile = {
  id: number
  name: string
  deck: string
  model: string
  dictionaryId: number
}

type Input<T> = Omit<T, "id">

export class Database extends Dexie {
  dictionaries!: Table<Dictionary, number, Input<Dictionary>>
  profiles!: Table<Profile, number, Input<Profile>>

  constructor() {
    super("anki")
    this.version(2).stores({
      dictionaries: "++id",
      profiles: "++id, dictionaryId"
    })
    this.on("populate", (tx) => {
      tx.table("dictionaries").bulkAdd(DEFAULT_DICTIONARIES)
    })
  }
}

export const db = new Database()
