"use client"

import {
  useState,
  useCallback,
  useMemo,
  useEffect,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react"
import BasicLayout from "@/components/BasicLayout"
import { useMafiaContext } from "@/providers/MafiaProvider"
import { useSelector } from "@xstate/react"
import Button from "@/components/button/Button"
import RoleSelectionInput from "./RoleSelectionInput"
import { userNumberByRole } from "@/lib/setting"

function FirstNight() {
  const mafiaServices = useMafiaContext()
  const { users, roles } = useSelector(mafiaServices, (state) => state.context)
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [mafiaUsers, setMafiaUesrs] = useState<string[]>([])
  const [doctorUsers, setDoctorUesrs] = useState<string[]>([])
  const [policeUsers, setPoliceUesrs] = useState<string[]>([])
  const [isRequired, setIsRequired] = useState(false)

  const changeUsers = (
    e: ChangeEvent<HTMLInputElement>,
    prevUser: string[]
  ) => {
    return e.target.checked
      ? [...prevUser, e.target.value]
      : prevUser.filter((user) => user !== e.target.value)
  }

  const roleMap: Record<string, Dispatch<SetStateAction<string[]>>> = useMemo(
    () => ({
      mafia: setMafiaUesrs,
      doctor: setDoctorUesrs,
      police: setPoliceUesrs,
    }),
    []
  )

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, role: string) => {
      setSelectedUsers((prevUser) => changeUsers(e, prevUser))
      roleMap[role]((prevUser) => changeUsers(e, prevUser))
    },
    [roleMap]
  )

  const handleButtonClick = () => {
    mafiaServices.send("DAY", {
      mafia: mafiaUsers,
      normal: users.filter((user) => !selectedUsers.includes(user)),
      police: roles.includes("police") ? policeUsers : undefined,
      doctor: roles.includes("doctor") ? doctorUsers : undefined,
    })
  }

  useEffect(() => {
    userNumberByRole[users.length]?.mafia === mafiaUsers.length &&
    userNumberByRole[users.length]?.doctor === doctorUsers.length &&
    userNumberByRole[users.length]?.police === policeUsers.length
      ? setIsRequired(true)
      : setIsRequired(false)
  }, [users.length, mafiaUsers, doctorUsers, policeUsers])

  return (
    <BasicLayout headText="첫번째 밤">
      <div className="scrollbar-hide overflow-y-auto">
        <div className="flex flex-col gap-4">
          <RoleSelectionInput
            includeName
            onChange={(e) => handleInputChange(e, "mafia")}
            role="mafia"
            selectedUsers={selectedUsers}
            users={users}
            usersByRole={mafiaUsers}
          >
            밤이 되었습니다.
            <br /> 모두 눈을 감고 엎드려 바닥을 가볍게 두드리세요.
            <br /> [몇초뒤]
            <br /> 마피아를 선정하겠습니다.
            <br /> [어깨를 가볍게 터치하여 마피아 선정]
          </RoleSelectionInput>
          {roles.includes("police") && (
            <RoleSelectionInput
              includeName={false}
              onChange={(e) => handleInputChange(e, "police")}
              role="police"
              selectedUsers={selectedUsers}
              users={users}
              usersByRole={policeUsers}
            >
              경찰을 선정하겠습니다.
              <br /> [어깨를 가볍게 터치하여 경찰 선정]
            </RoleSelectionInput>
          )}
          {roles.includes("doctor") && (
            <RoleSelectionInput
              includeName={false}
              onChange={(e) => handleInputChange(e, "doctor")}
              role="doctor"
              selectedUsers={selectedUsers}
              users={users}
              usersByRole={doctorUsers}
            >
              의사을 선정하겠습니다.
              <br /> [어깨를 가볍게 터치하여 의사 선정]
            </RoleSelectionInput>
          )}
        </div>
      </div>
      <div className="shrink-0">
        <Button to="/day/1?step=debate" isActive={isRequired} onClick={handleButtonClick}>
          역할 선정 완료
        </Button>
      </div>
    </BasicLayout>
  )
}

export default FirstNight
