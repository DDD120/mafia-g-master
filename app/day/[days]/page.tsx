import BasicLayout from "@/components/BasicLayout"
import DayContent from "@/components/day/DayContent"
import { daysInKorean } from "@/lib/days"

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
    <BasicLayout headText={`${daysInKorean[days]} 낮`}>
      <DayContent days={days} step={step} />
    </BasicLayout>
  )
}

export default Day
