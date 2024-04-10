import Dexie, { type Table } from "dexie"
import DEFAULT_DICTIONARIES from "~/data/dictionaries.json"

export interface Dictionary {
  id: number
  name: string
  url: string
  icon: string
  language: string
}

export interface Profile {
  id: number
  name: string
  deck: string
  model: string
  dictionaryId: number
}

export class Database extends Dexie {
  profiles!: Table<Profile, number, Omit<Profile, "id">>
  dictionaries!: Table<Dictionary, number, Omit<Dictionary, "id">>

  constructor() {
    super("anki")
    this.version(4).stores({
      dictionaries: "++id",
      profiles: "++id, dictionaryId"
    })
    this.on("populate", (tx) => {
      tx.table("dictionaries").bulkAdd(DEFAULT_DICTIONARIES)
    })
  }
}

export const db = new Database()
