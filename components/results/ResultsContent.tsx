"use client"

import { useMafiaContext } from "@/providers/MafiaProvider"
import Button from "../button/Button"
import { useSelector } from "@xstate/react"
import { useEffect, useState } from "react"
import useAliveUsers from "@/hooks/useAliveUsers"
import { Roles } from "@/store/mafia"

type Citizen = {
  [key: string]: {
    alive: string[]
    died: string[]
  }
}

function ResultsContent() {
  const [mafiaUsers, setMafiaUsers] = useState<string[]>([])
  const [citizenUsers, setCitizenUsers] = useState<[string, string[]][]>([])
  const mafiaServices = useMafiaContext()
  const { winner, mafia, citizen, roles } = useSelector(
    mafiaServices,
    (state) => state.context
  )
  const { aliveUsers } = useAliveUsers()

  const winnerMap = {
    mafia: "마피아 팀",
    citizen: "시민 팀",
  }

  const roleMap: Record<string, string> = {
    normal: "일반 시민",
    doctor: "의사",
    police: "경찰",
  }

  const handleButtonClick = () => {
    mafiaServices.stop()
    mafiaServices.start()
  }

  useEffect(() => {
    setMafiaUsers([...mafia.alive, ...mafia.died])
    for (let role in citizen) {
      if (!roles.includes(role as Roles)) return
      const { alive, died } = (citizen as Citizen)[role]
      setCitizenUsers((prev) => [...prev, [role, [...alive, ...died]]])
    }
  }, [mafia, citizen, roles])

  return (
    <>
      <div className="scrollbar-hide overflow-y-auto">
        <h1 className="mt-16 mb-20 text-center text-4xl font-black">
          {winner && winnerMap[winner]}이 <br />
          승리하였습니다!
        </h1>
        <div className="mt-8 text-center flex flex-col gap-8">
          <div className="relative border border-white border-opacity-20 rounded-lg p-4">
            <h2 className="absolute top-[-20px] left-1/2 translate-x-[-50%] inline-block  text-3xl font-bold bg-black px-4">
              생존자
            </h2>
            <div className="mt-2 flex justify-center gap-2">
              {aliveUsers.map((user) => (
                <span key={user}>{user} </span>
              ))}
            </div>
          </div>
          <div className="relative border border-white border-opacity-20 rounded-lg p-4">
            <h2 className="absolute top-[-20px] left-1/2 translate-x-[-50%] inline-block  text-3xl font-bold bg-black px-4">
              역할
            </h2>
            <div>
              <h3 className="text-xl font-bold my-2">마피아 팀</h3>
              <div className="flex justify-center gap-2">
                {mafiaUsers.map((mafia) => (
                  <span key={mafia}>{mafia} </span>
                ))}
              </div>
            </div>
            <h3 className="text-xl font-bold my-2">시민 팀</h3>

            {citizenUsers.map((citizen) => (
              <div key={citizen[0]}>
                <span>{roleMap[citizen[0]]}</span>
                <div className="flex justify-center gap-2">
                  {citizen[1].map((user) => (
                    <span key={user}>{user} </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="shrink-0">
        <Button to="/" onClick={handleButtonClick}>
          메인 화면으로 가기
        </Button>
      </div>
    </>
  )
}

export default ResultsContent
