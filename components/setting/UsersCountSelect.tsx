"use client"

import { colors } from "@/lib/colors"
import { Option, selectThema } from "@/lib/setting"
import Select, { GroupBase, OptionsOrGroups } from "react-select"

interface Props {
  onChange: (newValue: Option<number>) => void
  options: OptionsOrGroups<any, GroupBase<any>>
}

function UsersCountSelect({ onChange, options }: Props) {
  return (
    <div className="flex justify-between">
      <h2 className="text-xl font-bold">인원</h2>
      <Select
        id="usersCount"
        instanceId="usersCount"
        onChange={onChange}
        defaultValue={options[0]}
        options={options}
        theme={selectThema}
        styles={{
          control: (base) => ({
            ...base,
            backgroundColor: colors.black,
            border: "none",
            cursor: "pointer",
            transform: "translate(-1px,1px)",
          }),
          option: (base) => ({
            ...base,
            color: colors.black,
            cursor: "pointer",
          }),
          singleValue: (base) => ({
            ...base,
            color: colors.textGray50,
            fontSize: "24px",
            paddingInline: "8px",
          }),
          indicatorSeparator: (base) => ({
            ...base,
            display: "none",
          }),
        }}
      />
    </div>
  )
}

export default UsersCountSelect
