import { SetStateAction, Dispatch } from "react"

interface Props {
  numberOfUsers: number
  setSelectedPolice: Dispatch<SetStateAction<boolean>>
  setSelectedDoctor: Dispatch<SetStateAction<boolean>>
}

function AddJobSelect({
  numberOfUsers,
  setSelectedDoctor,
  setSelectedPolice,
}: Props) {
  return (
    <div className="flex justify-between">
      <h2 className="text-xl font-bold">추가직업</h2>
      <div className="flex items-center">
        <input
          className="w-4 h-4 mr-2 cursor-pointer accent-red disabled:bg-gray-400"
          type="checkbox"
          name="경찰"
          id="police"
          disabled={numberOfUsers < 6}
          onChange={(e) => setSelectedPolice(e.target.checked)}
        />
        <label className="text-xl cursor-pointer" htmlFor="police">
          경찰
        </label>
        <input
          className="w-4 h-4 mr-2 ml-2 cursor-pointer accent-red disabled:bg-gray-400"
          type="checkbox"
          name="의사"
          id="doctor"
          disabled={numberOfUsers < 8}
          onChange={(e) => setSelectedDoctor(e.target.checked)}
        />
        <label className="text-xl cursor-pointer" htmlFor="doctor">
          의사
        </label>
      </div>
    </div>
  )
}

export default AddJobSelect
