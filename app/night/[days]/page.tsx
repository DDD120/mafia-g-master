import BasicLayout from "@/components/BasicLayout"
import AfterFirstNight from "@/components/night/afterFirst/AfterFirstNight"
import FirstNight from "@/components/night/first/FirstNight"
import { daysInKorean } from "@/lib/days"

interface Props {
  params: {
    days: string
  }
}

function Night({ params: { days } }: Props) {
  return (
    <BasicLayout headText={`${daysInKorean[+days]} 밤`}>
      {Number(days) === 1 ? <FirstNight /> : <AfterFirstNight />}
    </BasicLayout>
  )
}

export default Night
