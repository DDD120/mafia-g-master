import { createMachine } from "xstate"

const mafiaeMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QFsCGAzAlqgdLMALgZgHZQ4Cu+ATrAMQBKA8gDIDKA2gAwC6ioABwD2sTMSEl+IAB6IATABYuOLgoCMANg0AOOQE5tAVm3aFGgDQgAnojUB2BSq7OAzGrna9Cu1zkaAvoGWJEIQcFJoWKhSwqLikkgyiAC0ipY2CKkKQSCR2HiExGQxImKYElKyCGnWiBouOIbOrg5cLoq+OXm4+ESk5FRgtCVx5QmgVXZy6baGak7OamoKcnYaK2tdGPm9ReTUQgA28ImxZRWJVS4rOBqGGnL3XgouepozCPYNj64upko+a6BQJAA */
  id: "mafia",
  initial: "setting",
  predictableActionArguments: true,
  schema: {
    context: {},
  },
  context: {},
  states: {
    setting: {},
  },
})

export default mafiaeMachine
