import type { Meta, StoryObj } from "@storybook/react"
import Button from "./Button"

const meta = {
  title: "Button",
  component: Button,
  tags: ["autodocs"],
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    isActive: true,
    onClick: () => {},
    children: "Text",
  },
}

export const Disable: Story = {
  args: {
    isActive: false,
    onClick: () => {},
    children: "Text",
  },
}
