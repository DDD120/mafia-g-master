import BasicLayout from "@/components/layout/BasicLayout"
import AfterFirstNight from "@/components/night/afterFirst/AfterFirstNight"
import FirstNight from "@/components/night/first/FirstNight"
import { daysToKorean } from "@/lib/toKorean"

interface Props {
  params: {
    days: string
  }
}

function Night({ params: { days } }: Props) {
  return (
    <BasicLayout headText={`${daysToKorean[+days]} 밤`}>
      {Number(days) === 1 ? <FirstNight /> : <AfterFirstNight />}
    </BasicLayout>
  )
}

export default Night
