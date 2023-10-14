import { PiSpeakerSimpleHighFill } from "react-icons/pi"

interface Props {
  includeName?: boolean
  children: React.ReactNode
}

function Script({ children, includeName = true }: Props) {
  return (
    <div
      className={`relative border-2 border-red border-opacity-50 rounded-lg ${
        includeName && "mt-5"
      }`}
    >
      {includeName && (
        <h1 className="absolute mt-[-20px] ml-[10px] p-2 inline-flex bg-black font-bold text-xl items-center gap-2">
          마스터 <PiSpeakerSimpleHighFill color="red" />
        </h1>
      )}
      <p className={`p-4 font-serif ${includeName && "mt-2"}`}>{children}</p>
    </div>
  )
}

export default Script
