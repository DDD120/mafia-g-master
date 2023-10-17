import { winnerToKorean } from "@/lib/toKorean"
import FirecrackerLottie from "./FirecrackerLottie"
import { useSpring, animated, easings } from "@react-spring/web"

interface Props {
  winner: "mafia" | "citizen" | null
}

function Congratulation({ winner }: Props) {
  const spring = useSpring({
    from: { opacity: 0, fontSize: "24px" },
    to: { opacity: 1, fontSize: "36px" },
    config: {
      easing: easings.easeOutBack,
      duration: 500,
    },
  })

  return (
    <div className="relative">
      <animated.h1
        style={spring}
        className="mt-16 mb-20 text-center text-4xl font-black"
      >
        {winner && winnerToKorean[winner]}이 <br />
        승리하였습니다!
      </animated.h1>
      <div className="w-full absolute left-1/2 top-[-70px] -translate-x-1/2">
        <FirecrackerLottie />
      </div>
    </div>
  )
}

export default Congratulation
