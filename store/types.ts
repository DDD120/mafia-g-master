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

interface SettingEvent {
  type: "SETTING"
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
  doctor: string[]
  police: string[]
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

interface StartEvent {
  type: "START"
}

export type Events =
  | SettingEvent
  | PlayingEvent
  | FirstDayEvent
  | AfterFirstDayEvent
  | AfterFirstNightEvent
  | StartEvent
