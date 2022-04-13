import { useAtom } from "jotai"
import toast from "react-hot-toast"
import { AnkiConnect } from "../lib"
import { deckAtom, formAtom, modelAtom } from "../store"

const useSaveNote = () => {
  const [deckName] = useAtom(deckAtom)
  const [modelName] = useAtom(modelAtom)
  const [fields] = useAtom(formAtom)

  return () =>
    toast.promise(
      AnkiConnect.addNote({ deckName, modelName, fields }).then((res) => {
        if (res.error) throw new Error(res.error)
      }),
      {
        loading: "Saving new note...",
        success: "Saved!",
        error: (err) => err.toString()
      }
    )
}
export default useSaveNote
