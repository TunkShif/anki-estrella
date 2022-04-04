import { DocumentIcon } from "@heroicons/react/outline"
import { ChevronDownIcon } from "@heroicons/react/solid"
import * as Select from "@radix-ui/react-select"
import { useAtom } from "jotai"
import _ from "lodash"
import { useEffect } from "react"
import { AnkiConnect } from "../../lib"
import { formAtom, modelAtom, modelsAtom } from "../../store"

const ModelSelect = () => {
  const [models, setModels] = useAtom(modelsAtom)
  const [model, setModel] = useAtom(modelAtom)
  const [_form, setForm] = useAtom(formAtom)

  useEffect(() => {
    AnkiConnect.getModels().then((res) => {
      setModels(res.result)
      if (_.isEmpty(model)) {
        const model = _.first(res.result) || ""
        setModel(model)
      }
    })
  }, [])

  useEffect(() => {
    setForm({})
  }, [model])

  return (
    <Select.Root value={model} onValueChange={(value) => setModel(value)}>
      <Select.Trigger className="inline-flex w-1/2 flex-1 items-center justify-between space-x-1 rounded-md border border-gray-200 p-2 text-gray-600 shadow-sm outline-none hover:bg-gray-100 hover:bg-opacity-60">
        <span className="inline-flex items-center">
          <DocumentIcon className="mr-3 h-5 w-5 text-gray-600" />
          <span className="h-6 w-36 overflow-hidden text-left">
            <Select.Value />
          </span>
        </span>
        <Select.Icon>
          <ChevronDownIcon className="h-5 w-5 pt-[1px]" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Content className="overflow-hidden rounded-md bg-white p-2 shadow-md">
        <Select.Viewport className="space-y-1">
          {models.map((model) => (
            <Select.Item
              value={model}
              key={model}
              className="cursor-pointer select-none rounded-md p-2 text-gray-600 outline-none hover:bg-gray-100"
            >
              <Select.ItemText>{model}</Select.ItemText>
            </Select.Item>
          ))}
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  )
}

export default ModelSelect
