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
    /** @xstate-layout N4IgpgJg5mDOIC5QFsCGAzAlqgxAZQBUBBAJQIG0AGAXUVAAcB7WTAF00YDs6QAPRACwAmADQgAnogAcARgB0MgGzKA7JUqKVAZiGKpigL4GxaLKjmxWqAE6t8AUQIEAkgDkA4lVpIQTFuy4efgQhNTkAVnVKGXCATh0BcIEVATFJBBlKITktWPCpLSlwlRUhIS0VGSMTDGwLMFZ2TigcAAUAGSIATTdPGh4-Ng5uH2Dw0QlEJJU5bVjFShVFYoFYjWqQUzr6ABtUcUxmnC8B5iHA0elYqVmZKRLFIXCVorSpxQEI8Zkf5UoKwobLbmXb7Q5QOScTBQAAWrDkWGsllc0LhOAAYs4SIQACLdE4+QYBEagYICBZySjxEoxASUAr0xRvBALT5PdR0rTqJQxIG1EF7A7NSGo+EYVhgazozBI1go2F2Ijogj2EiY7EEPFdAkMM7EoKCClUiqVJL0rn6ZmKWKxOT3SJlGRCeYxLR8sxyUFCiEQfY4JUqtVYwiuZzuAASFH6hL1wwNISEny0Tsi8RkKWS6eZiTZsSUUkoq1KicLRmMIE4jAgcB4wNO-jjlwQAFomZMW+E5Dbuz3e27y8CLFZbPXziS+IgYvIlKpchm9FpwszMtkpHkCkUSmUKlUB-z6o1waP9U3cjc1AV8mU9Gvycusnb14VisWd+7toKjzGGxdSZO9DkKbGumAiZiozJaJoCjspkwjXLEpTvgKYLClCCrHo2f4hEogHsmmGaVOB7YvnIoT0pEmhFFSQhIZ6n6oaKCIysiooYb+E4IFy2QzposRkbIxRaFaHxyAIFTjIsiQFIou41B6XrgiKCpyOKkrSrK8pwmx47BLoSZAfhoGEcyxZduJJZSPoToqLRCnCr66S6j+OmIIoyaiRoQhFACMgITIzIkfxFEqFRfG2fRPr7Exso4vs2nxrxHmPN52i+ZUwmfGJKgSSk+SQbJmz7nZkXiCp6ASlKzGsLFjm+LG7HBIldLJeEPl+SZZRmdlFlWaEtFgJwEDxU2mSLnIMnkr5XJGa8xFSJ8-xOpoTx8c8ZYGEAA */
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
            initial: "firstNight",
            states: {
              firstNight: {
                on: {
                  FIRSTDAY: {
                    target: "#mafia.playing.day.firstDay",
                    actions: ["setUserByRole"],
                  },
                },
              },
              afterFirstNight: {
                on: {
                  AFTERFIRSTDAY: {
                    target: "#mafia.playing.day.afterFirstDay",
                    actions: ["pointOut"],
                  },
                },
              },
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
