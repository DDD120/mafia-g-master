import BaseModal from "./BaseModal"

interface Props {
  onClose: () => void
}

function PlayerStatsBoard({ onClose }: Props) {
  return (
    <BaseModal title="플레이어 상태 보드 " onClose={onClose}>
      플레이어 상태 보드
    </BaseModal>
  )
}

export default PlayerStatsBoard
