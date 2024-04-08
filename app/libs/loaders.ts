import { useLoaderData } from "@remix-run/react"
import type { clientLoader as dictionariesLoader } from "~/routes/_app.dictionaries"
import type { clientLoader as workspaceLoader } from "~/routes/_app.workspace"
import type { clientLoader as settingsLoader } from "~/routes/settings"

export const useWorkspaceLoaderData = () => useLoaderData<typeof workspaceLoader>()
export const useDictionariesLoaderData = () => useLoaderData<typeof dictionariesLoader>()
export const useSettingsLoaderData = () => useLoaderData<typeof settingsLoader>()
