import { DateParts } from "./definitions"

export function getDateParts(date): DateParts {
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const day = date.getDate().toString().padStart(2, "0")
  const year = date.getFullYear().toString()
  return { day, month, year }
}
