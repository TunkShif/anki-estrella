import { createToaster } from "@ark-ui/react/toast"
import { XIcon } from "lucide-react"
import { IconButton } from "~/components/ui/icon-button"
import * as Toast from "~/components/ui/toast"

export const [Toaster, toast] = createToaster({
  placement: "top",
  render(toast) {
    return (
      <Toast.Root>
        <Toast.Title>{toast.title}</Toast.Title>
        <Toast.Description>{toast.description}</Toast.Description>
        <Toast.CloseTrigger asChild>
          <IconButton size="sm" variant="link">
            <XIcon />
          </IconButton>
        </Toast.CloseTrigger>
      </Toast.Root>
    )
  }
})
