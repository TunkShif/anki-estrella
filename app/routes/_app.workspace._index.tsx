import {
  type ClientLoaderFunctionArgs,
  Link,
  json,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation
} from "@remix-run/react"
import { PackageIcon } from "lucide-react"
import { toInt } from "radash"
import { Box, HStack, Stack } from "styled-system/jsx"
import invariant from "tiny-invariant"
import { Icon } from "~/components/ui/icon"
import * as Tabs from "~/components/ui/tabs"
import { Text } from "~/components/ui/text"
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
  const navigation = useNavigation()
  const isNavigating = navigation.state !== "idle"

  return (
    <Box>
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
      <Stack
        p="4"
        minH="xs"
        _loading={{ opacity: "0.6", pointerEvents: "none" }}
        aria-busy={isNavigating || undefined}
      >
        <HStack>
          <HStack>
            <Text size="sm" fontWeight="medium">
              <Icon mr="1">
                <PackageIcon />
              </Icon>
              Deck:
            </Text>
          </HStack>
        </HStack>
      </Stack>
    </Box>
  )
}
