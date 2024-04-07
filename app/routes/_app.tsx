import { type ClientLoaderFunctionArgs, redirect } from "@remix-run/react"
import { toast } from "~/components/toaster"
import { Settings } from "~/libs/settings"

export const clientLoader = async ({ request }: ClientLoaderFunctionArgs) => {
  const route = new URL(request.url).pathname
  const settings = Settings.get()
  if (!settings && route !== "/settings") {
    toast.create({
      title: "Configuration Needed",
      description: "Set up your connection with Anki first."
    })
    return redirect("/settings")
  }

  return {}
}
