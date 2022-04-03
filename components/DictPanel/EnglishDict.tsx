import useSWR from "swr"
import * as Collapsible from "@radix-ui/react-collapsible"
import { PlayIcon } from "@heroicons/react/outline"
import { Word } from "../../types"

const fetcher = (url: string) =>
  fetch(url).then((res) => res.json() as Promise<{ data: Word }>)

const Definitions = () => {

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
      <div>
      </div>
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
