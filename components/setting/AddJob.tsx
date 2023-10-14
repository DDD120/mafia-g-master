import { SetStateAction, Dispatch } from "react"
import AddJobInput from "./AddJobInput"

interface Props {
  numberOfUsers: number
  setSelectedPolice: Dispatch<SetStateAction<boolean>>
  setSelectedDoctor: Dispatch<SetStateAction<boolean>>
}

function AddJob({
  numberOfUsers,
  setSelectedDoctor,
  setSelectedPolice,
}: Props) {
  return (
    <div className="flex justify-between">
      <h2 className="text-xl font-bold">추가직업</h2>
      <div className="flex items-center gap-2">
        <AddJobInput
          name="경찰"
          id="police"
          disabled={numberOfUsers < 6}
          onChange={(e) => setSelectedPolice(e.target.checked)}
        />
        <AddJobInput
          name="의사"
          id="doctor"
          disabled={numberOfUsers < 8}
          onChange={(e) => setSelectedDoctor(e.target.checked)}
        />
      </div>
    </div>
  )
}

export default AddJob
