"use client"

import useModal from "@/hooks/useModal"

import { BsClipboardPulse } from "react-icons/bs"
import Button from "../button/Button"
import UsersStatsBoard from "./UsersStatsBoard"

function PlayerStatsBoardoButton() {
  const {
    modal: { isOpen },
    openModal,
    closeModal,
  } = useModal()

  return (
    <>
      <Button isActive onClick={openModal}>
        <BsClipboardPulse size={24} />
      </Button>
      {isOpen && <UsersStatsBoard onClose={closeModal} />}
    </>
  )
}

export default PlayerStatsBoardoButton
