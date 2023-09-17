import Debate from "./Debate"
import Exile from "./Exile"
import { DayStep } from "@/app/day/[days]/page"

interface Props {
  step: DayStep
  days: number
}

function DayContent({ step, days }: Props) {
  if (step === "debate") return <Debate days={days} />
  if (step === "exile") return <Exile />
}

export default DayContent
