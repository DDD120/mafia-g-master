"use client"

import useAliveUsers from "@/hooks/useAliveUsers"
import Script from "../Script"
import Button from "../button/Button"
import SelectInput from "../SelectInput"
import { ChangeEvent, useState } from "react"
import { useMafiaContext } from "@/providers/MafiaProvider"
import { useParams } from "next/navigation"

function Exile() {
  const mafiaServices = useMafiaContext()
  const { aliveUsers } = useAliveUsers()
  const [selectedUser, setSelectedUesr] = useState<string | null>(null)
  const { days } = useParams()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedUesr(e.target.value)
  }
  const handleButtonClick = () => {
    mafiaServices.send("AFTERFIRSTNIGHT", {
      exiledUser: selectedUser,
    })
  }

  return (
    <>
      <div>
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
      <Button
        to={`/night/${+days + 1}`}
        isActive={!!selectedUser}
        onClick={handleButtonClick}
      >
        추방 선택 완료
      </Button>
    </>
  )
}

export default Exile
