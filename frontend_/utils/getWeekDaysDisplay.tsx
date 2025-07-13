import { isSameDay } from "date-fns"
import { ExerciseLog } from "@/types/health/exercise"

export const getWeekDaysDisplay = (
  start: Date,
  logs: ExerciseLog[]
) => {
  const daysOfWeek = ["D", "S", "T", "Q", "Q", "S", "S"]
  return [...Array(7)].map((_, i) => {
    const date = new Date(start)
    date.setDate(start.getDate() + i)
    return {
      id: daysOfWeek[i],
      letter: daysOfWeek[i],
      date,
      exercised: logs.some((log) => isSameDay(new Date(log.datetime), date)),
    }
  })
}