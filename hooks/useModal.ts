import { modalState, initialState } from "@/store/modal"
import { useRecoilState } from "recoil"

function useModal() {
  const [modal, setModal] = useRecoilState(modalState)

  const closeModal = () => {
    setModal(initialState)
  }

  const openModal = () => {
    closeModal()
    setTimeout(() => {
      setModal({
        isOpen: true,
      })
    }, 0)
  }

  return { modal, openModal, closeModal }
}

export default useModal
