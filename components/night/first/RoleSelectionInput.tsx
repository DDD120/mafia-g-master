import Script from "@/components/Script"
import { userNumberByRole } from "@/lib/setting"
import { ChangeEvent } from "react"
import { FaBan, FaCheck } from "react-icons/fa"

interface Props {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  selectedUsers: string[]
  usersByRole: string[]
  users: string[]
  role: string
  includeName: boolean
  children: React.ReactNode
}

const roles: Record<string, string> = {
  mafia: "마피아",
  doctor: "의사",
  police: "경찰",
}

function RoleSelectionInput({
  onChange,
  selectedUsers,
  includeName,
  usersByRole,
  users,
  role,
  children,
}: Props) {
  const currentUser = usersByRole.length
  const personnel = userNumberByRole[users.length]?.[role]

  return (
    <div>
      <Script includeName={includeName}>{children}</Script>
      <div className="mt-2">
        <h3 className="font-bold text-lg flex items-center">
          {roles[role]} 선정 ({currentUser}/{personnel})
          {currentUser < personnel ? (
            <FaBan color="red" className="ml-2 translate-y-[2px]" />
          ) : (
            <FaCheck color="lightgreen" className="ml-2  translate-y-[0.5px]" />
          )}
        </h3>
        <p>
          {users.map((user) => (
            <label
              key={user}
              htmlFor={`${role}-${user}`}
              className="flex items-center p-2 cursor-pointer"
            >
              <input
                disabled={
                  (selectedUsers.includes(user) &&
                    !usersByRole.includes(user)) ||
                  (!usersByRole.includes(user) && currentUser >= personnel)
                }
                onChange={onChange}
                type="checkbox"
                id={`${role}-${user}`}
                value={user}
                className="accent-red mr-2 w-4 h-4"
              />
              {user}
            </label>
          ))}
        </p>
      </div>
    </div>
  )
}

export default RoleSelectionInput
