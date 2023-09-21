import { createMachine } from "xstate"
import { assign } from "@xstate/immer"

type Roles = "mafia" | "normal" | "doctor" | "police"

interface Context {
  users: string[]
  roles: Roles[]
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
interface DayEvent {
  type: "DAY"
  mafia: string[]
  normal: string[]
  doctor?: string[]
  police?: string[]
}

interface NightEvent {
  type: "AFTERFISRT"
  exiledUser: string
}

type Events = PlayingEvent | DayEvent | NightEvent

const mafiaeMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QFsCGAzAlqgdLMALgZgHZQDEACgDICCAmgJIByA4gNoAMAuoqAA4B7WJmKCSfEAA9EARgBssnAGZVqgKwAmeQHZ1+zjoA0IAJ6JtOnDoAcs7QBZ1yzsp075AX08m0WXPwANqimpFA4JJhQABYE5AAiDFy8SCBCImISqTII8pyaOJqaAJxF6vLqTjqa6ibmCMoOBZzymg42drLFLXrq3r4Y2DhBIWE4ECHktABiACoAogBK04wAyouzyZLpopjikjlqOPJONsrlspycDg6NdXLqnCpqmueV6rbFNt4+ICSCEDgkj82G2wl2+2yiAAtPJ7ghoW0cFcUai0Tp+iAQbh8EQwmCMnssqAck14S4HMjqsVZLd7Hl5F5ftjhsFQmQCRDidILNVjqdzoorjc7mZEPJlDgFIydJwafSMczBgE2WNIjECJzMgdEMpNE8TuozhdhbcHPDNDpKYazjplGdZPbGZiWSN2eF1bEcFgAE6wTWpHbaqENeQ2flGwWXa5m+FNJ7KewOYr2hz2WQ6WQu5Ws0ZkCJRL0YAhgH3TTB+gMCcHBkm6u0R41CmOi+rKRQ4Oxtbr5Q2GbP+XPu8YhLVEnW5YrqTtqZTFRRTuU2eGyOw4Bw6GnyYo3dpnNoDoZutWFgg4Yul8uViJgADuAAJ-agS-fZGPIXWEE0lDao6bW4gNzhom3apummY-J4QA */
    id: "mafia",
    initial: "playing", // temp
    predictableActionArguments: true,
    schema: {
      context: {} as Context,
      events: {} as Events,
    },
    context: {
      users: [
        "사용자1",
        "사용자2",
        "사용자3",
        "사용자4",
        "사용자5",
        "사용자6",
        "사용자7",
      ], //temp
      roles: ["mafia", "doctor", "police"], //temp
      mafia: {
        alive: ["사용자1"],
        died: [],
      },
      citizen: {
        normal: {
          alive: ["사용자2", "사용자3", "사용자4", "사용자5"],
          died: [],
        },
        doctor: {
          alive: ["사용자6"],
          died: [],
        },
        police: {
          alive: ["사용자7"],
          died: [],
        },
      },
    },
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
        initial: "night",
        states: {
          night: {
            on: {
              DAY: {
                target: "day",
              },
            },
            initial: "first",
            states: {
              first: {
                exit: ["setUserByRole"],
              },
              afterFirst: {},
            },
          },
          day: {
            on: {
              AFTERFISRT: {
                target: "night.afterFirst",
                actions: ["exile"],
              },
            },
          },
        },
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
        if (event.type !== "DAY") return
        context.mafia.alive = event.mafia
        context.citizen.normal.alive = event.normal
        context.citizen.doctor.alive = event.doctor ?? []
        context.citizen.police.alive = event.police ?? []
      }),
      exile: assign((context, event) => {
        if (event.type !== "AFTERFISRT") return
        const mafia = context.mafia.alive.indexOf(event.exiledUser)
        const normal = context.citizen.normal.alive.indexOf(event.exiledUser)
        const doctor = context.citizen.doctor.alive.indexOf(event.exiledUser)
        const police = context.citizen.police.alive.indexOf(event.exiledUser)
        if (mafia > -1) {
          context.mafia.alive = context.mafia.alive.filter(
            (user) => user !== event.exiledUser
          )
          context.mafia.died.push(event.exiledUser)
        }
        if (normal > -1) {
          context.citizen.normal.alive = context.citizen.normal.alive.filter(
            (user) => user !== event.exiledUser
          )
          context.citizen.normal.died.push(event.exiledUser)
        }
        if (doctor > -1) {
          context.citizen.doctor.alive = context.citizen.doctor.alive.filter(
            (user) => user !== event.exiledUser
          )
          context.citizen.doctor.died.push(event.exiledUser)
        }
        if (police > -1) {
          context.citizen.police.alive = context.citizen.police.alive.filter(
            (user) => user !== event.exiledUser
          )
          context.citizen.police.died.push(event.exiledUser)
        }
      }),
    },
  }
)

export default mafiaeMachine
