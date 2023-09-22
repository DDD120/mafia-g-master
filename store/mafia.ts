import { createMachine } from "xstate"
import { assign } from "@xstate/immer"

type Roles = "mafia" | "normal" | "doctor" | "police"

interface Context {
  users: string[]
  roles: Roles[]
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

interface AfterFirstNight {
  type: "AFTERFIRSTNIGHT"
  exiledUser: string
}

type Events =
  | PlayingEvent
  | FisrtDayEvent
  | AfterFirstDayEvent
  | AfterFirstNight

const userRolMap = new Map<string, Roles>()

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
    },
  }
)

export default mafiaeMachine
