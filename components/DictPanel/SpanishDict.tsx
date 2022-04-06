import useSWR from "swr"
import { PlayIcon } from "@heroicons/react/outline"
import { Word } from "../../types"
import DraggableText from "./DraggableText"
import { querySpanishWord } from "../../lib/dictionary"
import { useAtom } from "jotai"
import { queryAtom } from "../../store"

const Content = ({ word }: { word: Word }) => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center justify-between text-gray-600">
        <DraggableText
          text={word.word}
          className="inline-block rounded-md px-1 py-0.5 text-xl font-bold hover:bg-gray-200"
        />
        <span className="rounded-md p-1 hover:bg-gray-200">
          <PlayIcon className="h-6 w-6" />
        </span>
      </div>
      <div className="space-y-4">
        {word.definitions.map((definition, index) => (
          <div key={index} className="space-y-2">
            <div>
              <DraggableText
                text={definition.pos}
                className="mr-2 inline-block rounded-sm bg-anki-blue px-1 py-0.5 font-display text-white hover:bg-opacity-80"
              />
              <DraggableText
                text={definition.sense}
                className="inline-block rounded-sm px-1 py-0.5 text-gray-800 hover:bg-gray-200"
              />
            </div>
            <div className="space-y-1">
              {definition.examples.map((example, index) => (
                <div key={index} className="space-y-1">
                  <DraggableText
                    text={example.example}
                    className="rounded-md px-1 py-0.5 text-gray-800 hover:bg-gray-200"
                  />
                  <DraggableText
                    text={example.exampleTranslation!!}
                    className="rounded-md px-1 py-0.5 text-gray-600 hover:bg-gray-200"
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
  const [query, _setQuery] = useAtom(queryAtom)
  const { data, error } = useSWR(query, querySpanishWord)

  return (
    <div className="flex h-[640px] w-full flex-col space-y-4 overflow-y-auto rounded-md bg-white p-4 shadow-sm">
      {error && <div>Error</div>}
      {!data && <div>Loading</div>}
      {data && <Content word={data.data} />}
    </div>
  )
}

export default SpanishDict
