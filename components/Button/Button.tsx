import Link from "next/link"

interface Props {
  children: React.ReactNode
  layoutMode?: "inline" | "fullWidth"
  isActive?: boolean
  to?: string
  onClick?: () => void
}

function Button({
  layoutMode = "fullWidth",
  isActive = true,
  children,
  to,
  onClick,
}: Props) {
  if (to) {
    return (
      <Link
        href={to}
        className={`w-full h-[48px]  text-gray-50 rounded-lg text-xl font-black px-4 transition flex justify-center items-center ${
          isActive
            ? "bg-red hover:brightness-105"
            : "pointer-events-none bg-gray-400"
        } ${layoutMode === "inline" && "max-w-[300px]"}`}
        onClick={onClick}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      disabled={!isActive}
      className={`w-full h-[48px] bg-red text-gray-50 rounded-lg text-xl font-black px-4 transition disabled:bg-gray-400 ${
        isActive && "hover:brightness-105"
      } ${layoutMode === "inline" && "max-w-[300px]"}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
