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

interface SettingEvent {
  type: "SETTING"
}

type Events =
  | PlayingEvent
  | FisrtDayEvent
  | AfterFirstDayEvent
  | AfterFirstNightEvent
  | SettingEvent

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
    /** @xstate-layout N4IgpgJg5mDOIC5QFsCGAzAlqgdLMALgZgHZQDEACgDICCAmgJIByA4gNoAMAuoqAA4B7WJmKCSfEAA9EARgCcAdhwBmNSoBMADnkAWLRt27ZAGhABPRBoCsnHMYBsixdZWcND3Q9kBfH2bQsXH4AG1RzUigcEkwoAAsCcgAxRgAlAGUAFQARBi5eJBAhETEJQpkEB047XQ1FWQd5atktI0UzSwQVBRxbTllZNTr9FV0-AIxsHFDwyOjYhPJaJMyAUVSUjJy8nkli0UxxSQqqmrqGpv7W3XaLRGNrHFkbQdlOayb5VvGQQKmZiJkHAQcJLFbrTZZZiMVgACUy+T2wgOR3KiBUjRwnmsWgcDlcp28t06slsqnU8iU1gcKi0Hw0fn8IBIgggcEkf1QSJKhzKoAqAFoHB1EALDDhqpKpVLZGMmZy8IRiGRuSi+dJ7hoRQhtA4cIpONcWvolKSfgqAZFVaVjujBljdDi8QTqkTtTSnniHLiWtZtK0GfLJsEwoCojF4gRrbzbV1vA6nfiMa7ZMSrIpdAmmriNBoFKNzcHpqG5hGEjgsAAnWAEZgLKOFfY2tEIWp6ziKDR6Ko4+TWay6bUY2Q4LTPBy5-NdzjyQtBYuzIFlgg4DAEMCVpKYau1+vR1H8+4zhO4pOE1Pa2p2boeFwD6ydrTfIPzy1AkGdATI5uHhDOEeKCofYGJwTiDPIKjajYjxAR8VQYjogGGnO-wlu+4QVtuNbZOE+7qhUY7yPqsEgWBQGQXcXS1L0E4Tg0OIdrKDgoSGi5RB+q7oOum5YQQOGfkU34xi2hHEcBGigfU5GXv0Eq0bmj7WG8KgscC4hgHhsa1FBNj6oaSlKG4qYuMxjJAA */
    id: "mafia",
    initial: "playing", // temp
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
        on: {
          SETTING: {
            target: "setting",
            actions: ["reset"],
          },
        },
        type: "final",
      },
    },
  },
  {
    actions: {
      setUsers: assign((context, event) => {
        if (event.type !== "PLAYING") return
        context.users = event.users
      }),
      setRols: assign((context, event) => {
        if (event.type !== "PLAYING") return
        context.users = event.roles
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
      reset: assign((context) => {
        context = initialContext
      }),
    },
    guards: {
      isDone: (context, event) => {
        const citizens =
          context.citizen.normal.alive.length +
          context.citizen.doctor.alive.length +
          context.citizen.police.alive.length
        return context.mafia.alive.length === citizens
      },
    },
  }
)

export default mafiaeMachine
