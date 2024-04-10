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
import { Box, Center, HStack } from "styled-system/jsx"
import { textarea } from "styled-system/recipes"
import invariant from "tiny-invariant"
import { Tooltip } from "~/components/tooltip"
import { IconButton } from "~/components/ui/icon-button"
import * as Menu from "~/components/ui/menu"
import * as ToggleGroup from "~/components/ui/toggle-group"
import type { Dictionary } from "~/libs/database"

const extensions = [StarterKit, Underline, Highlight]

export type FieldEditorAction = {
  reset: () => void
}

export type FieldEditorProps = {
  meta: FieldMetadata<string>
  dictionary: Dictionary
  dictionaries: Dictionary[]
  editorRef?: Ref<FieldEditorAction>
}

export const FieldEditor = ({
  editorRef: ref,
  meta,
  dictionary,
  dictionaries
}: FieldEditorProps) => {
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
          editorRef.current = editor as Editor
        }}
        onBlur={({ editor }) => {
          control.change(editor.getHTML())
          control.blur()
        }}
      >
        <BubbleMenu tippyOptions={{ zIndex: 1500, appendTo: () => document.body }}>
          <HStack gap="0" p="1" bg="bg.default" rounded="xl" borderWidth="1" divideX="1">
            <FormattingTools />
            <DictionaryTools dictionary={dictionary} dictionaries={dictionaries} />
          </HStack>
        </BubbleMenu>
      </EditorProvider>
    </Box>
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

const getSelectedText = (editor: Editor) =>
  editor.state.selection.empty
    ? null
    : editor.state.doc.textBetween(editor.state.selection.from, editor.state.selection.to)

const searchInDictionary = (dictionaryUrl: string, query: string) => {
  const url = template(dictionaryUrl, { query })
  window.open(url, "_blank", "width=600,height=800")
}

const DictionaryTools = ({
  dictionary,
  dictionaries
}: { dictionary: Dictionary; dictionaries: Dictionary[] }) => {
  const { editor } = useCurrentEditor()
  invariant(editor)

  const handleSearch = useCallback(() => {
    const selectedText = getSelectedText(editor)
    if (!selectedText) return
    searchInDictionary(dictionary.url, selectedText)
    editor.chain().focus().setHighlight().run()
  }, [dictionary.url, editor])

  return (
    <HStack pl="2">
      <Tooltip content={`Search word in ${dictionary.name}`} closeDelay={0}>
        <IconButton type="button" size="sm" variant="ghost" onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
      </Tooltip>

      <DictionaryMenu dictionaries={dictionaries} />
    </HStack>
  )
}

const DictionaryMenu = ({ dictionaries }: { dictionaries: Dictionary[] }) => {
  const { editor } = useCurrentEditor()
  invariant(editor)

  const handleSearch = useCallback(
    (dictionary: Dictionary) => {
      const selectedText = getSelectedText(editor)
      if (!selectedText) return
      searchInDictionary(dictionary.url, selectedText)
      editor.chain().focus().setHighlight().run()
    },
    [editor]
  )

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <IconButton type="button" size="sm" variant="ghost">
          <EllipsisIcon />
        </IconButton>
      </Menu.Trigger>

      <Menu.Positioner>
        <Menu.Content minW="xs" borderWidth="1">
          <Menu.ItemGroup id="dictionary-menu">
            <Menu.ItemGroupLabel htmlFor="dictionary-menu">All Dictionaries</Menu.ItemGroupLabel>
            <Menu.Separator />

            {dictionaries.map((dictionary) => (
              <Menu.Item
                key={dictionary.id}
                id={`dictionary-${dictionary.id}`}
                onClick={() => handleSearch(dictionary)}
              >
                <HStack>
                  <Center
                    w="5"
                    h="5"
                    rounded="md"
                    borderWidth="1"
                    borderColor="border.default"
                    overflow="hidden"
                  >
                    <img src={dictionary.icon} alt={`icon for ${dictionary.name}`} />
                  </Center>
                  {dictionary.name}
                </HStack>
              </Menu.Item>
            ))}
          </Menu.ItemGroup>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  )
}
