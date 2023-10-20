"use client"

import { useMafiaContext } from "@/providers/MafiaProvider"
import { Roles } from "@/store/types"

function useStepTransitions() {
  const { send, stop, start } = useMafiaContext()

  const sendSetting = () => {
    send("SETTING")
  }

  const sendPlaying = (props: { users: string[]; roles: string[] }) => {
    send("PLAYING", props)
  }

  const sendFirstDay = (props: Record<Roles, string[]>) => {
    send("FIRSTDAY", props)
  }

  const sendAfterFirstNight = (props: { exiledUser: string | null }) => {
    send("AFTERFIRSTNIGHT", props)
  }

  const sendAfterFirstDay = (props: {
    mafiaPointOut: string
    doctorPointOut: string | null
  }) => {
    send("AFTERFIRSTDAY", props)
  }

  const sendStart = () => {
    send("START")
  }

  return {
    sendSetting,
    sendPlaying,
    sendFirstDay,
    sendAfterFirstNight,
    sendAfterFirstDay,
    sendStart,
  }
}

export default useStepTransitions
