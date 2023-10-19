import { colors } from "@/lib/colors"
import BeatLoader from "react-spinners/BeatLoader"

interface Props {
  children: React.ReactNode
  isLoading: boolean
}

function MainContentLayout({ children, isLoading }: Props) {
  return (
    <div className="h-full scrollbar-hide overflow-y-auto sm:scrollbar-default sm:pr-2">
      {isLoading ? (
        <div className="h-full flex justify-center items-center">
          <BeatLoader color={colors.red} aria-label="Loading Spinner" />
        </div>
      ) : (
        children
      )}
    </div>
  )
}

export default MainContentLayout
