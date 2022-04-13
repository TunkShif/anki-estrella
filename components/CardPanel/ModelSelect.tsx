import { DocumentIcon } from "@heroicons/react/outline"
import _ from "lodash"
import useModels from "../../hooks/useModels"
import Select from "../shared/Select"

const ModelSelect = () => {
  const [model, models, setModel] = useModels()

  return (
    <Select
      items={models}
      value={model}
      onValueChange={setModel}
      icon={<DocumentIcon className="mr-3 h-5 w-5 text-gray-600 dark:text-slate-400" />}
    />
  )
}

export default ModelSelect
