import CreatableSelect from "react-select/creatable"
import { FaBan, FaCheck } from "react-icons/fa"
import { KeyboardEvent, useEffect, useRef } from "react"
import {
  MultiValue,
  InputProps,
  components,
  GroupBase,
  SelectInstance,
} from "react-select"
import { Option, selectThema } from "@/lib/setting"

interface Props {
  userNames: readonly Option<string>[]
  numberOfUsers: number
  isRequired: boolean
  userInputValue: string
  handleKeyDown: (event: KeyboardEvent) => void
  handleNamesChange: (newValue: MultiValue<Option<string>>) => void
  handleNamesInputChange: (newValue: string) => void
}

function Input(
  props: InputProps<Option<string>, true, GroupBase<Option<string>>>
) {
  return <components.Input minLength={1} maxLength={7} {...props} />
}

function UserNamesInput({
  userNames,
  numberOfUsers,
  isRequired,
  handleKeyDown,
  handleNamesChange,
  handleNamesInputChange,
  userInputValue,
}: Props) {
  const inputRef = useRef<SelectInstance<Option<string>, true> | null>(null)

  useEffect(() => {
    if (isRequired) inputRef.current?.blur()
  }, [isRequired])

  return (
    <>
      <p className="text-xl flex items-center">
        참여자의 이름을 적어주세요 ({userNames.length}/{numberOfUsers})
        {isRequired ? (
          <FaCheck color="lightgreen" className="ml-2 translate-y-[0.5px]" />
        ) : (
          <FaBan color="red" className="ml-2 translate-y-[0.5px]" />
        )}
      </p>
      <CreatableSelect
        ref={inputRef}
        id="names"
        instanceId="names"
        components={{ Input, DropdownIndicator: null }}
        inputValue={userInputValue}
        autoFocus
        isClearable
        isMulti
        menuIsOpen={false}
        onKeyDown={handleKeyDown}
        onChange={handleNamesChange}
        onInputChange={handleNamesInputChange}
        value={userNames}
        placeholder="1~7자 이내, 문자를 입력하세요 (중복 불가능)"
        theme={selectThema}
      />
    </>
  )
}

export default UserNamesInput
