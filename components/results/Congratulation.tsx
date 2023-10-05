interface Props {
  winner: "mafia" | "citizen" | null
}

const winnerToKorean = {
  mafia: "마피아 팀",
  citizen: "시민 팀",
}

function Congratulation({ winner }: Props) {
  return (
    <h1 className="mt-16 mb-20 text-center text-4xl font-black">
      {winner && winnerToKorean[winner]}이 <br />
      승리하였습니다!
    </h1>
  )
}

export default Congratulation
