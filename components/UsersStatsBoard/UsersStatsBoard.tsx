"use client"

import { useMafiaContext } from "@/providers/MafiaProvider"
import { useSelector } from "@xstate/react"
import BasicModal from "../BasicModal"
import UserStats from "./UserStats"
import useAliveUsers from "@/hooks/useAliveUsers"

interface Props {
  onClose: () => void
}

function UsersStatsBoard({ onClose }: Props) {
  const mafiaServices = useMafiaContext()
  const { mafia, citizen, users } = useSelector(
    mafiaServices,
    (state) => state.context
  )
  const { aliveUsers } = useAliveUsers()
  const diedLength = users.length - aliveUsers.length

  return (
    <BasicModal title="플레이어 상태 보드" onClose={onClose}>
      <h2 className="font-bold text-xl">생존 플레이어</h2>
      <div className="flex flex-wrap gap-4 my-4">
        {mafia.alive.map((user) => (
          <UserStats key={user} role="mafia" user={user} state="alive" />
        ))}
        {citizen.normal.alive.map((user) => (
          <UserStats key={user} role="normal" user={user} state="alive" />
        ))}
        {citizen.doctor.alive.map((user) => (
          <UserStats key={user} role="doctor" user={user} state="alive" />
        ))}
        {citizen.police.alive.map((user) => (
          <UserStats key={user} role="police" user={user} state="alive" />
        ))}
      </div>
      {diedLength !== 0 && (
        <>
          <h2 className="font-bold text-xl">추방 OR 죽음 플레이어</h2>
          <div className="flex flex-wrap gap-4 my-4">
            {mafia.died.map((user) => (
              <UserStats key={user} role="mafia" user={user} state="died" />
            ))}
            {citizen.normal.died.map((user) => (
              <UserStats key={user} role="normal" user={user} state="died" />
            ))}
            {citizen.doctor.died.map((user) => (
              <UserStats key={user} role="doctor" user={user} state="died" />
            ))}
            {citizen.police.died.map((user) => (
              <UserStats key={user} role="police" user={user} state="died" />
            ))}
          </div>
        </>
      )}
    </BasicModal>
  )
}

export default UsersStatsBoard
