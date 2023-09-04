"use client"

import { createContext, useContext } from "react"
import { useInterpret } from "@xstate/react"
import mafiaMachine from "@/store/mafia"

interface Props {
  children: React.ReactNode
}

export const MafiaContext = createContext({})

export function MafiaProvider({ children }: Props) {
  const mafiaService = useInterpret(mafiaMachine)

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
