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
import MainContentLayout from "../layout/MainContentLayout"

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
      <MainContentLayout>
        <Congratulation winner={winner} />
        <ResultsSummary
          aliveUsers={aliveUsers}
          mafiaUsers={mafiaUsers}
          citizenUsers={citizenUsers}
        />
      </MainContentLayout>
      <Button className="shrink-0" isActive to="/" onClick={handleButtonClick}>
        메인 화면으로 가기
      </Button>
    </>
  )
}

export default ResultsContent
