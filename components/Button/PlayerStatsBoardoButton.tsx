"use client"

import useModal from "@/hooks/useModal"
import Button from "./Button"
import PlayerStatsBoard from "../PlayerStatsBoard"

function PlayerStatsBoardoButton() {
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
      {isOpen && <PlayerStatsBoard onClose={closeModal} />}
    </>
  )
}

export default PlayerStatsBoardoButton
