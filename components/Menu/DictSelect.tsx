import ChevronDownIcon from "@heroicons/react/solid/ChevronDownIcon"
import * as Select from "@radix-ui/react-select"
import { useAtom } from "jotai"
import { dictionaries, Dictionaries } from "../../lib/dictionary"
import { dictAtom } from "../../store"

const DictSelect = () => {
  const [dict, setDict] = useAtom(dictAtom)

  return (
    <Select.Root
      value={dict}
      onValueChange={(value: Dictionaries) => setDict(value)}
    >
      <Select.Trigger className="inline-flex items-center space-x-1 rounded-md py-1 px-2 font-display text-gray-600 outline-none hover:bg-gray-100">
        <Select.Value />
        <Select.Icon>
          <ChevronDownIcon className="h-5 w-5 pt-[1px]" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Content className="overflow-hidden rounded-md bg-white p-2 shadow-md">
        <Select.Viewport className="space-y-1">
          {dictionaries.map((dict) => (
            <Select.Item
              value={dict.id}
              key={dict.id}
              className="cursor-pointer select-none rounded-md pl-2 font-display text-gray-600 outline-none hover:bg-gray-100"
            >
              <Select.ItemText>{dict.name}</Select.ItemText>
            </Select.Item>
          ))}
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  )
}

export default DictSelect
