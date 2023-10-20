import Link from "next/link"
import { twMerge } from "tailwind-merge"

interface Props {
  children: React.ReactNode
  layoutMode?: "inline" | "fullWidth"
  isActive?: boolean
  to?: string
  className?: string
  replace?: boolean
  onClick?: () => void
}

function Button({
  layoutMode = "fullWidth",
  isActive = false,
  children,
  to,
  className,
  replace = true,
  onClick,
}: Props) {
  if (to) {
    return (
      <Link
        href={to}
        className={twMerge(
          "w-full h-[48px]  text-gray-50 rounded-lg text-xl font-black px-4 transition flex justify-center items-center",
          isActive
            ? "bg-red hover:brightness-105"
            : "pointer-events-none bg-zinc-400",
          layoutMode === "inline" && "max-w-[300px]",
          className
        )}
        onClick={onClick}
        replace={replace}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      disabled={!isActive}
      className={twMerge(
        "w-full h-[48px] bg-red text-gray-50 rounded-lg text-xl font-black px-4 transition disabled:bg-zinc-400",
        isActive && "hover:brightness-105",
        layoutMode === "inline" && "max-w-[300px]",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
