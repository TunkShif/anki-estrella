import Draggable from "./Draggable"

type DraggableTextProps = {
  text: string
  className?: string
}

const DraggableText = ({ text, className }: DraggableTextProps) => {
  return (
    <Draggable text={text}>
      {(ref) => (
        <div ref={ref} className={className}>
          {text}
        </div>
      )}
    </Draggable>
  )
}

export default DraggableText
