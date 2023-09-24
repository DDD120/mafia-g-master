"use client"

import Script from "@/components/Script"
import SelectInput from "@/components/SelectInput"
import Button from "@/components/button/Button"
import useAliveUsers from "@/hooks/useAliveUsers"
import { useMafiaContext } from "@/providers/MafiaProvider"
import { useSelector } from "@xstate/react"
import { useParams } from "next/navigation"
import { ChangeEvent, useEffect, useState } from "react"

function AfterFirstNight() {
  const mafiaServices = useMafiaContext()
  const roles = useSelector(mafiaServices, (state) => state.context.roles)
  const [mafiaPointOut, setMafiaPointOut] = useState<string | null>(null)
  const [doctorPointOut, setDoctorPointOut] = useState<string | null>(null)
  const [isRequired, setIsRequired] = useState(false)
  const {
    aliveUsers,
    aliveMafia,
    aliveCitizens,
    alivePolice,
    aliveDoctor,
  } = useAliveUsers()
  const { days } = useParams()

  const handleMafiaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMafiaPointOut(e.target.value)
  }

  const handleDoctorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDoctorPointOut(e.target.value)
  }

  const handleButtonClick = () => {
    mafiaServices.send("AFTERFIRSTDAY", {
      mafiaPointOut,
      doctorPointOut,
    })
  }

  useEffect(() => {
    if (
      !!mafiaPointOut &&
      (roles.includes("doctor") ? !!doctorPointOut : true)
    ) {
      setIsRequired(true)
    } else {
      setIsRequired(false)
    }
  }, [roles, mafiaPointOut, doctorPointOut])

  return (
    <>
      <div className="scrollbar-hide overflow-y-auto">
        <div className="flex flex-col gap-4">
          <Script>
            밤이 되었습니다.
            <br /> 모두 눈을 감고 엎드려 바닥을 가볍게 두드리세요.
            <br /> 마피아는 눈을 뜨고 살해할 1명을 지목합니다.
            <br /> [마피아가 지목한 뒤]
            <br /> 마피아 지목이 완료되었습니다.
          </Script>
          <ul>
            {aliveCitizens.map((user) => (
              <SelectInput
                key={user}
                type="radio"
                name="mafiaPointOut"
                id={`mafiaPointOut-${user}`}
                value={user}
                onChange={handleMafiaChange}
              />
            ))}
          </ul>
          {aliveDoctor.length > 0 && (
            <>
              <Script includeName={false}>
                의사는 눈을 뜨고, 이번 밤에 죽을 것 같은 1명을 지목합니다.
                <br /> [의사가 지목한 뒤]
                <br /> 의사 지목이 완료되었습니다.
              </Script>
              <ul>
                {aliveUsers.map((user) => (
                  <SelectInput
                    key={user}
                    type="radio"
                    name="doctorPointOut"
                    id={`doctorPointOut-${user}`}
                    value={user}
                    onChange={handleDoctorChange}
                  />
                ))}
              </ul>
            </>
          )}
          {alivePolice.length > 0 && (
            <>
              <Script includeName={false}>
                경찰은 눈을 뜨고 마피아로 생각되는 1명을 지목합니다.
                <br /> [경찰이 지목한 사람이 마피아가 맞는지 O/X 손동작으로
                알려주세요]
                <br /> 경찰은 지목이 완료되었습니다.
              </Script>
              <p>
                현재 살아있는 마피아 :{" "}
                {aliveMafia.map((mafia) => (
                  <span key={mafia} className="mr-2">
                    {mafia}
                  </span>
                ))}
              </p>
            </>
          )}
        </div>
      </div>
      <div className="shrink-0">
        <Button
          to={`/day/${days}?step=debate`}
          onClick={handleButtonClick}
          isActive={isRequired}
        >
          지목 완료
        </Button>
      </div>
    </>
  )
}

export default AfterFirstNight
