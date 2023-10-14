"use client"

import { colors } from "@/lib/colors"
import { useState } from "react"
import { ColorFormat, CountdownCircleTimer } from "react-countdown-circle-timer"
import { FaPlay, FaPause } from "react-icons/fa"
import { VscDebugRestart } from "react-icons/vsc"

function CountdownTimer() {
  const [isCompleted, setIsCompleted] = useState(false)
  const [key, setKey] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const handleRestartClick = () => {
    setKey((prev) => prev + 1)
    setIsCompleted(false)
  }

  const formattingTime = (remainingTime: number) => {
    const minutes = Math.floor(remainingTime / 60)
    const seconds = remainingTime % 60

    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
  }

  return (
    <div
      aria-label="남은 시간 타이머"
      className="h-full flex flex-col justify-center items-center "
    >
      <CountdownCircleTimer
        key={key}
        isPlaying={isPlaying}
        duration={300}
        colors={colors.red as ColorFormat}
        trailColor="#ffffff20"
        size={240}
        strokeWidth={24}
        onComplete={() => setIsCompleted(true)}
      >
        {({ remainingTime }) => (
          <div
            role="timer"
            aria-live="assertive"
            className="flex flex-col justify-center items-center gap-2"
          >
            <p className="text-4xl font-black">
              {formattingTime(remainingTime)}
            </p>
            {isCompleted ? (
              <VscDebugRestart
                size={32}
                className="cursor-pointer"
                onClick={handleRestartClick}
              />
            ) : isPlaying ? (
              <FaPause
                size={32}
                className="cursor-pointer"
                onClick={() => setIsPlaying(false)}
              />
            ) : (
              <FaPlay
                size={32}
                className="cursor-pointer"
                onClick={() => setIsPlaying(true)}
              />
            )}
          </div>
        )}
      </CountdownCircleTimer>
    </div>
  )
}

export default CountdownTimer
