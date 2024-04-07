import type { ToggleGroupValueChangeDetails } from "@ark-ui/react"
import { type FieldMetadata, useInputControl } from "@conform-to/react"
import { Highlight } from "@tiptap/extension-highlight"
import { Underline } from "@tiptap/extension-underline"
import { BubbleMenu, type Editor, EditorProvider, useCurrentEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { BoldIcon, HighlighterIcon, ItalicIcon, UnderlineIcon } from "lucide-react"
import { diff } from "radash"
import { type Ref, useCallback, useImperativeHandle, useRef } from "react"
import { Box, Stack } from "styled-system/jsx"
import { textarea } from "styled-system/recipes"
import * as ToggleGroup from "~/components/ui/toggle-group"

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
        <BubbleMenu>
          <BubbleMenuContent />
        </BubbleMenu>
      </EditorProvider>
    </Box>
  )
}

const BubbleMenuContent = () => {
  const { editor } = useCurrentEditor()
  if (!editor) return null

  const toggleFormat = useCallback(
    (format: string) => {
      switch (format) {
        case "bold":
          editor.chain().focus().toggleBold().run()
          break
        case "italic":
          editor.chain().focus().toggleItalic().run()
          break
        case "underline":
          editor.chain().focus().toggleUnderline().run()
          break
        case "highlight":
          editor.chain().focus().toggleHighlight().run()
          break
        default:
          break
      }
    },
    [editor]
  )

  const currentFormattings = ["bold", "italic", "underline", "highlight"]
    .map((formatting) => (editor.isActive(formatting) ? formatting : null))
    .filter((value): value is string => value !== null)

  const handleToggleFormatting = useCallback(
    (details: ToggleGroupValueChangeDetails) => {
      const changedFormattings = diff(details.value, currentFormattings)
      for (const formatting of changedFormattings) {
        toggleFormat(formatting)
      }
    },
    [currentFormattings, toggleFormat]
  )

  return (
    <Stack direction="row" p="1" bg="bg.default" rounded="xl" borderWidth="1">
      <ToggleGroup.Root
        size="sm"
        variant="ghost"
        multiple
        value={currentFormattings}
        onValueChange={handleToggleFormatting}
      >
        <ToggleGroup.Item value="bold" aria-label="Toggle Bold">
          <BoldIcon />
        </ToggleGroup.Item>
        <ToggleGroup.Item value="italic" aria-label="Toggle Italic">
          <ItalicIcon />
        </ToggleGroup.Item>
        <ToggleGroup.Item value="underline" aria-label="Toggle Underline">
          <UnderlineIcon />
        </ToggleGroup.Item>
        <ToggleGroup.Item value="highlight" aria-label="Toggle Highlight">
          <HighlighterIcon />
        </ToggleGroup.Item>
      </ToggleGroup.Root>
    </Stack>
  )
}
