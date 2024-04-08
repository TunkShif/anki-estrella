import { Form } from "@remix-run/react"
import * as Card from "~/components/ui/card"

export default function CreateDictionaryPage() {
  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>Create Dictionary</Card.Title>
        <Card.Description>Add a new dictionary.</Card.Description>
      </Card.Header>
      <Card.Body>
        <Form method="post"></Form>
      </Card.Body>
    </Card.Root>
  )
}
