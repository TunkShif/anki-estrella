import type { ToggleGroupValueChangeDetails } from "@ark-ui/react"
import { type FieldMetadata, useInputControl } from "@conform-to/react"
import { Highlight } from "@tiptap/extension-highlight"
import { Underline } from "@tiptap/extension-underline"
import { BubbleMenu, type Editor, EditorProvider, useCurrentEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import {
  BoldIcon,
  EllipsisIcon,
  HighlighterIcon,
  ItalicIcon,
  SearchIcon,
  UnderlineIcon
} from "lucide-react"
import { capitalize, diff, template } from "radash"
import { type Ref, useCallback, useImperativeHandle, useRef } from "react"
import { Box, HStack } from "styled-system/jsx"
import { textarea } from "styled-system/recipes"
import invariant from "tiny-invariant"
import { Tooltip } from "~/components/tooltip"
import { IconButton } from "~/components/ui/icon-button"
import * as ToggleGroup from "~/components/ui/toggle-group"
import { useWorkspaceLoaderData } from "~/libs/loaders"

const extensions = [StarterKit, Underline, Highlight]

export type FieldEditorAction = {
  reset: () => void
}

export type FieldEditorProps = {
  meta: FieldMetadata<string>
  editorRef?: Ref<FieldEditorAction>
}

export const FieldEditor = ({ editorRef: ref, meta }: FieldEditorProps) => {
  const editorRef = useRef<Editor | null>(null)
  const control = useInputControl(meta)

  useImperativeHandle(ref, () => ({
    reset: () => editorRef.current?.commands.clearContent()
  }))

  return (
    <Box>
      <EditorProvider
        extensions={extensions}
        editorProps={{ attributes: { class: textarea() } }}
        onCreate={({ editor }) => {
          //@ts-ignore
          editorRef.current = editor
        }}
        onBlur={({ editor }) => {
          control.change(editor.getHTML())
          control.blur()
        }}
      >
        <BubbleMenu tippyOptions={{ zIndex: 1500 }}>
          <BubbleMenuContent />
        </BubbleMenu>
      </EditorProvider>
    </Box>
  )
}

const BubbleMenuContent = () => {
  return (
    <HStack gap="0" p="1" bg="bg.default" rounded="xl" borderWidth="1" divideX="1">
      <FormattingTools />
      <DictionaryTools />
    </HStack>
  )
}

type Formatting = "bold" | "italic" | "underline" | "highlight"
type FormattingAction = `set${Capitalize<Formatting>}` | `unset${Capitalize<Formatting>}`

const formattings: Formatting[] = ["bold", "italic", "underline", "highlight"]

const toggleFormat = (editor: Editor, added: Formatting[], removed: Formatting[]) => {
  if (added.length === 0 && removed.length === 0) return
  return added
    .map((formatting) => `set${capitalize(formatting)}` as FormattingAction)
    .concat(removed.map((formatting) => `unset${capitalize(formatting)}` as FormattingAction))
    .reduce((acc, action) => acc[action](), editor.chain())
    .run()
}

const FormattingTools = () => {
  const { editor } = useCurrentEditor()
  invariant(editor)

  const currentFormattings = formattings
    .map((formatting) => (editor.isActive(formatting) ? formatting : null))
    .filter((value): value is Formatting => value !== null)

  const handleToggleFormatting = useCallback(
    (details: ToggleGroupValueChangeDetails) => {
      const current = currentFormattings
      const changed = details.value as Formatting[]

      const common = current.filter((formatting) => changed.includes(formatting))
      const added = diff(changed, common)
      const removed = diff(current, common)

      toggleFormat(editor, added, removed)
    },
    [editor, currentFormattings]
  )

  return (
    <ToggleGroup.Root
      size="sm"
      variant="ghost"
      pr="2"
      multiple
      value={currentFormattings}
      onValueChange={handleToggleFormatting}
    >
      <Tooltip content="Bold" closeDelay={0}>
        <ToggleGroup.Item value="bold" aria-label="Toggle Bold">
          <BoldIcon />
        </ToggleGroup.Item>
      </Tooltip>

      <Tooltip content="Italic" closeDelay={0}>
        <ToggleGroup.Item value="italic" aria-label="Toggle Italic">
          <ItalicIcon />
        </ToggleGroup.Item>
      </Tooltip>

      <Tooltip content="Underline" closeDelay={0}>
        <ToggleGroup.Item value="underline" aria-label="Toggle Underline">
          <UnderlineIcon />
        </ToggleGroup.Item>
      </Tooltip>

      <Tooltip content="Highlight" closeDelay={0}>
        <ToggleGroup.Item value="highlight" aria-label="Toggle Highlight">
          <HighlighterIcon />
        </ToggleGroup.Item>
      </Tooltip>
    </ToggleGroup.Root>
  )
}

const DictionaryTools = () => {
  const { dictionary } = useWorkspaceLoaderData()
  const { editor } = useCurrentEditor()
  invariant(editor)

  const isEmptySelection = editor.state.selection.empty
  const selectedText = editor.state.doc.textBetween(
    editor.state.selection.from,
    editor.state.selection.to
  )

  const openDictionary = useCallback(() => {
    if (isEmptySelection) return
    const url = template(dictionary.url, { query: selectedText })
    window.open(url, "_blank", "width=600,height=800")
    editor.chain().focus().setHighlight().run()
  }, [isEmptySelection, selectedText, dictionary.url, editor])

  return (
    <HStack pl="2">
      <Tooltip content={`Search word in ${dictionary.name}`} closeDelay={0}>
        <IconButton type="button" size="sm" variant="ghost" onClick={openDictionary}>
          <SearchIcon />
        </IconButton>
      </Tooltip>

      <IconButton type="button" size="sm" variant="ghost">
        <EllipsisIcon />
      </IconButton>
    </HStack>
  )
}
