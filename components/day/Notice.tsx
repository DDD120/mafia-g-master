"use client"

import { useMafiaContext } from "@/providers/MafiaProvider"
import { useSelector } from "@xstate/react"

function Notice() {
  const mafiaServices = useMafiaContext()
  const dayNotice = useSelector(
    mafiaServices,
    (state) => state.context.dayNotice
  )

  return (
    <>
      {dayNotice !== "" && (
        <>
          <br />
          {dayNotice}
        </>
      )}
    </>
  )
}

export default Notice
