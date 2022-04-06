import { useAtom } from "jotai"
import { dictAtom } from "../../store"
import EnglishDict from "./EnglishDict"
import SearchBar from "./SearchBar"
import SpanishDict from "./SpanishDict"

const DictPanel = () => {
  const [dict, _setDict] = useAtom(dictAtom)

  return (
    <div className="flex flex-col space-y-4">
      <div className="h-10">
        <SearchBar />
      </div>
      {dict === "en" && <EnglishDict />}
      {dict === "es" && <SpanishDict />}
    </div>
  )
}

export default DictPanel
