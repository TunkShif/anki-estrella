import { Link, json } from "@remix-run/react"
import { EditIcon, PlusCircleIcon } from "lucide-react"
import { css } from "styled-system/css"
import { Box, Center, HStack, Stack } from "styled-system/jsx"
import { stack } from "styled-system/patterns"
import { Button } from "~/components/ui/button"
import * as Card from "~/components/ui/card"
import { Text } from "~/components/ui/text"
import { db } from "~/libs/database"
import { useDictionariesLoaderData } from "~/libs/loaders"

export const clientLoader = async () => {
  const dictionaries = await db.dictionaries.toArray()
  return json({ dictionaries })
}

export default function DictionariesPage() {
  const { dictionaries } = useDictionariesLoaderData()

  return (
    <Card.Root>
      <Card.Header flexDirection="row" justifyContent="space-between">
        <Box>
          <Card.Title>Dictionaries</Card.Title>
          <Card.Description>Manage your dictionaries.</Card.Description>
        </Box>
        <Button size="xs" asChild>
          <Link to="/dictionaries/create">
            <PlusCircleIcon />
            New
          </Link>
        </Button>
      </Card.Header>

      <Card.Body>
        <ul className={stack({ divideY: "1", gap: "0" })}>
          {dictionaries.map((dictionary) => (
            <li
              key={dictionary.id}
              className={css({ py: "2", _first: { pt: "0" }, _last: { pb: "0" } })}
            >
              <HStack justifyContent="space-between">
                <HStack>
                  <Center
                    w="6"
                    h="6"
                    rounded="md"
                    borderWidth="1"
                    borderColor="border.subtle"
                    overflow="hidden"
                  >
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${
                        new URL(dictionary.url).host
                      }&sz=32`}
                      alt={`logo for ${dictionary.name}`}
                    />
                  </Center>

                  <Stack gap="0">
                    <Text fontWeight="medium">{dictionary.name}</Text>
                    <Text size="xs" color="fg.subtle">
                      {dictionary.url}
                    </Text>
                  </Stack>
                </HStack>

                <Button size="sm" variant="ghost" asChild>
                  <Link to={`/dictionaries/${dictionary.id}/edit`}>
                    <EditIcon />
                    Edit
                  </Link>
                </Button>
              </HStack>
            </li>
          ))}
        </ul>
      </Card.Body>
    </Card.Root>
  )
}
