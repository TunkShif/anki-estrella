import { getFormProps, getInputProps, useForm } from "@conform-to/react"
import { getZodConstraint, parseWithZod } from "@conform-to/zod"
import {
  type ClientActionFunctionArgs,
  Form,
  json,
  redirect,
  useActionData
} from "@remix-run/react"
import { SaveIcon } from "lucide-react"
import { useMemo } from "react"
import { Center, HStack, Stack } from "styled-system/jsx"
import invariant from "tiny-invariant"
import { z } from "zod"
import { FormErrors } from "~/components/form-errors"
import { toast } from "~/components/toaster"
import { Button } from "~/components/ui/button"
import * as Card from "~/components/ui/card"
import { FormLabel } from "~/components/ui/form-label"
import { Input } from "~/components/ui/input"
import { db } from "~/libs/database"

const schema = z.object({
  name: z.string().trim().min(1),
  url: z.string().trim().url()
})

const buildIconUrl = (url: string) => {
  try {
    const host = new URL(url).host
    return `https://www.google.com/s2/favicons?domain=${host}&sz=32`
  } catch {
    return null
  }
}

export const clientAction = async ({ request }: ClientActionFunctionArgs) => {
  const formData = await request.formData()
  const submission = parseWithZod(formData, { schema })
  if (submission.status !== "success") {
    return json({
      ok: false,
      result: submission.reply()
    })
  }

  const icon = buildIconUrl(submission.value.url)
  invariant(icon)
  await db.dictionaries.add({ ...submission.value, icon })

  toast.success({
    title: "Dictionary added.",
    description: "Dictionary has been added successfully."
  })
  return redirect("/dictionaries")
}

export default function CreateDictionaryPage() {
  const lastResult = useActionData<typeof clientAction>()

  const [form, fields] = useForm({
    lastResult: lastResult?.result,
    constraint: getZodConstraint(schema),
    shouldValidate: "onBlur",
    onValidate: ({ formData }) => parseWithZod(formData, { schema })
  })

  const icon = useMemo(
    () => (!fields.url.errors && fields.url.value ? buildIconUrl(fields.url.value) : null),
    [fields.url.value, fields.url.errors]
  )

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
                <Center
                  w="10"
                  h="10"
                  flexShrink={0}
                  rounded="md"
                  borderWidth="1"
                  borderColor="border.default"
                  overflow="hidden"
                >
                  {icon ? <img src={icon} alt="dictionary icon" /> : "?"}
                </Center>
                <Input {...getInputProps(fields.name, { type: "text" })} />
              </HStack>
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
