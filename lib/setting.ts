import { Theme } from "react-select"

export interface Option<T> {
  readonly label: string
  readonly value: T
}

export const NumberOfUsersOptions = [
  { value: 5, label: "5명" },
  { value: 6, label: "6명" },
  { value: 7, label: "7명" },
  { value: 8, label: "8명" },
  { value: 9, label: "9명" },
  { value: 10, label: "10명" },
]

export const createOption = (label: string) => ({
  label,
  value: label,
})

export const selectThema = (theme: Theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: "#FF8A8066",
    primary50: "#FF8A8088",
    primary75: "#FF8A80",
    primary: "#FF5252",
  },
})

type UserNumberByRole = {
  [key: number]: {
    [key: string]: number
  }
}

export const userNumberByRole: UserNumberByRole = {
  5: {
    mafia: 1,
  },
  6: {
    mafia: 1,
    doctor: 1,
  },
  7: {
    mafia: 1,
    doctor: 1,
    police: 1,
  },
  8: {
    mafia: 2,
    doctor: 1,
    police: 1,
  },
  9: {
    mafia: 2,
    doctor: 1,
    police: 1,
  },
  10: {
    mafia: 3,
    doctor: 1,
    police: 1,
  },
}
