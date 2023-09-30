import { createMachine } from "xstate"
import { assign } from "@xstate/immer"
import { Context, Events, Roles } from "./types"

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
        if (event.type !== "PLAYING") return
        context.users = event.users
      }),
      setRols: assign((context, event) => {
        if (event.type !== "PLAYING") return
        context.roles = event.roles
      }),
      setUserByRole: assign((context, event) => {
        if (event.type !== "FIRSTDAY") return
        for (const role of context.roles) {
          if (role === "mafia") {
            context.mafia.alive = event.mafia
            for (const user of event.mafia) userRolMap.set(user, "mafia")
          } else {
            context.citizen[role].alive = event[role] ?? []
            for (const user of event[role] ?? []) userRolMap.set(user, role)
          }
        }
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
      isDone: ({ mafia, citizen }) => {
        const diedLen =
          mafia.died.length +
          citizen.normal.died.length +
          citizen.doctor.died.length +
          citizen.police.died.length
        if (!diedLen) return false
        const citizensAliveLen =
          citizen.normal.alive.length +
          citizen.doctor.alive.length +
          citizen.police.alive.length

        // 살아있는 마피아와 시민의 수가 같아지거나, 살아있는 마피아가 모두 죽은 경우
        return mafia.alive.length === citizensAliveLen || !mafia.alive.length
      },
    },
  }
)

export default mafiaeMachine
