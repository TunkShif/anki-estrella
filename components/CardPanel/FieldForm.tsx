import { useAtom } from "jotai"
import _ from "lodash"
import { useEffect } from "react"
import { AnkiConnect } from "../../lib"
import { formAtom, modelAtom } from "../../store"
import FieldInput from "./FieldInput"

const FieldForm = () => {
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

  return (
    <div className="space-y-2">
      {Object.entries(form).map(([name, value]) => (
        <FieldInput
          key={name}
          label={name}
          value={value}
          onValueChange={(value) =>
            setForm((prev) => ({ ...prev, [name]: value }))
          }
        />
      ))}
    </div>
  )
}

export default FieldForm
