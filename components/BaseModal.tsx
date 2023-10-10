import { createPortal } from "react-dom"

interface Props {
  onClose: () => void
  children: React.ReactNode
}

function BaseModal({ children, onClose }: Props) {
  return createPortal(
    <div className="bg-red fixed top-0">
      <div>
        <h1>모달창</h1>
        <div onClick={onClose}>X</div>
      </div>
      {children}
    </div>,
    document.getElementById("modal")!
  )
}

export default BaseModal
