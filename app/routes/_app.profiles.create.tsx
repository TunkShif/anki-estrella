import { Portal } from "@ark-ui/react"
import { parseWithZod } from "@conform-to/zod"
import { type ClientActionFunctionArgs, Form, json, useLoaderData } from "@remix-run/react"
import { CheckIcon, ChevronsUpDownIcon, SaveIcon } from "lucide-react"
import { useMemo } from "react"
import { Box, Stack } from "styled-system/jsx"
import invariant from "tiny-invariant"
import { z } from "zod"
import { toast } from "~/components/toaster"
import { Button } from "~/components/ui/button"
import * as Card from "~/components/ui/card"
import { FormLabel } from "~/components/ui/form-label"
import { Input } from "~/components/ui/input"
import * as Select from "~/components/ui/select"
import { TreeView, type TreeViewProps } from "~/components/ui/tree-view"
import { AnkiConnect } from "~/libs/anki-connect"
import { db } from "~/libs/database"
import { Settings } from "~/libs/settings"

const schema = z.object({
  name: z.string().trim().min(1),
  deck: z.string().trim().min(1),
  model: z.string().trim().min(1),
  dictionaryId: z.number().gt(0)
})

export const clientAction = async ({ request }: ClientActionFunctionArgs) => {
  const formData = await request.formData()
  const submission = parseWithZod(formData, { schema })

  if (submission.status !== "success") {
    return json({ result: submission.reply() })
  }

  await db.profiles.put(submission.value)
  toast.success({ title: "Created", description: "Profile created successfully." })
  return json({ result: null })
}

export const clientLoader = async () => {
  const client = new AnkiConnect(Settings.get() ?? { hostname: "http://localhost", port: 8765 })

  const [decksResult, modelsResult, dictionaries] = await Promise.all([
    client.deckNames(),
    client.modelNames(),
    db.dictionaries.toArray()
  ])

  // TODO: error handling
  invariant(decksResult.kind === "Success")
  invariant(modelsResult.kind === "Success")

  return json({
    decks: decksResult.data ?? [],
    models: modelsResult.data ?? [],
    dictionaries
  })
}

export const useCreateProfileLoaderData = () => useLoaderData<typeof clientLoader>()

export default function CreateProfilePage() {
  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>Create Profile</Card.Title>
        <Card.Description>Create a new profile for your Anki deck.</Card.Description>
      </Card.Header>
      <Card.Body>
        <Form action="/profiles/create" method="post">
          <Stack gap="4">
            <Stack gap="1.5">
              <FormLabel>Name</FormLabel>
              <Input />
            </Stack>

            <Stack gap="1.5">
              <FormLabel>Deck</FormLabel>
              <DeckSelect />
            </Stack>

            <Stack gap="1.5">
              <FormLabel>Model</FormLabel>
              <ModelSelect />
            </Stack>

            <Stack gap="1.5">
              <FormLabel>Default Dictionary</FormLabel>
              <DictionarySelect />
            </Stack>
          </Stack>
        </Form>
      </Card.Body>
      <Card.Footer gap="2">
        <Button variant="outline">Reset</Button>
        <Button>
          <SaveIcon /> Save
        </Button>
      </Card.Footer>
    </Card.Root>
  )
}

type TreeNode = {
  id: string
  name: string
  children?: TreeNode[]
}

const buildTreeNodes = (paths: string[]) => {
  const root: TreeNode = {
    id: "",
    name: "",
    children: []
  }
  const cache = new Map<string, TreeNode>().set("", root)

  for (const path of paths) {
    let parent = root

    for (const part of path.split("::")) {
      const id = parent.id + (parent.id ? "::" : "") + part
      let node = cache.get(id)
      if (!node) {
        node = { id, name: part }
        cache.set(id, node)
        if (!parent.children) parent.children = []
        parent.children?.push(node)
      }
      parent = node
    }
  }

  return root.children ?? []
}

const DeckSelect = (props: Omit<TreeViewProps, "data">) => {
  const { decks } = useCreateProfileLoaderData()
  const data = useMemo(
    () => ({
      label: "Decks",
      children: buildTreeNodes(decks)
    }),
    [decks]
  )
  return (
    <Box p="2" borderWidth="1" rounded="lg">
      <TreeView {...props} data={data} onSelectionChange={(details) => console.log(details)} />
    </Box>
  )
}

const ModelSelect = (props: Omit<Select.RootProps, "items" | "children">) => {
  const { models } = useCreateProfileLoaderData()
  const items = useMemo(() => {
    return models.map((model) => ({
      label: model,
      value: model
    }))
  }, [models])

  return (
    <Select.Root {...props} items={items} positioning={{ sameWidth: true }}>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText />
          <ChevronsUpDownIcon />
        </Select.Trigger>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {items.map((item) => (
              <Select.Item key={item.value} item={item}>
                <Select.ItemText>{item.label}</Select.ItemText>
                <Select.ItemIndicator>
                  <CheckIcon />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

const DictionarySelect = (props: Omit<Select.RootProps, "items" | "children">) => {
  const { dictionaries } = useCreateProfileLoaderData()
  const items = useMemo(() => {
    return dictionaries.map((model) => ({
      label: model.name,
      value: model.id
    }))
  }, [dictionaries])

  return (
    <Select.Root {...props} items={items} positioning={{ sameWidth: true }}>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText />
          <ChevronsUpDownIcon />
        </Select.Trigger>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {items.map((item) => (
              <Select.Item key={item.value} item={item}>
                <Select.ItemText>{item.label}</Select.ItemText>
                <Select.ItemIndicator>
                  <CheckIcon />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}
