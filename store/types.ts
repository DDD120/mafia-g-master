export type Roles = "mafia" | "normal" | "doctor" | "police"

export interface Context {
  users: string[]
  roles: Roles[]
  winner: "mafia" | "citizen" | null
  dayNotice: string
  mafia: {
    alive: string[]
    died: string[]
  }
  citizen: {
    normal: {
      alive: string[]
      died: string[]
    }
    doctor: {
      alive: string[]
      died: string[]
    }
    police: {
      alive: string[]
      died: string[]
    }
  }
}

interface PlayingEvent {
  type: "PLAYING"
  users: string[]
  roles: Roles[]
}
interface FirstDayEvent {
  type: "FIRSTDAY"
  mafia: string[]
  normal: string[]
  doctor?: string[]
  police?: string[]
}

interface AfterFirstDayEvent {
  type: "AFTERFIRSTDAY"
  mafiaPointOut: string
  doctorPointOut?: string
}

interface AfterFirstNightEvent {
  type: "AFTERFIRSTNIGHT"
  exiledUser: string
}

export type Events =
  | PlayingEvent
  | FirstDayEvent
  | AfterFirstDayEvent
  | AfterFirstNightEvent