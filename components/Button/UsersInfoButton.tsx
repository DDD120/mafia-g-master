"use client"

import useModal from "@/hooks/useModal"
import Button from "./Button"
import UsersInfo from "../UsersInfo"

function UsersInfoButton() {
  const {
    modal: { isOpen },
    openModal,
    closeModal,
  } = useModal()

  return (
    <>
      <Button isActive onClick={openModal}>
        버튼
      </Button>
      {isOpen && <UsersInfo onClose={closeModal} />}
    </>
  )
}

export default UsersInfoButton
