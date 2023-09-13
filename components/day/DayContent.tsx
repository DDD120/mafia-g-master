"use client"

import { useState } from "react"
import Debate from "./Debate"
import Exile from "./Exile"

export type DayStep = "debate" | "exile"

function DayContent() {
  const [component, setComponent] = useState<DayStep>("debate")

  const nextStep = (component: DayStep) => {
    setComponent(component)
  }

  const stepMap = {
    debate: <Debate nextStep={nextStep} />,
    exile: <Exile />,
  }

  return stepMap[component]
}

export default DayContent
