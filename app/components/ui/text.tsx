import { ark } from "@ark-ui/react"
import type { ComponentProps } from "react"
import { styled } from "styled-system/jsx"
import { text } from "styled-system/recipes"

export const Text = styled(ark.p, text)
export interface TextProps extends ComponentProps<typeof Text> {}

Text.displayName = "Text"
