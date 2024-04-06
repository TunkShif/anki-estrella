import { useForm } from "@conform-to/react"
import {
  type ClientLoaderFunctionArgs,
  Form,
  Link,
  json,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation
} from "@remix-run/react"
import { PackageIcon, SaveIcon } from "lucide-react"
import { toInt } from "radash"
import { Box, HStack, Stack } from "styled-system/jsx"
import invariant from "tiny-invariant"
import { Button } from "~/components/ui/button"
import * as Card from "~/components/ui/card"
import { FormLabel } from "~/components/ui/form-label"
import * as Tabs from "~/components/ui/tabs"
import { Text } from "~/components/ui/text"
import { Textarea } from "~/components/ui/textarea"
import { getClient } from "~/libs/anki-connect"
import { db } from "~/libs/database"

const client = getClient()

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

  const fieldsResult = await client.modelFieldNames(profile.model)
  invariant(fieldsResult.kind === "Success" && fieldsResult.data)
  const fields = fieldsResult.data

  return json({ profiles, profile, fields })
}

export const useWorkspaceLoaderData = () => useLoaderData<typeof clientLoader>()

export default function WorkspacePage() {
  const { profiles, profile, fields } = useWorkspaceLoaderData()

  const navigate = useNavigate()

  // const [form, fields] = useForm({id: `add-note-${profile.name}`})

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
          <Form action="/workspace?index" method="post">
            <Stack gap="4">
              {fields.map((field) => (
                <Stack key={`${profile}-${field}`} gap="1.5">
                  <FormLabel>{field}</FormLabel>
                  <Textarea />
                </Stack>
              ))}
            </Stack>
          </Form>
        </Card.Body>

        <Card.Footer>
          <Button>
            <SaveIcon />
            Save
          </Button>
        </Card.Footer>
      </Card.Root>
    </Stack>
  )
}
