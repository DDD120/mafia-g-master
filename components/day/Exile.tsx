"use client"

import useAliveUsers from "@/hooks/useAliveUsers"
import Script from "../Script"
import Button from "../button/Button"
import SelectInput from "../SelectInput"
import { ChangeEvent, useEffect, useState } from "react"
import { useMafiaContext } from "@/providers/MafiaProvider"
import { useParams } from "next/navigation"
import UsersStatsBoardButton from "../UsersStatsBoard/UsersStatsBoardButton"

function Exile() {
  const mafiaServices = useMafiaContext()
  const { aliveUsers } = useAliveUsers()
  const [selectedUser, setSelectedUesr] = useState<string | null>(null)
  const [isRequired, setIsRequred] = useState(false)
  const { days } = useParams()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedUesr(e.target.value)
  }
  const handleButtonClick = () => {
    mafiaServices.send("AFTERFIRSTNIGHT", {
      exiledUser: selectedUser,
    })
    setIsRequred(false)
  }

  useEffect(() => {
    if (selectedUser) setIsRequred(true)
  }, [selectedUser])

  return (
    <>
      <div className="scrollbar-hide overflow-y-auto sm:scrollbar-default sm:pr-2">
        <Script>추방할 사람을 선택하세요.</Script>
        <div className="my-2">
          <ul>
            {aliveUsers.map((user) => (
              <SelectInput
                key={user}
                type="radio"
                name="exile"
                id={user}
                value={user}
                onChange={handleInputChange}
              />
            ))}
          </ul>
        </div>
      </div>
      <div className="shrink-0 flex gap-2">
        <div className="flex justify-center items-center">
          <UsersStatsBoardButton />
        </div>
        <div className="flex-1">
          <Button
            to={`/night/${+days + 1}`}
            isActive={isRequired}
            onClick={handleButtonClick}
          >
            추방 선택 완료
          </Button>
        </div>
      </div>
    </>
  )
}

export default Exile
