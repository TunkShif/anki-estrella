import { useAtom } from "jotai"
import { useEffect } from "react"
import { fetchModelsAtom, formAtom, modelAtom, modelsAtom } from "../store"

const useModels = () => {
  const [models] = useAtom(modelsAtom)
  const [model, setModel] = useAtom(modelAtom)
  const [, fetchModels] = useAtom(fetchModelsAtom)
  const [, setForm] = useAtom(formAtom)

  useEffect(() => {
    fetchModels()
  }, [])

  useEffect(() => {
    setForm({})
  }, [model])

  return [model, models, setModel] as const
}

export default useModels
