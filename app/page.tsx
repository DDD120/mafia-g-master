import Button from "@/components/button/Button"
import MafiaLottie from "@/components/MafiaLottie"

function Home() {
  return (
    <main className="flex-1 h-full flex flex-col gap-1 items-center justify-center text-center">
      <div className="w-44 h-44 overflow-hidden rounded-full mb-4">
        <MafiaLottie />
      </div>
      <h1 className="text-red font-black text-4xl">마피아 마스터</h1>
      <p className="mb-4">마피아 게임 오프라인 진행 가이드</p>
      <Button layoutMode="inline" isActive to="/setting">
        시작하기
      </Button>
    </main>
  )
}

export default Home
