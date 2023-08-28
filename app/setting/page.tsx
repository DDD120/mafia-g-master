"use client"

import BasicLayout from "@/components/BasicLayout.tsx"
import Button from "@/components/Button/Button"
import { KeyboardEventHandler, useCallback, useEffect, useState } from "react"
import { MultiValue, Theme } from "react-select"
import UsersCountSelect from "@/components/setting/UsersCountSelect"
import NamesInput from "@/components/setting/NamesInput"
import AddJobSelect from "@/components/setting/AddJobSelect"

const usersCountOptions = [
  { value: 6, label: "6명" },
  { value: 7, label: "7명" },
  { value: 8, label: "8명" },
  { value: 9, label: "9명" },
  { value: 10, label: "10명" },
]

export const selectThema = (theme: Theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: "#FF8A8066",
    primary50: "#FF8A8088",
    primary75: "#FF8A80",
    primary: "#FF5252",
  },
})

export interface Option<T> {
  readonly label: string
  readonly value: T
}

const createOption = (label: string) => ({
  label,
  value: label,
})

function Setting() {
  const [isRequired, setIsRequired] = useState(false)
  const [usersCount, setUsersCount] = useState(usersCountOptions[0].value)
  const [inputValue, setInputValue] = useState("")
  const [names, setNames] = useState<readonly Option<string>[]>([])

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!inputValue) return
    if (names.some((n) => n.label === inputValue)) return
    if (usersCount <= names.length) return

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
    setUsersCount(count.value)
    setNames([])
  }

  useEffect(() => {
    names.length < usersCount ? setIsRequired(false) : setIsRequired(true)
  }, [names.length, usersCount])

  return (
    <BasicLayout
      headText="설정"
      footer={<Button isActive={isRequired}>설정 완료</Button>}
    >
      <div className="flex flex-col gap-4">
        <UsersCountSelect
          onChange={handleUsersCountChange}
          options={usersCountOptions}
        />
        <NamesInput
          usersCount={usersCount}
          names={names}
          isRequired={isRequired}
          inputValue={inputValue}
          handleNamesChange={handleNamesChange}
          handleNamesInputChange={handleNamesInputChange}
          handleKeyDown={handleKeyDown}
        />
        <AddJobSelect />
      </div>
    </BasicLayout>
  )
}

export default Setting
