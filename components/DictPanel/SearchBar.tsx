import { SearchIcon } from "@heroicons/react/outline"

const SearchBar = () => {
  return (
    <div className="flex w-full rounded-md bg-white px-2 py-0.5 text-gray-600 shadow-sm focus:border-gray-400">
      <input
        type="text"
        className="w-full border-none bg-transparent focus:ring-0"
      />
      <button
        className="rounded-md px-2 py-0.5 hover:bg-gray-200"
        placeholder="Search"
      >
        <SearchIcon className="h-5 w-5 text-gray-600" />
      </button>
    </div>
  )
}

export default SearchBar
