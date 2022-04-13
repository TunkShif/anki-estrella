import { useAtom } from "jotai"
import { connectedAtom } from "../../store"
import * as AlertDialog from "@radix-ui/react-alert-dialog"
import { XCircleIcon } from "@heroicons/react/solid"
import useConnect from "../../hooks/useConnection"

const ConnectionAlert = () => {
  const [connected] = useAtom(connectedAtom)
  const connect = useConnect()

  return (
    <AlertDialog.Root open={!connected}>
      <AlertDialog.Trigger />
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-gray-800 bg-opacity-20" />
        <AlertDialog.Content className="fixed left-1/2 top-1/4 -mx-[240px] w-[480px] rounded-md bg-white px-8 py-6 shadow-sm dark:bg-slate-800 dark:shadow-none dark:ring-1 dark:ring-inset dark:ring-white/10 ">
          <AlertDialog.Title className="font-display text-xl font-bold text-gray-800 dark:text-slate-200">
            Connection Error
          </AlertDialog.Title>
          <div className="my-4 flex justify-between space-x-4">
            <div className="flex items-center justify-center">
              <XCircleIcon className="h-10 w-10 text-red-400" />
            </div>
            <AlertDialog.Description className="leading-relaxed text-gray-800 dark:text-slate-200">
              Failed to connect to AnkiConnect, please make sure Anki is running
              on the background and AnkiConnect addon is enabled.
            </AlertDialog.Description>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => connect()}
              className="rounded-md bg-sky-400 px-3 py-1.5 font-display text-white hover:bg-sky-500 dark:bg-sky-600 dark:text-slate-200 dark:hover:bg-sky-500"
            >
              Retry
            </button>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}

export default ConnectionAlert
