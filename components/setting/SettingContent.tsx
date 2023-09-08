"use client"

import Button from "@/components/button/Button"
import AddJobSelect from "./AddJobSelect"
import NamesInput from "./NamesInput"
import UsersCountSelect from "./UsersCountSelect"
import { KeyboardEventHandler, useCallback, useEffect, useState } from "react"
import { MultiValue } from "react-select"
import { useMafiaContext } from "@/providers/MafiaProvider"
import { NumberOfUsersOptions, Option, createOption } from "@/lib/setting"

function SettingContent() {
  const [numberOfUsers, setNumberOfUsers] = useState(
    NumberOfUsersOptions[0].value
  )
  const [inputValue, setInputValue] = useState("")
  const [names, setNames] = useState<readonly Option<string>[]>([])
  const [isRequired, setIsRequired] = useState(false)
  const [selectedPolice, setSelectedPolice] = useState(false)
  const [selectedDocter, setSelectedDocter] = useState(false)
  const mafiaServices = useMafiaContext()

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!inputValue) return
    if (names.some((n) => n.label === inputValue)) return
    if (numberOfUsers <= names.length) return

    switch (event.key) {
      case "Enter":
      case "Tab":
        setNames((prev) => [...prev, createOption(inputValue)])
        setInputValue("")
        event.preventDefault()
    }
  }

  const handleNamesChange = useCallback(
    (newValue: MultiValue<Option<string>>) => {
      setNames(newValue)
    },
    []
  )

  const handleNamesInputChange = useCallback((newValue: string) => {
    setInputValue(newValue)
  }, [])

  const handleUsersCountChange = (count: Option<number>) => {
    setNumberOfUsers(count.value)
    setNames([])
  }

  const onButtonClick = () => {
    const rols = ["mafia", "normal"]
    if (selectedPolice) rols.push("police")
    if (selectedDocter) rols.push("docter")
    mafiaServices.send("PLAYING", {
      users: names.map((name) => name.value),
      rols,
    })
  }

  useEffect(() => {
    names.length < numberOfUsers ? setIsRequired(false) : setIsRequired(true)
  }, [names.length, numberOfUsers])

  return (
    <>
      <div className="flex flex-col gap-4">
        <UsersCountSelect
          onChange={handleUsersCountChange}
          options={NumberOfUsersOptions}
        />
        <NamesInput
          numberOfUsers={numberOfUsers}
          names={names}
          isRequired={isRequired}
          inputValue={inputValue}
          handleNamesChange={handleNamesChange}
          handleNamesInputChange={handleNamesInputChange}
          handleKeyDown={handleKeyDown}
        />
        <AddJobSelect
          numberOfUsers={numberOfUsers}
          setSelectedPolice={setSelectedPolice}
          setSelectedDocter={setSelectedDocter}
        />
      </div>
      <div className="w-full">
        <Button
          to="/night?days=1"
          onClick={onButtonClick}
          isActive={isRequired}
        >
          설정 완료
        </Button>
      </div>
    </>
  )
}

export default SettingContent
