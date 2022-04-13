import { PlayIcon } from "@heroicons/react/outline"
import { ChevronDownIcon } from "@heroicons/react/solid"
import * as Collapsible from "@radix-ui/react-collapsible"
import { useAtom } from "jotai"
import { useEnDictionary } from "../../../lib/dictionary"
import { queryAtom } from "../../../store"
import { Definition, Word } from "../../../types"
import DraggableText from "../DraggableText"
import LoadingSkeleton from "../LoadingSkeleton"
import NotFound from "../NotFound"

const Definitions = ({ definitions }: { definitions: Definition[] }) => {
  return (
    <Collapsible.Root defaultOpen>
      <Collapsible.Trigger className="group mb-4 flex w-full select-none items-center justify-between rounded-md bg-gray-100 px-2 py-1.5 text-gray-600 shadow-sm dark:bg-slate-700 dark:text-slate-400 dark:shadow-none dark:ring-1 dark:ring-inset dark:ring-white/10">
        <span className="font-bold">Definitions</span>
        <ChevronDownIcon className="h-5 w-5 transform duration-300 ease-in-out group-radix-state-open:rotate-180" />
      </Collapsible.Trigger>
      <Collapsible.Content className="flex flex-col space-y-2">
        {definitions.map((definition, index) => (
          <div
            key={index}
            className="flex flex-col items-start justify-center space-y-2"
          >
            <DraggableText
              text={definition.pos}
              className="mr-2 inline-block rounded-sm bg-anki-blue px-1 py-0.5 font-display text-white hover:bg-opacity-80 dark:bg-sky-500 dark:hover:bg-sky-600"
            />
            <DraggableText
              text={definition.sense}
              className="inline-block rounded-sm px-1 py-0.5 text-gray-800 hover:bg-gray-200 dark:text-slate-400 dark:hover:bg-slate-700"
            />
          </div>
        ))}
      </Collapsible.Content>
    </Collapsible.Root>
  )
}

const Content = ({ word }: { word: Word }) => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center justify-between">
        <div className="space-x-2 text-gray-600 dark:text-slate-400">
          <DraggableText
            text={word.word}
            className="inline-block rounded-md px-1 py-0.5 text-xl font-bold hover:bg-gray-200 dark:hover:bg-slate-700"
          />
          <DraggableText
            text={word.phonetics || ""}
            className="inline-block rounded-md px-1 py-0.5 hover:bg-gray-200 dark:hover:bg-slate-700"
          />
        </div>
        <span className="rounded-md p-1 text-gray-600 hover:bg-gray-200 dark:text-slate-400 dark:hover:bg-slate-700">
          <PlayIcon className="h-6 w-6" />
        </span>
      </div>
      <Definitions definitions={word.definitions} />
    </div>
  )
}

const EnglishDict = () => {
  const [query] = useAtom(queryAtom)
  const { data, error } = useEnDictionary(query)

  if (error) return <NotFound />
  if (!data) return <LoadingSkeleton />
  return <Content word={data} />
}

export default EnglishDict
