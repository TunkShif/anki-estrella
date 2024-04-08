import { getFormProps, getInputProps, useForm } from "@conform-to/react"
import { getZodConstraint, parseWithZod } from "@conform-to/zod"
import { type ClientActionFunctionArgs, Form, json, useActionData } from "@remix-run/react"
import { SaveIcon } from "lucide-react"
import { Stack } from "styled-system/jsx"
import { FormErrors } from "~/components/form-errors"
import { toast } from "~/components/toaster"
import { Button } from "~/components/ui/button"
import * as Card from "~/components/ui/card"
import { FormLabel } from "~/components/ui/form-label"
import { Input } from "~/components/ui/input"
import { NumberInput } from "~/components/ui/number-input"
import { useSettingsLoaderData } from "~/libs/loaders"
import { AnkiConnectSettings, Settings } from "~/libs/settings"

const schema = AnkiConnectSettings

export const clientLoader = async () => {
  const settings = Settings.get()
  return json({
    settings
  })
}

export const clientAction = async ({ request }: ClientActionFunctionArgs) => {
  const formData = await request.formData()
  const submission = parseWithZod(formData, { schema })

  if (submission.status !== "success") {
    return json({ result: submission.reply() })
  }

  await Settings.set(submission.value)
  toast.success({ title: "Saved!", description: "Your settings has been saved." })
  return json({ result: null })
}

export default function SettingsPage() {
  const { settings } = useSettingsLoaderData()
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
        <Card.Title>Settings</Card.Title>
        <Card.Description>Connect to your Anki application.</Card.Description>
      </Card.Header>

      <Card.Body>
        <Form action="/settings" method="post" {...getFormProps(form)}>
          <Stack gap="4">
            <Stack gap="1.5">
              <FormLabel htmlFor={fields.hostname.id}>Hostname</FormLabel>
              <Input
                defaultValue={settings?.hostname ?? "http://localhost"}
                {...getInputProps(fields.hostname, { type: "text" })}
              />
              <FormErrors errors={fields.hostname.errors} />
            </Stack>

            <Stack gap="1.5">
              <FormLabel htmlFor={fields.port.id}>Port</FormLabel>
              <NumberInput
                formatOptions={{ useGrouping: false }}
                key={fields.port.key}
                id={fields.port.id}
                name={fields.port.name}
                form={fields.port.formId}
                defaultValue={(settings?.port ?? 8765).toString()}
                aria-invalid={!fields.port.valid || undefined}
                aria-describedby={!fields.port.valid ? fields.port.errorId : undefined}
              />
              <FormErrors errors={fields.port.errors} />
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
