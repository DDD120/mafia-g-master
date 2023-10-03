"use client"

import { useState, useCallback, useEffect, ChangeEvent } from "react"
import { useMafiaContext } from "@/providers/MafiaProvider"
import { useSelector } from "@xstate/react"
import Button from "@/components/button/Button"
import RoleSelectionInput from "./RoleSelectionInput"
import { userNumberByRole } from "@/lib/setting"

interface SelectedUsersByRoles {
  mafia: string[]
  doctor: string[]
  police: string[]
}

function FirstNight() {
  const mafiaServices = useMafiaContext()
  const { users, roles } = useSelector(mafiaServices, (state) => state.context)
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [selectedUsersByRoles, setSelectedUsersByRoles] =
    useState<SelectedUsersByRoles>({
      mafia: [],
      doctor: [],
      police: [],
    })
  const [isRequired, setIsRequired] = useState(false)

  const changeUsers = (
    e: ChangeEvent<HTMLInputElement>,
    prevUser: string[]
  ) => {
    return e.target.checked
      ? [...prevUser, e.target.value]
      : prevUser.filter((user) => user !== e.target.value)
  }

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, role: keyof SelectedUsersByRoles) => {
      setSelectedUsers((prevUser) => changeUsers(e, prevUser))
      setSelectedUsersByRoles((prevUser) => ({
        ...prevUser,
        [role]: changeUsers(e, prevUser[role]),
      }))
    },
    []
  )

  const handleButtonClick = () => {
    mafiaServices.send("FIRSTDAY", {
      mafia: selectedUsersByRoles.mafia,
      normal: users.filter((user) => !selectedUsers.includes(user)),
      police: roles.includes("police")
        ? selectedUsersByRoles.police
        : undefined,
      doctor: roles.includes("doctor")
        ? selectedUsersByRoles.doctor
        : undefined,
    })
    setIsRequired(false)
  }

  useEffect(() => {
    const {
      mafia: mafiaCount,
      doctor: doctorCount,
      police: policeCount,
    } = userNumberByRole[users.length]
    const { mafia, doctor, police } = selectedUsersByRoles
    const isRequired =
      mafiaCount === mafia.length &&
      (doctorCount ?? 0) === doctor.length &&
      (policeCount ?? 0) === police.length
    isRequired ? setIsRequired(true) : setIsRequired(false)
  }, [users.length, selectedUsersByRoles])

  return (
    <>
      <div className="scrollbar-hide overflow-y-auto">
        <div className="flex flex-col gap-4">
          <RoleSelectionInput
            includeName
            onChange={(e) => handleInputChange(e, "mafia")}
            role="mafia"
            selectedUsers={selectedUsers}
            users={users}
            usersByRole={selectedUsersByRoles.mafia}
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
              usersByRole={selectedUsersByRoles.police}
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
              usersByRole={selectedUsersByRoles.doctor}
            >
              의사을 선정하겠습니다.
              <br /> [어깨를 가볍게 터치하여 의사 선정]
            </RoleSelectionInput>
          )}
        </div>
      </div>
      <div className="shrink-0">
        <Button
          to="/day/1?step=debate"
          isActive={isRequired}
          onClick={handleButtonClick}
        >
          역할 선정 완료
        </Button>
      </div>
    </>
  )
}

export default FirstNight
