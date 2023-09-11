import CreatableSelect from "react-select/creatable"
import { FaBan, FaCheck } from "react-icons/fa"
import { KeyboardEvent } from "react"
import { MultiValue, InputProps, components, GroupBase } from "react-select"
import { Option, selectThema } from "@/lib/setting"

interface Props {
  names: readonly Option<string>[]
  numberOfUsers: number
  isRequired: boolean
  handleKeyDown: (event: KeyboardEvent) => void
  handleNamesChange: (newValue: MultiValue<Option<string>>) => void
  handleNamesInputChange: (newValue: string) => void
  inputValue: string
}

function Input(
  props: InputProps<Option<string>, true, GroupBase<Option<string>>>
) {
  return <components.Input minLength={1} maxLength={7} {...props} />
}

function NamesInput({
  names,
  numberOfUsers,
  isRequired,
  handleKeyDown,
  handleNamesChange,
  handleNamesInputChange,
  inputValue,
}: Props) {
  return (
    <>
      <p className="text-xl flex items-center">
        참여자의 이름을 적어주세요 ({names.length}/{numberOfUsers})
        {isRequired ? (
          <FaCheck color="lightgreen" className="ml-2  translate-y-[0.5px]" />
        ) : (
          <FaBan color="red" className="ml-2 translate-y-[0.5px]" />
        )}
      </p>
      <CreatableSelect
        id="names"
        instanceId="names"
        components={{ Input, DropdownIndicator: null }}
        inputValue={inputValue}
        autoFocus
        isClearable
        isMulti
        menuIsOpen={false}
        onKeyDown={handleKeyDown}
        onChange={handleNamesChange}
        onInputChange={handleNamesInputChange}
        value={names}
        placeholder="1~7자 이내, 문자를 입력하세요 (중복 불가능)"
        theme={selectThema}
      />
    </>
  )
}

export default NamesInput
