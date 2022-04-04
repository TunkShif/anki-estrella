import useSWR from "swr"
import { PlayIcon } from "@heroicons/react/outline"
import { ChevronDownIcon } from "@heroicons/react/solid"
import * as Collapsible from "@radix-ui/react-collapsible"
import { Definition, Word } from "../../types"

const fetcher = (url: string) =>
  fetch(url).then((res) => res.json() as Promise<{ data: Word }>)

const Definitions = ({ definitions }: { definitions: Definition[] }) => {
  return (
    <Collapsible.Root defaultOpen>
      <Collapsible.Trigger className="group flex w-full select-none items-center justify-between rounded-md bg-gray-100 px-2 py-1.5 text-gray-600 shadow-sm mb-4">
        <span className="font-bold">Definitions</span>
        <ChevronDownIcon className="h-5 w-5 transform duration-300 ease-in-out group-radix-state-open:rotate-180" />
      </Collapsible.Trigger>
      <Collapsible.Content className="flex flex-col space-y-4">
        {definitions.map((definition, index) => (
          <div key={index}>
            <span className="mr-2 font-display text-white px-1 py-0.5 bg-anki-blue rounded-sm">{definition.pos}</span>
            <span className="text-gray-600">{definition.sense}</span>
          </div>
        ))}
      </Collapsible.Content>
    </Collapsible.Root>
  )
}

const Content = ({ word }: { word: Word }) => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center justify-between text-gray-600">
        <div className="space-x-4">
          <span className="text-xl font-bold">{word.word}</span>
          <span className="">{word.phonetics}</span>
        </div>
        <span className="rounded-md p-1 hover:bg-gray-200">
          <PlayIcon className="h-6 w-6" />
        </span>
      </div>
      <Definitions definitions={word.definitions} />
    </div>
  )
}

const EnglishDict = () => {
  const { data, error } = useSWR(
    "https://dictlet-api.tunkshif.one/api/collins-en-cn/query/test",
    fetcher
  )

  return (
    <div className="flex h-[640px] w-full flex-col space-y-4 overflow-y-auto rounded-md bg-white p-4 shadow-sm">
      {error && <div>Error</div>}
      {!data && <div>Loading</div>}
      {data && <Content word={data.data} />}
    </div>
  )
}

export default EnglishDict
