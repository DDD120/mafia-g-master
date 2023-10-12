import { Roles } from "@/store/types"

export const daysToKorean: Record<number, string> = {
  1: "첫번째",
  2: "두번째",
  3: "세번째",
  4: "네번째",
  5: "다섯번쨰",
  6: "여섯번째",
  7: "일곱번쨰",
  8: "여덟번째",
  9: "아홉번째",
  10: "열번째",
}

export const rolesToKorean: Record<Roles, string> = {
  mafia: "마피아",
  normal: "일반 시민",
  doctor: "의사",
  police: "경찰",
}

export const winnerToKorean = {
  mafia: "마피아 팀",
  citizen: "시민 팀",
}
