import { queryOptions } from "@tanstack/react-query"
import { unique } from "radash"
import invariant from "tiny-invariant"
import { z } from "zod"
import { db } from "~/libs/database"
import { queryClient } from "~/libs/query"

export type CreateDictionaryParamsSchema = z.infer<typeof CreateDictionaryParamsSchema>
export const CreateDictionaryParamsSchema = z.object({
  name: z.string().trim().min(1),
  language: z.string().trim().min(1),
  url: z.string().trim().url()
})

export const Dictionaries = {
  query: {
    all: queryOptions({
      queryKey: ["dictionaries"],
      queryFn: () => db.dictionaries.toArray()
    })
  },
  all() {
    return queryClient.fetchQuery(Dictionaries.query.all)
  },
  create(params: CreateDictionaryParamsSchema) {
    const icon = Dictionaries.buildIconUrl(params.url)
    invariant(icon)
    return db.dictionaries.add({ ...params, icon })
  },
  async languages() {
    const dictionaries = await queryClient.ensureQueryData(Dictionaries.query.all)
    return unique(dictionaries.map((dictionary) => dictionary.language))
  },
  buildIconUrl(url: string) {
    try {
      const host = new URL(url).host
      return `https://www.google.com/s2/favicons?domain=${host}&sz=32`
    } catch {
      return null
    }
  }
}

export const Profiles = {
  query: {
    all: queryOptions({
      queryKey: ["profiles"],
      queryFn: () => db.profiles.toArray()
    })
  },
  all() {
    return queryClient.fetchQuery(Profiles.query.all)
  }
}
