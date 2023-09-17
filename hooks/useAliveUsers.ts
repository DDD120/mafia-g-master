"use client"

import { useState, useEffect } from "react"
import { useMafiaContext } from "@/providers/MafiaProvider"
import { useSelector } from "@xstate/react"

function useAliveUsers() {
  const [aliveUsers, setAliveUsers] = useState<string[]>([])
  const mafiaService = useMafiaContext()
  const { alive: aliveMafia } = useSelector(
    mafiaService,
    (state) => state.context.mafia
  )
  const { alive: aliveNormal } = useSelector(
    mafiaService,
    (state) => state.context.citizen.normal
  )
  const { alive: aliveDoctor } = useSelector(
    mafiaService,
    (state) => state.context.citizen.doctor
  )
  const { alive: alivePolice } = useSelector(
    mafiaService,
    (state) => state.context.citizen.police
  )

  useEffect(() => {
    setAliveUsers([
      ...aliveMafia,
      ...aliveNormal,
      ...aliveDoctor,
      ...alivePolice,
    ])
  }, [aliveMafia, aliveNormal, aliveDoctor, alivePolice])

  return aliveUsers
}

export default useAliveUsers
