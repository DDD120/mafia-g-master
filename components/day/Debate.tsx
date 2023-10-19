"use client"

import UsersStatsBoardButton from "../UsersStatsBoard/UsersStatsBoardButton"
import Script from "../Script"
import Button from "../button/Button"
import CountdownTimer from "./CountdownTimer"
import Notice from "./Notice"
import useButton from "@/hooks/useButton"
import MainContentLayout from "../layout/MainContentLayout"

interface Props {
  days: number
}

function Debate({ days }: Props) {
  const { isLoading, onButtonClick } = useButton()

  return (
    <>
      <MainContentLayout isLoading={isLoading}>
        <div className="h-full flex flex-col">
          <Script>
            낮이 되었습니다.
            <Notice />
            <br /> 모두 눈을 뜨고 토론을 통해 추방할 사람을 결정하세요!
          </Script>
          <CountdownTimer />
        </div>
      </MainContentLayout>
      <div className="shrink-0 flex gap-2">
        <div className="flex justify-center items-center">
          <UsersStatsBoardButton />
        </div>
        <Button
          className="flex-1"
          onClick={() => onButtonClick(() => {})}
          isActive
          to={`/day/${days}?step=exile`}
        >
          토론 완료
        </Button>
      </div>
    </>
  )
}

export default Debate
