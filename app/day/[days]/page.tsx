import BasicLayout from "@/components/BasicLayout"
import DayContent from "@/components/day/DayContent"
import { daysToKorean } from "@/lib/toKorean"

export type DayStep = "debate" | "exile"

interface Props {
  params: {
    days: number
  }
  searchParams: {
    step: DayStep
  }
}

function Day({ params: { days }, searchParams: { step } }: Props) {
  return (
    <BasicLayout headText={`${daysToKorean[days]} 낮`}>
      <DayContent days={days} step={step} />
    </BasicLayout>
  )
}

export default Day
