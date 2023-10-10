import Script from "../Script"
import Button from "../button/Button"
import UsersInfoButton from "../button/UsersInfoButton"
import CountdownTimer from "./CountdownTimer"
import Notice from "./Notice"

interface Props {
  days: number
}

function Debate({ days }: Props) {
  return (
    <>
      <div className="h-full flex flex-col">
        <Script>
          낮이 되었습니다.
          <Notice />
          <br /> 모두 눈을 뜨고 토론을 통해 추방할 사람을 결정하세요!
        </Script>
        <CountdownTimer />
      </div>
      <div className="shrink-0">
        <UsersInfoButton />
        <Button isActive to={`/day/${days}?step=exile`}>
          토론 완료
        </Button>
      </div>
    </>
  )
}

export default Debate
