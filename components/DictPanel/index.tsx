import { useAtom } from "jotai"
import Image from "next/image"
import { dictAtom, isQueryEmptyAtom } from "../../store"
import DictContent from "./DictContent"
import SearchBar from "./SearchBar"

const Content = () => {
  const [dict] = useAtom(dictAtom)
  const [isQueryEmpty] = useAtom(isQueryEmptyAtom)

  return (
    <div className="flex h-[640px] w-full flex-col space-y-4 overflow-y-auto rounded-md bg-white p-4 shadow-sm">
      {isQueryEmpty ? (
        <div className="flex select-none flex-col items-center justify-center space-y-6 py-24">
          <Image
            src="/svg/undraw_searching.svg"
            alt="Searching Illustration"
            width={220}
            height={200}
          />
          <span className="font-display text-sm text-gray-400">
            Search something first...
          </span>
        </div>
      ) : (
        <DictContent dict={dict} />
      )}
    </div>
  )
}

const DictPanel = () => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="h-10">
        <SearchBar />
      </div>
      <Content />
    </div>
  )
}

export default DictPanel
