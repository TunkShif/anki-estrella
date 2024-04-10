import { ark } from "@ark-ui/react"
import type { ComponentProps } from "react"
import { styled } from "styled-system/jsx"
import { text } from "styled-system/recipes"

export const Heading = styled(ark.h1, text)
export interface HeadingProps extends ComponentProps<typeof Heading> {}

Heading.displayName = "Heading"
