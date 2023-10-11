"use client"

import { useState } from "react"
import { createPortal } from "react-dom"
import Button from "./button/Button"

interface Props {
  title: string
  onClose: () => void
  children: React.ReactNode
}

function BaseModal({ children, title, onClose }: Props) {
  const [render, setRender] = useState<HTMLDivElement | null>(null)

  const renderModal = () => {
    if (!render) return
    return createPortal(
      <div className="bg-black border-2 border-opacity-50 border-red fixed p-4 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-11/12 rounded-lg">
        <div className="flex flex-col items-center gap-4">
          <h2 className="font-bold text-2xl">{title}</h2>
          {children}
          <Button isActive layoutMode="inline" onClick={onClose}>
            확인
          </Button>
        </div>
      </div>,
      document.getElementById("modal")!
    )
  }

  return (
    <>
      <div ref={(el) => setRender(el)}></div>
      {renderModal()}
    </>
  )
}

export default BaseModal
