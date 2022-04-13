import { useAtom } from "jotai"
import { useCallback } from "react"
import toast from "react-hot-toast"
import { AnkiConnect } from "../lib"
import { connectedAtom } from "../store"

const useConnect = () => {
  const [, setConnected] = useAtom(connectedAtom)
  const memo = useCallback(
    () =>
      toast.promise(
        AnkiConnect.connect().then((_res) => setConnected(true)),
        {
          loading: "Connecting to AnkiConnect...",
          success: "Connected to AnkiConnect!",
          error: "Cannot connect to AnkiConnect"
        }
      ),
    [setConnected]
  )
  return memo
}

export default useConnect
