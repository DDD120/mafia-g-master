export type Roles = "mafia" | "normal" | "doctor" | "police"
export type CitizenRoles = Exclude<Roles, "mafia">

export type Citizen = {
  [key in Exclude<Roles, "mafia">]: {
    alive: string[]
    died: string[]
  }
}

export interface Context {
  users: string[]
  roles: Roles[]
  winner: "mafia" | "citizen" | null
  dayNotice: string
  mafia: {
    alive: string[]
    died: string[]
  }
  citizen: Citizen
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
