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
interface DAYEvent {
  type: "DAY"
  mafia: string[]
  normal: string[]
  doctor?: string[]
  police?: string[]
}

type Events = PlayingEvent | DAYEvent

const mafiaeMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QFsCGAzAlqgdLMALgZgHZQDEACgDICCAmgJIByA4gNoAMAuoqAA4B7WJmKCSfEAA9EARgBssnAGZVygEwBWbetnqALLIA0IAJ5yA7PpwWAnAv23lFzeuWH5AX08m0WXPwANqimpFA4JJhQABYEOFgATrAE5ABijABKAMoAKrSpOQCiGVy8SCBCImIS5TII+hbqOLZ2svrqABxanJy28vIm5gjq6pw4jra2XZryjpyyHRbePiAkghBwkn7YkpWimOKSdQC0A2aIx4bNkze3Nx1eK9u4+ERhu8L7h7WI7YOIuiUBkmFgeHU4FmUHWh3l8GGwOCCIXe5T21SOAM0Fhws004OUC3sdk4mn+9U0OE0PR6emU800ylssJAz0RwVCZAiUViHyqBxqoDqdIpuPxhNkxNJ5wQsg01xuhJc6lBHWZrKRHPCkRicUSyV5XwF0kQygZOP0eM4BI6RNsJLJIzGt2msztCyWT3hAXZYS5OvimCSBFo6AIYASBvRPwQ8i0KhcnE6C1G+itDtG8qmWld80Waq9bORnIgIUj-IxCA0ynNluttvt0oJTtustTmjdj28QA */
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
                actions: ["setUserByRole"],
              },
            },
          },
          day: {},
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
    },
  }
)

export default mafiaeMachine
