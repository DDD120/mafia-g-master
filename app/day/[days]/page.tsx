import BasicLayout from "@/components/BasicLayout"
import DayContent from "@/components/day/DayContent"
import { daysInKorean } from "@/lib/days"

interface Props {
  params: {
    days: number
  }
}

function Day({ params: { days } }: Props) {
  return (
    <BasicLayout headText={`${daysInKorean[days]} 낮`}>
      <DayContent />
    </BasicLayout>
  )
}

export default Day
