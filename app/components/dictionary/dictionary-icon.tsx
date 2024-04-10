import { Center, type CenterProps } from "styled-system/jsx"

export interface DictionaryIconProps extends Omit<CenterProps, "children"> {
  src?: string | null
  name?: string
}

export const DictionaryIcon = ({ src, name, ...props }: DictionaryIconProps) => {
  const alt = name ? `icon for ${name}` : "dictionary icon"
  return (
    <Center {...props} rounded="md" overflow="hidden">
      {src ? <img src={src} alt={alt} /> : "?"}
    </Center>
  )
}
