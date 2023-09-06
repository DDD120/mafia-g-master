import { createMachine, assign } from "xstate"

type Rols = "mafia" | "normal" | "doctor" | "police"

interface Context {
  users: string[]
  rols: Rols[]
}

type Events = {
  type: "STEP2"
  users: string[]
  rols: Rols[]
}

const mafiaeMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QFsCGAzAlqgdLMALgZgHZR4FgAOAjAMQDKAKgKIAKATANoAMAuolBUA9rEzFhJQSAAeiDgBYeOHgpoA2ABzqAzB0U0ArAE4ANCACeiGpoDsKno57HnJjps0Bfb+ZLCIcNJoWKjSImISUkiyiAC0iuZWCPEKDk7pGbY+IMHYeITEZGGi4piS0nIICZaIujiG6YYKHDqGHCZZnua5uPhEpOSwlLTFEWVRoJW2HInWDTjGi4uazYouxtk9+f1kFNQco6Xl0ZWtyra2PJomOjy2xoY0swg26jjtjjQ07jo6xhw0bzeIA */
    id: "mafia",
    initial: "setting",
    predictableActionArguments: true,
    schema: {
      context: {} as Context,
      events: {} as Events,
    },
    context: {
      users: [],
      rols: [],
    },
    states: {
      setting: {
        initial: "step1",
        states: {
          step1: {
            on: {
              STEP2: {
                target: "step2",
                actions: ["setUsers", "setRols"],
              },
            },
          },
          step2: {
            type: "final",
          },
        },
      },
    },
  },
  {
    actions: {
      setUsers: assign({
        users: (context, event) => event.users,
      }),
      setRols: assign({
        rols: (context, event) => event.rols,
      }),
    },
  }
)

export default mafiaeMachine