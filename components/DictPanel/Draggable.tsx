import { Ref, ReactElement } from "react"
import { useDrag } from "react-dnd"

type DraggableProps = {
  text: string
  children: (ref: Ref<any>) => ReactElement
}

const Draggable = ({ text, children }: DraggableProps) => {
  const [_props, drag] = useDrag(() => ({
    type: "draggable",
    item: { text: text }
  }))

  return children(drag)
}

export default Draggable
