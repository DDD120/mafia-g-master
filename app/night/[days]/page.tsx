import FirstNight from "@/components/night/first/FirstNight"

interface Props {
  params: {
    days: string
  }
}

function Night({ params: { days } }: Props) {
  if (Number(days) === 1) return <FirstNight />
  return <div>Night</div>
}

export default Night
