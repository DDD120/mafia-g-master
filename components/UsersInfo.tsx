import BaseModal from "./BaseModal"

interface Props {
  onClose: () => void
}

function UsersInfo({ onClose }: Props) {
  return <BaseModal onClose={onClose}>유저정보</BaseModal>
}

export default UsersInfo
