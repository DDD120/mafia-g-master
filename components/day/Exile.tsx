"use client"

import useAliveUsers from "@/hooks/useAliveUsers"
import Script from "../Script"
import Button from "../button/Button"
import SelectInput from "../SelectInput"
import { ChangeEvent, useEffect, useState } from "react"
import { useMafiaContext } from "@/providers/MafiaProvider"
import { useParams } from "next/navigation"
import UsersStatsBoardButton from "../UsersStatsBoard/UsersStatsBoardButton"
import MainContentLayout from "../layout/MainContentLayout"
import useButton from "@/hooks/useButton"

function Exile() {
  const [selectedUser, setSelectedUesr] = useState<string | null>(null)
  const mafiaServices = useMafiaContext()
  const { aliveUsers } = useAliveUsers()
  const { days } = useParams()
  const { isRequired, setIsRequired, onButtonClick, isLoading } = useButton()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedUesr(e.target.value)
  }
  const handleButtonClick = () => {
    mafiaServices.send("AFTERFIRSTNIGHT", {
      exiledUser: selectedUser,
    })
  }

  useEffect(() => {
    if (selectedUser) setIsRequired(true)
  }, [selectedUser, setIsRequired])

  return (
    <>
      <MainContentLayout isLoading={isLoading}>
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
      </MainContentLayout>
      <div className="shrink-0 flex gap-2">
        <div className="flex justify-center items-center">
          <UsersStatsBoardButton />
        </div>
        <Button
          className="flex-1"
          to={`/night/${+days + 1}`}
          isActive={isRequired}
          onClick={() => onButtonClick(handleButtonClick)}
        >
          추방 선택 완료
        </Button>
      </div>
    </>
  )
}

export default Exile
