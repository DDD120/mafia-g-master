import { ChangeEvent } from "react"

interface Props {
  name: string
  id: string
  disabled: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

function AddJobInput({ name, id, onChange, disabled }: Props) {
  return (
    <div>
      <input
        className="w-4 h-4 mr-2 cursor-pointer accent-red disabled:bg-gray-400"
        type="checkbox"
        name={name}
        id={id}
        disabled={disabled}
        onChange={onChange}
      />
      <label className="text-xl cursor-pointer" htmlFor={id}>
        {name}
      </label>
    </div>
  )
}

export default AddJobInput
