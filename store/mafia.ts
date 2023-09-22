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
interface FisrtDayEvent {
  type: "FIRSTDAY"
  mafia: string[]
  normal: string[]
  doctor?: string[]
  police?: string[]
}

interface AfterFirstDayEvent {
  type: "AFTERFIRSTDAY"
  maifaPointOut: string
  doctorPointOut?: string
}

interface NightEvent {
  type: "NIGHT"
  exiledUser: string
}

interface AfterFirstNight {
  type: "AFTERFIRSTNIGHT"
}

type Events =
  | PlayingEvent
  | FisrtDayEvent
  | AfterFirstDayEvent
  | NightEvent
  | AfterFirstNight

const mafiaeMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QFsCGAzAlqgdLMALgZgHZQDEACgDICCAmgJIByA4gNoAMAuoqAA4B7WJmKCSfEAA9EARgBssnAGZVqzsoDsAJgCc83QBYANCACeibYcM5rm3bMPbOzzfIAcAX0+m0WXPwANqhmpFA4JJhQABYE5ABijABKAMoAKgAiDFy8SCBCImISeTIIAKzyNk6anDq69rK69aYWCMqNtk1Nlbru2to6yt6+GNg4QSFhEVGx5LTxaQCiSYmpmdk8kgWimOKSpRVVA7V6DU2aLYiGsmU4slZNhpyc8s-ujsMgfmMToWQ4EBCcwWy1W6WYjFYAAk0jktsIdnsSog1DhKmU+ppZJpDO5au5LggbpwVGplJwmu53u95N4fCASIIIHBJN9UPDCrtiqBSgBaeSE3lWT5svCEYhkDmI7nSK7aQnaPE4TTKXRlex45weNwi0YBYJ-KBSor7SyaTRowwYgbY3H4wnyZR3eQu+RlQyPCmcLz00W-KaRGIEY1c01tbS3dGY214zQE8xmmxR05lY7uWm+vXjA0BmYEHBYABOsAIzDzIaRPJRuhJJxrjyeNQ0hOUihw7weqdTsmxml1-mzk3+gdiOAwBDAhfimGLpfLeW2JuRbRVlutWJxsfjrScJPaD2unEMOncqn7Pxz-0BrQECKXVYQKtuKrVHm07XaKoVZVuqox5OUbRKg0IZMwHf0rxCAsZxLDIQgrGVSjjJ0XwqPoP2xZQWycHAKk7PoMXuQxz31IdwmvMd0AnKcYIIOCb3yO9Q2XZDlT-N8MK-BMECeJQXgPeQ4ycUDvCAA */
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
              FIRSTDAY: {
                target: "day.firstDay",
                actions: ["setUserByRole"],
              },
              AFTERFIRSTDAY: {
                target: "day.afterFirstDay",
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
      }),
      exile: assign((context, event) => {
        if (event.type !== "NIGHT") return
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
