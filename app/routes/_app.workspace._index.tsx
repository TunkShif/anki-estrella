import { getFormProps, getInputProps, useForm } from "@conform-to/react"
import { getZodConstraint, parseWithZod } from "@conform-to/zod"
import {
  type ClientActionFunctionArgs,
  type ClientLoaderFunctionArgs,
  Link,
  json,
  redirect,
  useActionData,
  useFetcher,
  useLoaderData,
  useNavigate
} from "@remix-run/react"
import { SaveIcon } from "lucide-react"
import { toInt } from "radash"
import { useCallback, useEffect, useRef } from "react"
import { Stack } from "styled-system/jsx"
import invariant from "tiny-invariant"
import { FieldEditor, type FieldEditorAction } from "~/components/field-editor"
import { toast } from "~/components/toaster"
import { Button } from "~/components/ui/button"
import * as Card from "~/components/ui/card"
import { FormLabel } from "~/components/ui/form-label"
import * as Tabs from "~/components/ui/tabs"
import { Text } from "~/components/ui/text"
import { AddNoteParams, getClient } from "~/libs/anki-connect"
import { db } from "~/libs/database"

const schema = AddNoteParams

const useWorkspaceLoaderData = () => useLoaderData<typeof clientLoader>()

export const clientAction = async ({ request }: ClientActionFunctionArgs) => {
  const formData = await request.formData()
  const submission = parseWithZod(formData, { schema })
  invariant(submission.status === "success")

  const client = getClient()
  const addNoteResult = await client.addNote(submission.value)
  if (addNoteResult.kind !== "Success") {
    return json({
      ok: false,
      result: submission.reply()
    })
  }

  toast.success({
    title: "Note created",
    description: "Your note has been created successfully."
  })
  return json({
    ok: true,
    result: null
  })
}

export const clientLoader = async ({ request }: ClientLoaderFunctionArgs) => {
  const searchParams = new URL(request.url).searchParams

  const profiles = await db.profiles.toArray()

  const isEmpty = profiles.length === 0
  if (isEmpty) {
    return redirect("/workspace/welcome")
  }

  const profileId = toInt(searchParams.get("profile")) || profiles[0].id
  const profile = await db.profiles.get(profileId)
  invariant(profile)

  const client = getClient()
  const fieldsResult = await client.modelFieldNames(profile.model)
  invariant(fieldsResult.kind === "Success" && fieldsResult.data)
  const fields = fieldsResult.data

  return json({ profiles, profile, fields })
}

export default function WorkspacePage() {
  const { profiles, profile, fields: fieldNames } = useWorkspaceLoaderData()

  const fetcher = useFetcher<typeof clientAction>()
  const lastResult = useActionData<typeof clientAction>()
  const navigate = useNavigate()

  const [form, fields] = useForm({
    id: `add-note-${profile.name}`,
    lastResult: lastResult?.result,
    constraint: getZodConstraint(schema),
    shouldValidate: "onBlur",
    onValidate: ({ formData }) => parseWithZod(formData, { schema })
  })
  const cardFields = fields.fields.getFieldset()

  const formRef = useRef<HTMLFormElement>(null)
  const editorsRef = useRef<(FieldEditorAction | null)[]>([])
  const resetForm = useCallback(() => {
    formRef.current?.reset()
    for (const editor of editorsRef.current) {
      editor?.reset()
    }
  }, [])

  const isSubmissionSuccess = fetcher.state === "idle" && fetcher.data?.ok
  useEffect(() => {
    if (isSubmissionSuccess) resetForm()
  }, [isSubmissionSuccess, resetForm])

  return (
    <Stack>
      <Tabs.Root
        variant="enclosed"
        size="sm"
        value={profile.id.toString()}
        onValueChange={({ value }) =>
          navigate({ pathname: "/workspace", search: `?profile=${value}` })
        }
      >
        <Tabs.List>
          {profiles.map((profile) => (
            <Tabs.Trigger key={profile.id} value={profile.id.toString()} asChild>
              <Link to={{ pathname: "/workspace", search: `?profile=${profile.id}` }}>
                {profile.name}
              </Link>
            </Tabs.Trigger>
          ))}
          <Tabs.Indicator />
        </Tabs.List>
      </Tabs.Root>

      <Card.Root>
        <Card.Header>
          <Card.Title>{profile.name}</Card.Title>
          <Card.Description>
            <Text>
              {"Save to "}
              <Text color="fg.default" as="span">
                {profile.deck}
              </Text>
              {" using "}
              <Text color="fg.default" as="span">
                {profile.model}
              </Text>
              {" model."}
            </Text>
          </Card.Description>
        </Card.Header>

        <Card.Body>
          <fetcher.Form
            ref={formRef}
            action="/workspace?index"
            method="post"
            {...getFormProps(form)}
          >
            <input {...getInputProps(fields.deckName, { type: "hidden" })} value={profile.deck} />
            <input {...getInputProps(fields.modelName, { type: "hidden" })} value={profile.model} />
            <Stack gap="4">
              {fieldNames.map((field) => (
                <Stack key={`${profile}-${field}`} gap="1.5">
                  <FormLabel htmlFor={cardFields[field].id}>{field}</FormLabel>
                  <FieldEditor
                    meta={cardFields[field]}
                    editorRef={(action) => editorsRef.current.push(action)}
                  />
                </Stack>
              ))}
            </Stack>
          </fetcher.Form>
        </Card.Body>

        <Card.Footer gap="2">
          <Button variant="outline" onClick={resetForm}>
            Reset
          </Button>
          <Button type="submit" form={form.id}>
            <SaveIcon />
            Save
          </Button>
        </Card.Footer>
      </Card.Root>
    </Stack>
  )
}
