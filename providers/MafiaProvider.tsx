"use client"

import { createContext, useContext, useEffect, useLayoutEffect } from "react"
import { useInterpret, useSelector } from "@xstate/react"
import { InterpreterFrom } from "xstate"
import mafiaMachine from "@/store/mafia"
import { usePathname, useRouter } from "next/navigation"
import useStepTransitions from "@/hooks/useStepTransitions"

interface Props {
  children: React.ReactNode
}

export const MafiaContext = createContext(
  {} as InterpreterFrom<typeof mafiaMachine>
)

export function MafiaProvider({ children }: Props) {
  const mafiaService = useInterpret(mafiaMachine)
  const matches = useSelector(mafiaService, (state) => state.matches)
  const router = useRouter()
  const path = usePathname()

  useLayoutEffect(() => {
    if (matches("end")) router.push("/results")
    history.replaceState(null, "", "/")
  }, [router, path, matches])

  useEffect(() => {
    const reset = () => {
      window.addEventListener("popstate", () => {
        mafiaService.send("START")
      })
    }
    reset()

    return () => {
      window.removeEventListener("popstate", reset)
    }
  }, [mafiaService])

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
