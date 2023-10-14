"use client"

import { useMafiaContext } from "@/providers/MafiaProvider"
import Button from "../button/Button"
import { useSelector } from "@xstate/react"
import { useEffect, useState } from "react"
import useAliveUsers from "@/hooks/useAliveUsers"
import { Citizen, CitizenRoles, Roles } from "@/store/types"
import Congratulation from "./Congratulation"
import ResultsSummary from "./ResultsSummary"
import { userRoleMap } from "@/store/mafia"

function ResultsContent() {
  const [mafiaUsers, setMafiaUsers] = useState<string[]>([])
  const [citizenUsers, setCitizenUsers] = useState<[CitizenRoles, string[]][]>(
    []
  )
  const mafiaServices = useMafiaContext()
  const { winner, mafia, citizen, roles } = useSelector(
    mafiaServices,
    (state) => state.context
  )
  const { aliveUsers } = useAliveUsers()

  const handleButtonClick = () => {
    mafiaServices.stop()
    mafiaServices.start()
    userRoleMap.clear()
  }

  useEffect(() => {
    setMafiaUsers([...mafia.alive, ...mafia.died])
    for (let role in citizen) {
      if (!roles.includes(role as Roles)) return

      const { alive, died } = citizen[role as keyof Citizen]
      setCitizenUsers((prev) => [
        ...prev,
        [role as keyof Citizen, [...alive, ...died]],
      ])
    }
  }, [mafia, citizen, roles])

  return (
    <>
      <div className="scrollbar-hide overflow-y-auto sm:scrollbar-default sm:pr-2">
        <Congratulation winner={winner} />
        <ResultsSummary
          aliveUsers={aliveUsers}
          mafiaUsers={mafiaUsers}
          citizenUsers={citizenUsers}
        />
      </div>
      <div className="shrink-0">
        <Button isActive to="/" onClick={handleButtonClick}>
          메인 화면으로 가기
        </Button>
      </div>
    </>
  )
}

export default ResultsContent
