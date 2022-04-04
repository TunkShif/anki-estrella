import SearchBar from "./SearchBar"
import SpanishDict from "./SpanishDict"

const DictPanel = () => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="h-10">
        <SearchBar />
      </div>
      <SpanishDict />
    </div>
  )
}

export default DictPanel
