const { Select } = require("enquirer")

import { listContents, NOTES_DIRECTORY } from "../Folder"
import { getDateParts, padLeadingZero } from "../utils/date"
import { openFile } from "../File"
import { log, LOG_LEVELS } from "../Logger"

function decrementDateParts(
  prevMonth: string,
  prevYear: string,
): { month: string; year: string } {
  let month = prevMonth
  let year = prevYear
  if (prevMonth === "1") {
    month = "12"
    year = (parseInt(prevYear) - 1).toString()
  } else {
    month = padLeadingZero(parseInt(prevMonth) - 1)
  }

  return { month, year }
}
function traverse(
  month: string,
  year: string,
  depth = 0,
): { path: string; files: string[] } {
  const path = `${NOTES_DIRECTORY}/${year}/${month}`
  try {
    return { path, files: listContents(path) }
  } catch (error) {
    if (error.code === "ENOENT") {
      if (depth > 3) {
        return { path, files: [] }
      } else {
        const newDateParts = decrementDateParts(month, year)
        return traverse(newDateParts.month, newDateParts.year, depth + 1)
      }
    } else {
      throw error
    }
  }
}

function handleSelection(files: string[], path: string): void {
  const prompt = new Select({
    name: "title",
    message: "Select a recent note",
    choices: files
      .filter((file) => file[0] !== ".")
      .sort()
      .reverse(),
  })

  prompt
    .run()
    .then((answer) => openFile(`${path}/${answer}`))
    .catch((error) => {
      log(error, LOG_LEVELS.ERROR)
    })
}

export function list(): void {
  const { month, year } = getDateParts(new Date())
  const { path, files } = traverse(month, year, 0)

  if (files.length === 0) {
    log("No recent files", LOG_LEVELS.WARN)
    return
  }
  handleSelection(files, path)
}
