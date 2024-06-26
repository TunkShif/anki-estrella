import { Link } from "@remix-run/react"
import { BirdIcon } from "lucide-react"
import { Center, Stack } from "styled-system/jsx"
import * as Card from "~/components/ui/card"
import { Icon } from "~/components/ui/icon"
import { Link as StyledLink } from "~/components/ui/link"
import { Text } from "~/components/ui/text"

export default function EmptyWorkspacePage() {
  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>Learning</Card.Title>
        <Card.Description>Start to make cards.</Card.Description>
      </Card.Header>
      <Card.Body>
        <Center h="md" borderWidth="1" borderStyle="dashed" borderRadius="xl">
          <Center>
            <Stack alignItems="center">
              <Icon opacity="0.8" size="xl">
                <BirdIcon />
              </Icon>
              <Stack gap="0" alignItems="center">
                <Text size="sm">You don't have a profile yet.</Text>
                <Text size="sm">
                  {"Let's "}
                  <StyledLink color="accent.text" asChild>
                    <Link to="/profiles/create">create a profile</Link>
                  </StyledLink>
                  {" first."}
                </Text>
              </Stack>
            </Stack>
          </Center>
        </Center>
      </Card.Body>
    </Card.Root>
  )
}
