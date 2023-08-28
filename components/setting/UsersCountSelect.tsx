"use client"

import { Option, selectThema } from "@/app/setting/page"
import { colors } from "@/lib/colors"
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
            transition: "0.2s",
            cursor: "pointer",
          }),
          option: (base) => ({
            ...base,
            color: colors.black,
            transition: "0.2s",
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
