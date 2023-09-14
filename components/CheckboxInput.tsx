import { InputHTMLAttributes } from "react"

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  value: string
  id: string
}

function CheckboxInput({ value, id, ...rest }: Props) {
  return (
    <li>
      <label htmlFor={id} className="flex items-center p-2 cursor-pointer">
        <input
          {...rest}
          type="checkbox"
          id={id}
          value={value}
          className="accent-red mr-2 w-4 h-4"
        />
        {value}
      </label>
    </li>
  )
}

export default CheckboxInput
