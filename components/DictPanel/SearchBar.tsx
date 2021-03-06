import { SearchIcon } from "@heroicons/react/outline"
import { useAtom } from "jotai"
import { useState } from "react"
import { queryAtom } from "../../store"

const SearchBar = () => {
  const [text, setText] = useState("")
  const [, setQuery] = useAtom(queryAtom)

  return (
    <div className="flex w-full rounded-md bg-white px-2 py-0.5 text-gray-600 shadow-sm focus:border-gray-400 dark:bg-slate-800 dark:text-slate-400 dark:shadow-none dark:ring-1 dark:ring-inset dark:ring-white/10">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={(e) => {
          if (e.key == "Enter") setQuery(text)
        }}
        type="text"
        className="w-full border-none bg-transparent focus:ring-0"
      />
      <button
        onClick={() => setQuery(text)}
        className="rounded-md px-2 py-0.5 hover:bg-gray-200 dark:hover:bg-slate-700"
      >
        <SearchIcon className="h-5 w-5 text-gray-600 dark:text-slate-400" />
      </button>
    </div>
  )
}

export default SearchBar
