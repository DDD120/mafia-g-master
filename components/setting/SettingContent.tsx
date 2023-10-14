"use client"

import Button from "@/components/button/Button"
import AddJob from "./AddJob"
import UserNamesInput from "./UserNamesInput"
import UsersCountSelect from "./UsersCountSelect"
import { KeyboardEventHandler, useCallback, useEffect, useState } from "react"
import { MultiValue } from "react-select"
import { useMafiaContext } from "@/providers/MafiaProvider"
import { NumberOfUsersOptions, Option, createOption } from "@/lib/setting"

function SettingContent() {
  const [numberOfUsers, setNumberOfUsers] = useState(
    NumberOfUsersOptions[0].value
  )
  const [userInputValue, setUserInputValue] = useState("")
  const [userNames, setUserNames] = useState<readonly Option<string>[]>([])
  const [isRequired, setIsRequired] = useState(false)
  const [selectedPolice, setSelectedPolice] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState(false)
  const mafiaServices = useMafiaContext()

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!userInputValue) return
    if (userNames.some((n) => n.label === userInputValue)) return
    if (numberOfUsers <= userNames.length) return

    switch (event.key) {
      case "Enter":
      case "Tab":
        setUserNames((prev) => [...prev, createOption(userInputValue)])
        setUserInputValue("")
        event.preventDefault()
    }
  }

  const handleNamesChange = useCallback(
    (newValue: MultiValue<Option<string>>) => {
      setUserNames(newValue)
    },
    []
  )

  const handleNamesInputChange = useCallback((newValue: string) => {
    setUserInputValue(newValue)
  }, [])

  const handleUsersCountChange = (count: Option<number>) => {
    setNumberOfUsers(count.value)
    setUserNames([])
  }

  const handleButtonClick = () => {
    const roles = ["mafia", "normal"]
    if (selectedPolice) roles.push("police")
    if (selectedDoctor) roles.push("doctor")
    mafiaServices.send("PLAYING", {
      users: userNames.map((name) => name.value),
      roles,
    })
    setIsRequired(false)
  }

  useEffect(() => {
    userNames.length < numberOfUsers
      ? setIsRequired(false)
      : setIsRequired(true)
  }, [userNames.length, numberOfUsers])

  return (
    <>
      <div className="flex flex-col gap-4">
        <UsersCountSelect
          onChange={handleUsersCountChange}
          options={NumberOfUsersOptions}
        />
        <UserNamesInput
          numberOfUsers={numberOfUsers}
          userNames={userNames}
          userInputValue={userInputValue}
          isRequired={isRequired}
          handleNamesChange={handleNamesChange}
          handleNamesInputChange={handleNamesInputChange}
          handleKeyDown={handleKeyDown}
        />
        <AddJob
          numberOfUsers={numberOfUsers}
          setSelectedPolice={setSelectedPolice}
          setSelectedDoctor={setSelectedDoctor}
        />
      </div>
      <div className="w-full shrink-0">
        <Button to="/night/1" onClick={handleButtonClick} isActive={isRequired}>
          설정 완료
        </Button>
      </div>
    </>
  )
}

export default SettingContent
