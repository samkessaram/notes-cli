import { DateParts } from "./definitions"

export function padLeadingZero(num: number): string {
  return num.toString().padStart(2, "0")
}

export function getDateParts(date): DateParts {
  const month = padLeadingZero(date.getMonth() + 1)
  const day = padLeadingZero(date.getDate())
  const year = date.getFullYear().toString()
  return { day, month, year }
}
