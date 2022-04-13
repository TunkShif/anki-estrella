import { XCircleIcon } from "@heroicons/react/outline"
import { useAtom } from "jotai"
import _ from "lodash"
import { formAtom } from "../../store"
import Button from "../shared/Button"

const ClearButton = () => {
  const [, setForm] = useAtom(formAtom)

  return (
    <Button
      onClick={() => setForm((prev) => _.mapValues(prev, (_value) => ""))}
      label="Clear"
      icon={<XCircleIcon className="mr-2 h-6 w-6" />}
    />
  )
}

export default ClearButton
