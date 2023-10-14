import { atom } from "recoil"

export const initialState = {
  isOpen: false,
}

export const modalState = atom({
  key: "modal",
  default: initialState,
})
