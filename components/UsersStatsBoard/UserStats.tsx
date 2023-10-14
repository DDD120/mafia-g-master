import { BsFillPersonFill } from "react-icons/bs"
import { FaRedhat } from "react-icons/fa"
import { FaHandHoldingMedical } from "react-icons/fa6"
import { MdLocalPolice } from "react-icons/md"
import { colors } from "@/lib/colors"
import { rolesToKorean } from "@/lib/toKorean"
import { Roles } from "@/store/types"

interface Props {
  role: Roles
  user: string
  state: "alive" | "died"
}

const iconOptions = (role: Roles, state: "alive" | "died") => {
  return {
    size: 32,
    color: state === "alive" ? colors[role] : colors.gray,
  }
}

const setRoleIcon = (role: Roles, state: "alive" | "died") => {
  const roleIcon = {
    mafia: <FaRedhat {...iconOptions("mafia", state)} />,
    normal: <BsFillPersonFill {...iconOptions("normal", state)} />,
    doctor: <FaHandHoldingMedical {...iconOptions("doctor", state)} />,
    police: <MdLocalPolice {...iconOptions("police", state)} />,
  }
  return roleIcon[role]
}

function UserStats({ state, role, user }: Props) {
  return (
    <div className="flex flex-col items-center w-16">
      <div
        className={`border-2 border-opacity-50 rounded-full w-16 h-16 mb-2 flex justify-center items-center ${
          state === "alive" ? "border-red" : "border-gray"
        }`}
      >
        {setRoleIcon(role, state)}
      </div>
      <p className="font-bold text-center">{user}</p>
      <p className="text-sm">{rolesToKorean[role]}</p>
    </div>
  )
}

export default UserStats
