import { useState } from "react"
import {
  CollectionIcon,
  DocumentIcon,
  PlusCircleIcon
} from "@heroicons/react/outline"
import { ChevronDownIcon } from "@heroicons/react/solid"
import * as Select from "@radix-ui/react-select"
import ModeSwitch from "./ModeSwitch"
import FieldInput from "./FieldInput"

const DeckSelect = () => {
  const decks = ["abcdefg", "bcdefg", "cdefghijklmnopqrstuvwxyz"]
  const [selected, setSelected] = useState("abcdefg")

  return (
    <Select.Root value={selected} onValueChange={(value) => setSelected(value)}>
      <Select.Trigger className="inline-flex w-1/2 flex-1 items-center justify-between space-x-1 rounded-md border border-gray-200 p-2 text-gray-600 shadow-sm outline-none hover:bg-gray-100 hover:bg-opacity-60">
        <span className="inline-flex items-center">
          <CollectionIcon className="mr-3 h-5 w-5 text-gray-600" />
          <span className="w-36 overflow-hidden text-left">
            <Select.Value />
          </span>
        </span>
        <Select.Icon>
          <ChevronDownIcon className="h-5 w-5 pt-[1px]" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Content className="overflow-hidden rounded-md bg-white p-2 shadow-md">
        <Select.Viewport className="space-y-1">
          {decks.map((dict) => (
            <Select.Item
              value={dict}
              key={dict}
              className="cursor-pointer select-none rounded-md p-2 text-gray-600 outline-none hover:bg-gray-100"
            >
              <Select.ItemText>{dict}</Select.ItemText>
            </Select.Item>
          ))}
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  )
}

const ModelSelect = () => {
  const models = ["abcdefg", "bcdefg", "cdefghijk"]
  const [selected, setSelected] = useState("abcdefg")

  return (
    <Select.Root value={selected} onValueChange={(value) => setSelected(value)}>
      <Select.Trigger className="inline-flex w-1/2 flex-1 items-center justify-between space-x-1 rounded-md border border-gray-200 p-2 text-gray-600 shadow-sm outline-none hover:bg-gray-100 hover:bg-opacity-60">
        <span className="inline-flex items-center">
          <DocumentIcon className="mr-3 h-5 w-5 text-gray-600" />
          <span className="w-36 overflow-hidden text-left">
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

const AddButton = () => {
  return (
    <button className="inline-flex items-center rounded-md bg-white px-3 py-1.5 text-gray-600 shadow-sm hover:bg-gray-50 disabled:bg-gray-50 disabled:text-gray-300">
      <PlusCircleIcon className="mr-2 h-6 w-6" />
      <span className="font-bold">ADD</span>
    </button>
  )
}

const CardPanel = () => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between h-10">
        <ModeSwitch />
        <AddButton />
      </div>
      <div className="flex h-[640px] w-full flex-col space-y-4 overflow-y-auto rounded-md bg-white p-4 shadow-sm">
        <div className="inset-x-0 top-0 flex items-center justify-between space-x-4">
          <DeckSelect />
          <ModelSelect />
        </div>
        <div className="space-y-2">
          <FieldInput />
          <FieldInput />
          <FieldInput />
          <FieldInput />
          <FieldInput />
          <FieldInput />
          <FieldInput />
          <FieldInput />
        </div>
      </div>
    </div>
  )
}

export default CardPanel
