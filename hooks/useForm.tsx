import { useAtom } from "jotai"
import { useEffect } from "react"
import { formAtom, modelAtom } from "../store"
import { AnkiConnect } from "../lib"
import _ from "lodash"

const useForm = () => {
  const [model] = useAtom(modelAtom)
  const [form, setForm] = useAtom(formAtom)

  useEffect(() => {
    if (!_.isEmpty(model)) {
      AnkiConnect.getModelFields(model).then((res) =>
        setForm(
          _.chain(res.result)
            .map((key) => [key, ""])
            .fromPairs()
            .value()
        )
      )
    }
  }, [model])

  return [form, setForm] as const
}

export default useForm
