import { createMachine } from "xstate"
import { assign } from "@xstate/immer"

export type Roles = "mafia" | "normal" | "doctor" | "police"

interface Context {
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
interface FisrtDayEvent {
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

type Events =
  | PlayingEvent
  | FisrtDayEvent
  | AfterFirstDayEvent
  | AfterFirstNightEvent

const userRolMap = new Map<string, Roles>()

const initialContext: Context = {
  users: [],
  roles: [],
  winner: "mafia",
  dayNotice: "",
  mafia: {
    alive: [],
    died: [],
  },
  citizen: {
    normal: {
      alive: [],
      died: [],
    },
    doctor: {
      alive: [],
      died: [],
    },
    police: {
      alive: [],
      died: [],
    },
  },
}

const mafiaeMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QFsCGAzAlqgdLMALgZgHZQDEACgDICCAmgJIByA4gNoAMAuoqAA4B7WJmKCSfEAA9EARgBssnAGZVygCwBWRQA4A7HuU6ANCACeiAEybOOdQvnz18o5b2WdAX0+m0WXPwANqhmpBRcvEggQiJiElEyCLKcnMo4nJqWnFqyOvLu6pamFgiW8po4OgCcmjr26lVONsrevhjYOEEhYTgkmFAAFgTkAGKMAEoAygAqACIMEZIxopjikona6nZussnyVVV6nI7FiMqyVXYHjSnKhrnyrSB+HV2hZL39Q+S0I9MAouMxlM5gseEthCs1glEJttnpdscDkcTuZEPYKrJLA0qspaud8honi8AsF3lAcBAQj8-oDgTNmIxWAAJaaLKLLOLrM6qHBNHQ2TRaLR6RqnJI2FSqDzyMpaDLubw+EAkQQQOCSEkQ2KreKgRIAWnk4oNljS1wtloOLWVJLwhGIZG1UL10nRRTRpTyOCOOmUbhunAFzmJ7VJ3SdHMhXJhpQMfK0Aoyws0ouNnpcOAcTnO-usMs0of8nTJPT6gwIzpj+rO1gTtUFKbT4rcWyaBj0zRctyLr1LH3LQxwWAATrACMwvpWozroTWEMoqrZOO4quo-epF5vNOLlIpKlj1Hp5DpktjLIde+HyZ8KzgMAQwCORpgxxOp1XddyF4Z60mhQBzaeoUtjnNiVS7JosgaLIV4lhGFJUiUAjRl+saGBUhiNLksiCpwVQmJ61gVIuqZHGoQbJDabTFm8PRIcOr7jrMISfnOboIHofo+ouui4Rk+GESUGiWDg2jYvsLiNGucF0R8DEPk+L5vixyHRKh7GJFxaRYXxeEEeK6icEoxzYn6BErlUlhwRA4hgGxrobHo4qdkonYpDsF7GYoSqeEAA */
    id: "mafia",
    initial: "setting",
    predictableActionArguments: true,
    schema: {
      context: {} as Context,
      events: {} as Events,
    },
    context: initialContext,
    states: {
      setting: {
        on: {
          PLAYING: {
            target: "playing",
            actions: ["setUsers", "setRols"],
          },
        },
      },
      playing: {
        always: [{ target: "done", cond: "isDone", actions: ["setWinner"] }],
        initial: "night",
        states: {
          night: {
            on: {
              FIRSTDAY: {
                target: "day.firstDay",
                actions: ["setUserByRole"],
              },
              AFTERFIRSTDAY: {
                target: "day.afterFirstDay",
                actions: ["pointOut"],
              },
            },
            initial: "firstNight",
            states: {
              firstNight: {},
              afterFirstNight: {},
            },
          },
          day: {
            on: {
              AFTERFIRSTNIGHT: {
                target: "night.afterFirstNight",
                actions: ["exile"],
              },
            },
            states: {
              firstDay: {},
              afterFirstDay: {},
            },
          },
        },
      },
      done: {
        type: "final",
      },
    },
  },
  {
    actions: {
      setUsers: assign((context, event) => {
        console.log(event)
        if (event.type !== "PLAYING") return
        context.users = event.users
      }),
      setRols: assign((context, event) => {
        if (event.type !== "PLAYING") return
        context.roles = event.roles
      }),
      setUserByRole: assign((context, event) => {
        if (event.type !== "FIRSTDAY") return
        context.mafia.alive = event.mafia
        context.citizen.normal.alive = event.normal
        context.citizen.doctor.alive = event.doctor ?? []
        context.citizen.police.alive = event.police ?? []
        for (let user of event.mafia) userRolMap.set(user, "mafia")
        for (let user of event.normal) userRolMap.set(user, "normal")
        if (event.doctor)
          for (let user of event.doctor) userRolMap.set(user, "doctor")
        if (event.police)
          for (let user of event.police) userRolMap.set(user, "police")
        console.log(userRolMap)
      }),
      exile: assign((context, event) => {
        if (event.type !== "AFTERFIRSTNIGHT") return
        const role = userRolMap.get(event.exiledUser)
        if (!role) return

        if (role === "mafia") {
          context.mafia.alive = context.mafia.alive.filter(
            (user) => user !== event.exiledUser
          )
          context.mafia.died.push(event.exiledUser)
        } else {
          context.citizen[role].alive = context.citizen[role].alive.filter(
            (user) => user !== event.exiledUser
          )
          context.citizen[role].died.push(event.exiledUser)
        }
      }),
      pointOut: assign((context, event) => {
        if (event.type !== "AFTERFIRSTDAY") return
        if (event.mafiaPointOut === event.doctorPointOut) {
          context.dayNotice = "이번 밤은 아무도 살해되지 않았습니다."
        } else {
          const role = userRolMap.get(event.mafiaPointOut)
          if (!role) return

          if (role === "mafia") {
            context.mafia.alive = context.mafia.alive.filter(
              (user) => user !== event.mafiaPointOut
            )
            context.mafia.died.push(event.mafiaPointOut)
          } else {
            context.citizen[role].alive = context.citizen[role].alive.filter(
              (user) => user !== event.mafiaPointOut
            )
            context.citizen[role].died.push(event.mafiaPointOut)
          }
          context.dayNotice = `마피아에 의해 시민 ${event.mafiaPointOut}님이 살해되었습니다.`
        }
      }),
      setWinner: assign((context) => {
        context.winner = context.mafia.alive.length ? "mafia" : "citizen"
      }),
    },
    guards: {
      isDone: (context, event) => {
        const diedLength =
          context.mafia.died.length +
          context.citizen.normal.died.length +
          context.citizen.doctor.died.length +
          context.citizen.police.died.length
        if (!diedLength) return false
        const citizens =
          context.citizen.normal.alive.length +
          context.citizen.doctor.alive.length +
          context.citizen.police.alive.length
        return (
          context.mafia.alive.length === citizens || !context.mafia.alive.length
        )
      },
    },
  }
)

export default mafiaeMachine
