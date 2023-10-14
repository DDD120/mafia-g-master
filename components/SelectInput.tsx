import { InputHTMLAttributes } from "react"

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  type: "checkbox" | "radio"
  name: string
  value: string
  id: string
}

function SelectInput({ name, value, type, id, ...rest }: Props) {
  return (
    <li className="list-none">
      <label htmlFor={id} className="flex items-center p-4 cursor-pointer">
        <input
          {...rest}
          name={name}
          type={type}
          id={id}
          value={value}
          className="accent-red mr-4 w-4 h-4"
        />
        {value}
      </label>
    </li>
  )
}

export default SelectInput
