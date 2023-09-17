"use client"

import useAliveUsers from "@/hooks/useAliveUsers"
import Script from "../Script"
import Button from "../button/Button"
import CheckboxInput from "../CheckboxInput"

function Exile() {
  const aliveUsers = useAliveUsers()
  console.log(aliveUsers)
  return (
    <>
      <div>
        <Script>추방할 사람을 선택하세요.</Script>
        <div className="mt-2">
          <ul>
            {aliveUsers.map((user) => (
              <CheckboxInput key={user} id={user} value={user} />
            ))}
          </ul>
        </div>
      </div>
      <Button>추방 선택 완료</Button>
    </>
  )
}

export default Exile
