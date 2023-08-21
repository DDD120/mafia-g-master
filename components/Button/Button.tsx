interface Props {
  isActive: boolean
  onClick: () => void
  children: React.ReactNode
}

function Button({ isActive, onClick, children }: Props) {
  return (
    <button
      disabled={!isActive}
      onClick={onClick}
      className={`max-w-[300px] w-11/12 h-[48px] bg-red text-gray-50 rounded-lg text-xl font-black px-4 transition  disabled:bg-slate-400 ${
        isActive && "hover:brightness-105"
      }`}
    >
      {children}
    </button>
  )
}

export default Button
