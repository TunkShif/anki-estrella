import { Link, json, useLoaderData } from "@remix-run/react"
import { EditIcon, PlusCircleIcon, Trash2Icon } from "lucide-react"
import { css } from "styled-system/css"
import { HStack, Stack } from "styled-system/jsx"
import { stack } from "styled-system/patterns"
import { DictionaryIcon } from "~/components/dictionary/dictionary-icon"
import { Tooltip } from "~/components/tooltip"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import * as Card from "~/components/ui/card"
import { IconButton } from "~/components/ui/icon-button"
import { Text } from "~/components/ui/text"
import { Dictionaries } from "~/libs/service"

export const clientLoader = async () => {
  const dictionaries = await Dictionaries.all()
  return json({ dictionaries })
}

export default function DictionariesPage() {
  const { dictionaries } = useLoaderData<typeof clientLoader>()

  return (
    <Card.Root>
      <Card.Header flexDirection="row" justifyContent="space-between">
        <Stack gap="1">
          <Card.Title>Dictionaries</Card.Title>
          <Card.Description>Manage your dictionaries.</Card.Description>
        </Stack>
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
                <HStack maxW="60%">
                  <DictionaryIcon
                    name={dictionary.name}
                    src={dictionary.icon}
                    w="6"
                    h="6"
                    flexShrink={0}
                  />

                  <Stack gap="0.5" overflowX="auto">
                    <HStack gap="1.5">
                      <Text fontWeight="medium">{dictionary.name}</Text>
                      <Badge size="sm">{dictionary.language}</Badge>
                    </HStack>
                    <Text truncate size="xs" color="fg.subtle">
                      {dictionary.url}
                    </Text>
                  </Stack>
                </HStack>

                <HStack gap="0" flexShrink={0}>
                  <Button size="sm" variant="ghost" asChild>
                    <Link to={`/dictionaries/${dictionary.id}/edit`}>
                      <EditIcon />
                      Edit
                    </Link>
                  </Button>

                  <Tooltip content="Delete">
                    <IconButton colorPalette="red" size="sm" variant="ghost" aria-label="Delete">
                      <Trash2Icon />
                    </IconButton>
                  </Tooltip>
                </HStack>
              </HStack>
            </li>
          ))}
        </ul>
      </Card.Body>
    </Card.Root>
  )
}
