import EnglishDict from "./EnglishDict"
import SearchBar from "./SearchBar"

const DictPanel = () => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="h-10">
        <SearchBar />
      </div>
      <EnglishDict />
    </div>
  )
}

export default DictPanel
