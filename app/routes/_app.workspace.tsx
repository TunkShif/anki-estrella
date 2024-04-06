import { Outlet } from "@remix-run/react"
import * as Card from "~/components/ui/card"

export default function WorkspaceLayout() {
  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>Learning</Card.Title>
        <Card.Description>Start to make cards.</Card.Description>
      </Card.Header>
      <Card.Body>
        <Outlet />
      </Card.Body>
    </Card.Root>
  )
}
