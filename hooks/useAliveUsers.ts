"use client"

import { useState, useEffect } from "react"
import { useMafiaContext } from "@/providers/MafiaProvider"
import { useSelector } from "@xstate/react"

function useAliveUsers() {
  const [aliveUsers, setAliveUsers] = useState<string[]>([])
  const [aliveCitizens, setAliveCitizens] = useState<string[]>([])
  const mafiaService = useMafiaContext()
  const aliveMafia = useSelector(
    mafiaService,
    (state) => state.context.mafia.alive
  )
  const aliveNormal = useSelector(
    mafiaService,
    (state) => state.context.citizen.normal.alive
  )
  const aliveDoctor = useSelector(
    mafiaService,
    (state) => state.context.citizen.doctor.alive
  )
  const alivePolice = useSelector(
    mafiaService,
    (state) => state.context.citizen.police.alive
  )

  useEffect(() => {
    setAliveUsers([
      ...aliveMafia,
      ...aliveNormal,
      ...aliveDoctor,
      ...alivePolice,
    ])
    setAliveCitizens([...aliveNormal, ...aliveDoctor, ...alivePolice])
  }, [aliveMafia, aliveNormal, aliveDoctor, alivePolice])

  return {
    aliveUsers,
    aliveCitizens,
    aliveMafia,
    aliveNormal,
    aliveDoctor,
    alivePolice,
  }
}

export default useAliveUsers
