import EnglishDict from "./Dictionaries/EnglishDict"
import SpanishDict from "./Dictionaries/SpanishDict"
import { Dictionaries } from "../../lib/dictionary"

type DictContentProps = {
  dict: Dictionaries
}

const DictContent = ({ dict }: DictContentProps) => {
  switch (dict) {
    case "en":
      return <EnglishDict />
    case "es":
      return <SpanishDict />
  }
}

export default DictContent
