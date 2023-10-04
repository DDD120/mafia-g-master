"use client"

import { createContext, useContext, useLayoutEffect } from "react"
import { useInterpret, useSelector } from "@xstate/react"
import { InterpreterFrom } from "xstate"
import mafiaMachine from "@/store/mafia"
import { useRouter } from "next/navigation"

interface Props {
  children: React.ReactNode
}

export const MafiaContext = createContext(
  {} as InterpreterFrom<typeof mafiaMachine>
)

export function MafiaProvider({ children }: Props) {
  const mafiaService = useInterpret(mafiaMachine)
  const done = useSelector(mafiaService, (state) => state.done)
  const router = useRouter()

  useLayoutEffect(() => {
    if (done) router.push("/results")
  }, [done, router])

  return (
    <MafiaContext.Provider value={mafiaService}>
      {children}
    </MafiaContext.Provider>
  )
}

export function useMafiaContext() {
  const mafiaServices = useContext(MafiaContext)
  if (!mafiaServices) {
    throw new Error("useMafiaContext should be used within RoomProvider")
  }
  return mafiaServices
}
