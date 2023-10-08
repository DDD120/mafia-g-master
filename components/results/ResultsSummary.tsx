import { CitizenRoles } from "@/store/types"
import User from "./User"

interface Props {
  aliveUsers: string[]
  mafiaUsers: string[]
  citizenUsers: [CitizenRoles, string[]][]
}

function ResultsSummary({ aliveUsers, mafiaUsers, citizenUsers }: Props) {
  return (
    <div className="mt-8 text-center flex flex-col gap-8">
      <div className="relative border-2 border-red border-opacity-50 rounded-lg p-4">
        <h2 className="absolute top-[-20px] left-1/2 translate-x-[-50%] inline-block text-3xl font-bold bg-black px-4">
          생존자
        </h2>
        <div className="mt-5 my-4 flex justify-center flex-wrap gap-2">
          {aliveUsers.map((user) => (
            <User key={user} user={user} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2 relative border-2 border-red border-opacity-50 rounded-lg p-4">
        <h2 className="absolute top-[-20px] left-1/2 translate-x-[-50%] inline-block  text-3xl font-bold bg-black px-4">
          역할
        </h2>
        <div className="mt-5 my-4">
          <h3 className="text-xl font-bold my-2">마피아 팀</h3>
          <div className="flex justify-center flex-wrap gap-2">
            {mafiaUsers.map((mafia) => (
              <User key={mafia} user={mafia} />
            ))}
          </div>
          <div>
            <h3 className="text-xl font-bold my-2">시민 팀</h3>
            {citizenUsers.map((citizen) => (
              <div key={citizen[0]}>
                <div className="flex justify-center flex-wrap gap-2">
                  {citizen[1].map((user) => (
                    <User key={user} user={user} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultsSummary
