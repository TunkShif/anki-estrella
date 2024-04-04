import { type ClientActionFunctionArgs, Form, json, useLoaderData } from "@remix-run/react"
import { SaveIcon } from "lucide-react"
import { Stack } from "styled-system/jsx"
import invariant from "tiny-invariant"
import { z } from "zod"
import { Button } from "~/components/ui/button"
import * as Card from "~/components/ui/card"
import { FormLabel } from "~/components/ui/form-label"
import { Input } from "~/components/ui/input"
import { AnkiConnect } from "~/libs/anki-connect"
import { db } from "~/libs/database"
import { Settings } from "~/libs/settings"

const schema = z.object({
  name: z.string().trim().min(1),
  deck: z.string().trim().min(1),
  model: z.string().trim().min(1),
  dictionaryId: z.number().gt(0)
})

export const clientAction = async ({ request }: ClientActionFunctionArgs) => {}

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

  console.log(decksResult, modelsResult, dictionaries)

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
              <Input />
            </Stack>

            <Stack gap="1.5">
              <FormLabel>Model</FormLabel>
              <Input />
            </Stack>

            <Stack gap="1.5">
              <FormLabel>Default Dictionary</FormLabel>
              <Input />
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
