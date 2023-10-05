import { CitizenRoles } from "@/store/types"

interface Props {
  aliveUsers: string[]
  mafiaUsers: string[]
  citizenUsers: [CitizenRoles, string[]][]
}

const roleToKorean: Record<CitizenRoles, string> = {
  normal: "일반 시민",
  doctor: "의사",
  police: "경찰",
}

function ResultsSummary({ aliveUsers, mafiaUsers, citizenUsers }: Props) {
  return (
    <div className="mt-8 text-center flex flex-col gap-8">
      <div className="relative border-2 border-red border-opacity-50 rounded-lg p-4">
        <h2 className="absolute top-[-20px] left-1/2 translate-x-[-50%] inline-block  text-3xl font-bold bg-black px-4">
          생존자
        </h2>
        <div className="mt-2 flex flex-col justify-center gap-2">
          {aliveUsers.map((user) => (
            <p key={user}>{user} </p>
          ))}
        </div>
      </div>
      <div className="relative border-2 border-red border-opacity-50 rounded-lg p-4">
        <h2 className="absolute top-[-20px] left-1/2 translate-x-[-50%] inline-block  text-3xl font-bold bg-black px-4">
          역할
        </h2>
        <div>
          <h3 className="text-xl font-bold my-2">마피아 팀</h3>
          <div className="flex flex-col  justify-center gap-2">
            {mafiaUsers.map((mafia) => (
              <p key={mafia}>{mafia} </p>
            ))}
          </div>
        </div>
        <h3 className="text-xl font-bold my-2">시민 팀</h3>
        {citizenUsers.map((citizen) => (
          <div key={citizen[0]}>
            <span>{roleToKorean[citizen[0]]}</span>
            <div className="flex flex-col justify-center gap-2">
              {citizen[1].map((user) => (
                <p key={user}>{user} </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ResultsSummary
