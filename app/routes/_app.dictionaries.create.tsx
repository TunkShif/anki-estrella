import { type ComboboxInputValueChangeDetails, Portal } from "@ark-ui/react"
import { type FieldMetadata, getFormProps, getInputProps, useForm } from "@conform-to/react"
import { getZodConstraint, parseWithZod } from "@conform-to/zod"
import {
  type ClientActionFunctionArgs,
  Form,
  json,
  redirect,
  useActionData,
  useLoaderData
} from "@remix-run/react"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"
import { SaveIcon } from "lucide-react"
import { useCallback, useState } from "react"
import { HStack, Stack } from "styled-system/jsx"
import { DictionaryIcon } from "~/components/dictionary/dictionary-icon"
import { FormErrors } from "~/components/form-errors"
import { toast } from "~/components/toaster"
import { Button } from "~/components/ui/button"
import * as Card from "~/components/ui/card"
import * as Combobox from "~/components/ui/combobox"
import { FormLabel } from "~/components/ui/form-label"
import { IconButton } from "~/components/ui/icon-button"
import { Input } from "~/components/ui/input"
import { CreateDictionaryParamsSchema, Dictionaries } from "~/libs/service"

const schema = CreateDictionaryParamsSchema

export const clientAction = async ({ request }: ClientActionFunctionArgs) => {
  const formData = await request.formData()
  const submission = parseWithZod(formData, { schema })
  if (submission.status !== "success") {
    return json({
      ok: false,
      result: submission.reply()
    })
  }

  await Dictionaries.create(submission.value)

  toast.success({
    title: "Dictionary added.",
    description: "Dictionary has been added successfully."
  })

  return redirect("/dictionaries")
}

export const clientLoader = async () => {
  const languages = await Dictionaries.languages()
  return json({
    languages
  })
}

export default function CreateDictionaryPage() {
  const { languages } = useLoaderData<typeof clientLoader>()
  const lastResult = useActionData<typeof clientAction>()

  const [form, fields] = useForm({
    lastResult: lastResult?.result,
    constraint: getZodConstraint(schema),
    shouldValidate: "onBlur",
    onValidate: ({ formData }) => parseWithZod(formData, { schema })
  })

  const icon =
    !fields.url.errors && fields.url.value ? Dictionaries.buildIconUrl(fields.url.value) : null

  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>Create Dictionary</Card.Title>
        <Card.Description>Add a new dictionary.</Card.Description>
      </Card.Header>

      <Card.Body>
        <Form method="post" {...getFormProps(form)}>
          <Stack gap="4">
            <Stack gap="1.5">
              <FormLabel htmlFor={fields.name.id}>Name</FormLabel>
              <HStack>
                <DictionaryIcon
                  src={icon}
                  w="10"
                  h="10"
                  flexShrink={0}
                  borderWidth="1"
                  borderColor="border.default"
                />
                <Input {...getInputProps(fields.name, { type: "text" })} />
              </HStack>
              <FormErrors errors={fields.name.errors} />
            </Stack>

            <Stack gap="1.5">
              <FormLabel htmlFor={fields.language.id}>Language</FormLabel>
              <LanguageInput meta={fields.language} languages={languages} />
              <FormErrors errors={fields.name.errors} />
            </Stack>

            <Stack gap="1.5">
              <FormLabel htmlFor={fields.url.id}>URL</FormLabel>
              <Input {...getInputProps(fields.url, { type: "url" })} />
              <FormErrors errors={fields.url.errors} />
            </Stack>
          </Stack>
        </Form>
      </Card.Body>

      <Card.Footer>
        <Button type="submit" form={form.id}>
          <SaveIcon />
          Save
        </Button>
      </Card.Footer>
    </Card.Root>
  )
}

export const LanguageInput = ({
  meta,
  languages,
  ...props
}: {
  meta: FieldMetadata<string>
  languages: string[]
} & Omit<Combobox.RootProps, "items" | "children">) => {
  const [items, setItems] = useState(languages)

  const handleChange = useCallback(
    (e: ComboboxInputValueChangeDetails) =>
      setItems(languages.filter((language) => language.startsWith(e.value.toLowerCase()))),
    [languages]
  )

  return (
    <Combobox.Root
      {...props}
      items={items}
      name={meta.name}
      allowCustomValue
      onInputValueChange={handleChange}
    >
      <Combobox.Control>
        <Combobox.Input asChild>
          <Input {...getInputProps(meta, { type: "text" })} />
        </Combobox.Input>
        <Combobox.Trigger asChild>
          <IconButton variant="link" aria-label="open" size="xs">
            <ChevronsUpDownIcon />
          </IconButton>
        </Combobox.Trigger>
      </Combobox.Control>

      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            {items.map((item) => (
              <Combobox.Item key={item} item={item}>
                <Combobox.ItemText>{item}</Combobox.ItemText>
                <Combobox.ItemIndicator>
                  <CheckIcon />
                </Combobox.ItemIndicator>
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}
