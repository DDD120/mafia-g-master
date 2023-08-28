import "./globals.css"
import type { Metadata } from "next"
import { Noto_Serif_KR } from "next/font/google"
import localFont from "next/font/local"
import RecoilRootWrapper from "@/providers/RecoilRootWrapper"

const pretendard = localFont({
  src: "./PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard",
})

const serif = Noto_Serif_KR({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: "Mafia Master",
  description: "오프라인 마피아 게임 진행 도우미",
}

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <RecoilRootWrapper>
        <body
          className={`${pretendard.variable} ${serif.variable} leading-normal font-pretendard min-h-screen bg-black text-gray-50`}
        >
          {children}
        </body>
      </RecoilRootWrapper>
    </html>
  )
}

export default RootLayout
