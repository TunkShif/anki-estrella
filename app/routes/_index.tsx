import { type ClientLoaderFunction, redirect } from "@remix-run/react"

export const clientLoader: ClientLoaderFunction = async () => {
  return redirect("/workspace")
}

export default function IndexPage() {
  return null
}
