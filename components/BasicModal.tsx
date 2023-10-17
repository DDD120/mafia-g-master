"use client"

import { useState } from "react"
import { createPortal } from "react-dom"
import Button from "./button/Button"
import { useSpring, animated, easings } from "@react-spring/web"

interface Props {
  title: string
  onClose: () => void
  children: React.ReactNode
}

function BasicModal({ children, title, onClose }: Props) {
  const [render, setRender] = useState<HTMLDivElement | null>(null)
  const spring = useSpring({
    from: { opacity: 0, y: 20, transform: `translate(-50%, -50%)` },
    to: { opacity: 1, y: 0, transform: `translate(-50%, -50%)` },
    config: {
      easing: easings.easeOutQuint,
      duration: 300,
    },
  })

  const renderModal = () => {
    if (!render) return
    return createPortal(
      <animated.div
        style={spring}
        className="max-h-[90%] sm:max-w-[600px] h-auto bg-black border-2 border-opacity-50 border-red fixed p-4 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-11/12 rounded-lg overflow-hidden flex"
      >
        <div className="flex-1 flex flex-col items-center gap-4">
          <h2 className="font-bold text-2xl">{title}</h2>
          <div className="scrollbar-hide overflow-y-auto w-full">
            {children}
          </div>
          <Button
            className="shrink-0 w-full"
            isActive
            layoutMode="fullWidth"
            onClick={onClose}
          >
            확인
          </Button>
        </div>
      </animated.div>,
      document.getElementById("modal")!
    )
  }

  return (
    <>
      <div
        className="w-full h-full opacity-75 fixed top-0 left-0 bg-black backdrop-blur-xl"
        ref={(el) => setRender(el)}
      ></div>
      {renderModal()}
    </>
  )
}

export default BasicModal
