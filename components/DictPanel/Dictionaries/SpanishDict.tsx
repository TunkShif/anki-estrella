import { PlayIcon } from "@heroicons/react/outline"
import { useAtom } from "jotai"
import { useEsDicrionary } from "../../../lib/dictionary"
import { queryAtom } from "../../../store"
import { Word } from "../../../types"
import DraggableText from "../DraggableText"
import LoadingSkeleton from "../LoadingSkeleton"
import NotFound from "../NotFound"

const Content = ({ word }: { word: Word }) => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center justify-between text-gray-600">
        <DraggableText
          text={word.word}
          className="inline-block rounded-md px-1 py-0.5 text-xl font-bold hover:bg-gray-200 dark:text-slate-400 dark:hover:bg-slate-700"
        />
        <span className="rounded-md p-1 hover:bg-gray-200 dark:text-slate-400 dark:hover:bg-slate-700">
          <PlayIcon className="h-6 w-6" />
        </span>
      </div>
      <div className="space-y-4">
        {word.definitions.map((definition, index) => (
          <div key={index} className="space-y-2">
            <div>
              <DraggableText
                text={definition.pos}
                className="mr-2 inline-block rounded-sm bg-anki-blue px-1 py-0.5 font-display text-white hover:bg-opacity-80 dark:bg-sky-500 dark:hover:bg-sky-600"
              />
              <DraggableText
                text={definition.sense}
                className="inline-block rounded-sm px-1 py-0.5 text-gray-800 hover:bg-gray-200 dark:text-slate-400 dark:hover:bg-slate-700"
              />
            </div>
            <div className="space-y-1">
              {definition.examples.map((example, index) => (
                <div key={index} className="space-y-1">
                  <DraggableText
                    text={example.example}
                    className="rounded-md px-1 py-0.5 text-gray-800 hover:bg-gray-200 dark:text-slate-300 dark:hover:bg-slate-700"
                  />
                  <DraggableText
                    text={example.exampleTranslation!!}
                    className="rounded-md px-1 py-0.5 text-gray-600 hover:bg-gray-200 dark:text-slate-400 dark:hover:bg-slate-700"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const SpanishDict = () => {
  const [query] = useAtom(queryAtom)
  const { data, error } = useEsDicrionary(query)

  if (error) return <NotFound />
  if (!data) return <LoadingSkeleton />
  return <Content word={data} />
}

export default SpanishDict
