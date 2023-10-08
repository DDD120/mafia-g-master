import { BsFillPersonFill } from "react-icons/bs"
import { FaRedhat } from "react-icons/fa"
import { FaHandHoldingMedical } from "react-icons/fa6"
import { MdLocalPolice } from "react-icons/md"
import { colors } from "@/lib/colors"
import { Roles } from "@/store/types"
import { userRoleMap } from "@/store/mafia"

interface Props {
  user: string
}

const iconOptions = (role: Roles) => {
  return {
    size: 28,
    color: colors[role],
  }
}

const roleIcon: Record<Roles, React.ReactNode> = {
  mafia: <FaRedhat {...iconOptions("mafia")} />,
  normal: <BsFillPersonFill {...iconOptions("normal")} />,
  doctor: <FaHandHoldingMedical {...iconOptions("doctor")} />,
  police: <MdLocalPolice {...iconOptions("police")} />,
}

function User({ user }: Props) {
  return (
    <div key={user} className="flex flex-col justify-center items-center">
      <div>{roleIcon[userRoleMap.get(user) ?? "normal"]}</div>
      <p>{user}</p>
    </div>
  )
}

export default User
