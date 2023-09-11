"use client"

import { useMafiaContext } from "@/providers/MafiaProvider"
import { useSelector } from "@xstate/react"

function Day() {
  const mafiaServices = useMafiaContext()
  const { mafia, citizen } = useSelector(
    mafiaServices,
    (state) => state.context
  )
  console.log(mafia)
  return (
    <div>
      <p>{mafia.alive}</p>
      <p>{citizen.normal.alive}</p>
    </div>
  )
}

export default Day
