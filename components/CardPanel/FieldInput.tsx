import { PencilIcon, ClipboardIcon, TrashIcon } from "@heroicons/react/outline"
import * as Toggle from "@radix-ui/react-toggle"
import { useState } from "react"
import { useDrop } from "react-dnd"
import { default as TextArea } from "react-textarea-autosize"
import Tooltip from "../shared/Tooltip"

type EditToggleProps = {
  toggled: boolean
  onToggle: (value: boolean) => void
}

type ClipboardButtonProps = {
  onClick: (value: string) => void
}

type ClearButtonProps = {
  onClick: (value: string) => void
}

type DropAreaProps = {
  value: string
  onDrop: (value: string) => void
}

type FieldInputProps = {
  label: string
  value: string
  onValueChange: (value: string) => void
}

const EditToggle = ({ toggled, onToggle }: EditToggleProps) => {
  return (
    <Tooltip text="Edit">
      <Toggle.Root
        pressed={toggled}
        onPressedChange={onToggle}
        className="inline-flex rounded-md p-2 hover:bg-gray-200 radix-state-on:bg-gray-200"
      >
        <PencilIcon className="h-5 w-5" />
      </Toggle.Root>
    </Tooltip>
  )
}

const ClipboardButton = ({ onClick }: ClipboardButtonProps) => {
  const paste = () => {
    navigator.clipboard.readText().then((text) => onClick(text))
  }

  return (
    <Tooltip text="Paste">
      <button
        onClick={paste}
        className="invisible inline-flex rounded-md p-2 opacity-0 transition duration-300 hover:bg-gray-200 group-hover:visible group-hover:opacity-100 radix-state-on:bg-gray-200"
      >
        <ClipboardIcon className="h-5 w-5" />
      </button>
    </Tooltip>
  )
}

const ClearButton = ({ onClick }: ClearButtonProps) => {
  return (
    <Tooltip text="Clear">
      <button
        onClick={() => onClick("")}
        className="invisible inline-flex rounded-md p-2 opacity-0 transition duration-300 hover:bg-gray-200 group-hover:visible group-hover:opacity-100 radix-state-on:bg-gray-200"
      >
        <TrashIcon className="h-5 w-5" />
      </button>
    </Tooltip>
  )
}

const DropArea = ({ value, onDrop }: DropAreaProps) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "draggable",
    drop: (item: { text: string }, _monitor) => onDrop(item.text),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }))

  let background = "bg-gray-100"
  if (isOver && canDrop) {
    background = "bg-gray-100"
  } else if (canDrop) {
    background = "bg-gray-50"
  }

  return (
    <div
      ref={drop}
      className={`min-h-[38px] w-full whitespace-pre-wrap rounded-md border border-gray-200 py-2 px-2.5 text-gray-600 shadow-sm ${background}`}
    >
      {value}
    </div>
  )
}

const FieldInput = ({ label, value, onValueChange }: FieldInputProps) => {
  const [editMode, setEditMode] = useState(false)

  return (
    <div className="block space-y-2 rounded-md">
      <div className="group flex items-baseline justify-between font-bold text-gray-600">
        <span>{label}</span>
        <div className="flex items-center justify-end space-x-1">
          <ClearButton onClick={onValueChange} />
          <ClipboardButton onClick={onValueChange} />
          <EditToggle
            toggled={editMode}
            onToggle={(value) => setEditMode(value)}
          />
        </div>
      </div>
      {editMode ? (
        <TextArea
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          maxRows={4}
          className="min-h-[38px] w-full rounded-md border border-gray-200 text-gray-600 shadow-sm focus:border-gray-400 focus:ring-0"
        />
      ) : (
        <DropArea value={value} onDrop={onValueChange} />
      )}
    </div>
  )
}

export default FieldInput
