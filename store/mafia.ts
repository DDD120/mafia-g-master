import { createMachine, assign as _assign } from "xstate"
import { assign } from "@xstate/immer"
import { Context, Events, Roles } from "./types"

export const userRoleMap = new Map<string, Roles>()

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
    /** @xstate-layout N4IgpgJg5mDOIC5QFsCGAzAlqgxAZQBUBBAJQIG0AGAXUVAAcB7WTAF00YDs6QAPRACwAmADQgAnogCMANgCcAOgDsSygA4AzDM0CNQmRoC+hsWiyoFsVqgBOrfAFECBAJIA5AOJVaSEExbsXDz8CEJKagqyMjJKQnJqAKyUGgJSYpKhlJQKqdGxWTIJSglyAsamGNiWYKzsnFA4AAoAMkQAmu5eNDz+bBzcviEJohKIMgIJCuMJagYTApThSuUgZlX0ADao4pj1ON49zH1Bg4hqchrKUmpK8lJKusky6WMyUpFCSUJqAhNJiys1hZNttdlAFJxMFAABb2ABiLhIhAAIu0Dr5eoEBqAQn8FJQLrdCnEZJRri8EEopAJlHEhPc1PSNGSjCZVpVgVsdvUIVDYTgiHCCA4SAikQRUW10QwjljgoIEpMCRoicM5KTyaMEGopNkNAlhNSFnoNPrARyFCDueCINsBUKRWLCG4XB4ABIUboY2X9eWhIQ0jRSANyBL6z5yRYaCkGyYJGSfFVqRYG5Lm8wKMCcCD7L0ygK+06hcKRaIxOKJZKpCk60t5a43ORCdRSYxsziMCBwHhAw4Fk44xAAWmeWqHkzkk6n0+nrIqGastlYfeO2L40jDCk0puZTJJ0a1UibW53AlDahuF-TVVgNTqUBXcqLCxkChVZ8SR4M+kWFOb2TkKJGVkDQbgTGRr05UF6kfQtBwQWQIiDEMw2GEpFlHDIJiQ88iiUQl8KESDLS5MFeRhZdvX7NcQnpV9kLPVCIwwilokUG4ki0AlK3GYirTIyEKIULAbCsNw+Uo-NVz9b5siUDRz10YopCPBIKWKJR8VSKk3mDfQHj40ieUE2EFAwVgwBsOFMFE1hxIo2CB3XUJxjfYNGPDdDbhrKQ41yARCnjFNDOgm1tkcmixn0HJKAMdQmwEFQVNYpIphDTRhlAo85BC60FFtcRhJsqxkXCqjpKLGIaRfZlzgDJK0i1eTNPw+51CEOJVCEOd2QzfieQKsz0AsqzitYUqMikp94KqmK4rqxKqUajJ8NfOJ7m6ycBE0ANiKzCAIr9XVTQUb53O200snUVjbjfA0OqrdQ20MIA */
    id: "mafia",
    initial: "start",
    predictableActionArguments: true,
    schema: {
      context: {} as Context,
      events: {} as Events,
    },
    context: initialContext,
    states: {
      start: {
        on: {
          SETTING: {
            target: "setting",
          },
        },
      },
      setting: {
        on: {
          PLAYING: {
            target: "playing",
            actions: ["setUsers", "setRols"],
          },
        },
      },
      playing: {
        always: [{ target: "end", cond: "isEnd", actions: ["setWinner"] }],
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
      end: {},
    },
    on: {
      START: {
        target: "start",
        actions: ["clear"],
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
            for (const user of event.mafia) userRoleMap.set(user, "mafia")
          } else {
            context.citizen[role].alive = event[role]
            for (const user of event[role]) userRoleMap.set(user, role)
          }
        }
      }),
      exile: assign((context, event) => {
        if (event.type !== "AFTERFIRSTNIGHT") return
        const role = userRoleMap.get(event.exiledUser)
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
          const role = userRoleMap.get(event.mafiaPointOut)
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
      clear: _assign(() => {
        userRoleMap.clear()
        return initialContext
      }),
    },
    guards: {
      isEnd: ({ mafia, citizen }) => {
        const { normal, doctor, police } = citizen
        const diedLen =
          mafia.died.length +
          normal.died.length +
          doctor.died.length +
          police.died.length
        if (!diedLen) return false
        const citizensAliveLen =
          normal.alive.length + doctor.alive.length + police.alive.length

        // 살아있는 마피아와 시민의 수가 같아지거나, 살아있는 마피아가 모두 죽은 경우
        return mafia.alive.length >= citizensAliveLen || !mafia.alive.length
      },
    },
  }
)

export default mafiaeMachine
