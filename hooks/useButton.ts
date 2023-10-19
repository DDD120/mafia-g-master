"use client"

import { useState } from "react"

function useButton() {
  const [isRequired, setIsRequired] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const onButtonClick = (callback: Function) => {
    callback()
    setIsRequired(false)
    setIsLoading(true)
  }

  return {
    isRequired,
    setIsRequired,
    isLoading,
    onButtonClick,
  }
}

export default useButton
