import { Portal } from "@ark-ui/react"
import {
  type FieldMetadata,
  getFormProps,
  getInputProps,
  getSelectProps,
  useForm,
  useInputControl
} from "@conform-to/react"
import { getZodConstraint, parseWithZod } from "@conform-to/zod"
import {
  type ClientActionFunctionArgs,
  Form,
  json,
  redirect,
  useActionData,
  useLoaderData
} from "@remix-run/react"
import { CheckIcon, ChevronsUpDownIcon, SaveIcon } from "lucide-react"
import { useMemo } from "react"
import { Box, Stack } from "styled-system/jsx"
import invariant from "tiny-invariant"
import { z } from "zod"
import { FormErrors } from "~/components/form-errors"
import { toast } from "~/components/toaster"
import { Button } from "~/components/ui/button"
import * as Card from "~/components/ui/card"
import { FormLabel } from "~/components/ui/form-label"
import { Input } from "~/components/ui/input"
import * as Select from "~/components/ui/select"
import { TreeView, type TreeViewProps } from "~/components/ui/tree-view"
import { getClient } from "~/libs/anki-connect"
import { db } from "~/libs/database"

const schema = z.object({
  name: z.string().trim().min(1),
  deck: z.string().trim().min(1),
  model: z.string().trim().min(1),
  dictionaryId: z.number().gt(0)
})

const client = getClient()

const useCreateProfileLoaderData = () => useLoaderData<typeof clientLoader>()

export const clientAction = async ({ request }: ClientActionFunctionArgs) => {
  const formData = await request.formData()
  const submission = parseWithZod(formData, { schema })

  if (submission.status !== "success") {
    return json({ result: submission.reply() })
  }

  await db.profiles.put(submission.value)
  toast.success({ title: "Created", description: "Profile created successfully." })
  return redirect("/profiles")
}

export const clientLoader = async () => {
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

export default function CreateProfilePage() {
  const lastResult = useActionData<typeof clientAction>()

  const [form, fields] = useForm({
    lastResult: lastResult?.result,
    constraint: getZodConstraint(schema),
    shouldValidate: "onBlur",
    onValidate: ({ formData }) => parseWithZod(formData, { schema })
  })

  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>Create Profile</Card.Title>
        <Card.Description>Create a new profile for your Anki deck.</Card.Description>
      </Card.Header>

      <Card.Body>
        <Form action="/profiles/create" method="post" {...getFormProps(form)}>
          <Stack gap="4">
            <Stack gap="1.5">
              <FormLabel htmlFor={form.id}>Name</FormLabel>
              <Input {...getInputProps(fields.name, { type: "text" })} />
              <FormErrors errors={fields.name.errors} />
            </Stack>

            <Stack gap="1.5">
              <FormLabel htmlFor={form.id}>Deck</FormLabel>
              <DeckSelect meta={fields.deck} />
              <FormErrors errors={fields.deck.errors} />
            </Stack>

            <Stack gap="1.5">
              <FormLabel>Model</FormLabel>
              <ModelSelect
                {...getSelectProps(fields.model)}
                meta={fields.model}
                defaultValue={[]}
              />
              <FormErrors errors={fields.model.errors} />
            </Stack>

            <Stack gap="1.5">
              <FormLabel>Default Dictionary</FormLabel>
              <DictionarySelect
                {...getSelectProps(fields.dictionaryId)}
                meta={fields.dictionaryId}
                defaultValue={[]}
              />
              <FormErrors errors={fields.dictionaryId.errors} />
            </Stack>
          </Stack>
        </Form>
      </Card.Body>

      <Card.Footer gap="2">
        <Button variant="outline" onClick={() => form.reset()}>
          Reset
        </Button>
        <Button type="submit" form={form.id}>
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

const DeckSelect = (props: Omit<TreeViewProps, "data"> & { meta: FieldMetadata<string> }) => {
  const control = useInputControl(props.meta)
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
      <TreeView
        {...props}
        data={data}
        onSelectionChange={(details) => {
          control.change(details.focusedId ?? undefined)
          control.blur()
        }}
      />
    </Box>
  )
}

const ModelSelect = (
  props: Omit<Select.RootProps, "items" | "children"> & { meta: FieldMetadata<string> }
) => {
  const control = useInputControl(props.meta)
  const { models } = useCreateProfileLoaderData()
  const items = useMemo(() => {
    return models.map((model) => ({
      label: model,
      value: model
    }))
  }, [models])

  return (
    <Select.Root
      {...props}
      items={items}
      positioning={{ sameWidth: true }}
      multiple={false}
      onValueChange={() => control.blur()}
    >
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

const DictionarySelect = (
  props: Omit<Select.RootProps, "items" | "children"> & { meta: FieldMetadata<number> }
) => {
  const control = useInputControl(props.meta)
  const { dictionaries } = useCreateProfileLoaderData()
  const items = useMemo(() => {
    return dictionaries.map((dictionary) => ({
      label: dictionary.name,
      value: dictionary.id
    }))
  }, [dictionaries])

  return (
    <Select.Root
      {...props}
      items={items}
      positioning={{ sameWidth: true }}
      onValueChange={() => control.blur()}
    >
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
