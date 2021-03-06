import { existsSync, mkdirSync, readdirSync } from "fs"

import { log, LOG_LEVELS } from "../Logger"
import { getDateParts } from "../utils/date"

const USER_DIRECTORY = process.env.HOME // oops only works on OSX
export const NOTES_DIRECTORY = USER_DIRECTORY + "/Notes"
export const TEMPLATES_DIRECTORY = NOTES_DIRECTORY + "/templates"
const SYSTEM_FILES = [".DS_Store"]

function filterSystemFiles(files) {
  return files.filter((file) => !SYSTEM_FILES.includes(file))
}
function createDirectoryRecursive(dir: string): void {
  if (existsSync(dir)) {
    log(`${dir} already exists. Skipping create.`, LOG_LEVELS.NOTICE)
    return
  }

  mkdirSync(dir, { recursive: true })
  log(`Created ${dir}`, LOG_LEVELS.NOTICE)
}

export function buildFolderStructure(createdAt: Date): string {
  const dateParts = getDateParts(createdAt)
  const subDirectory = `${NOTES_DIRECTORY}/${dateParts.year}/${dateParts.month}`
  createDirectoryRecursive(subDirectory)

  return subDirectory
}

export function listContents(path): string[] {
  return filterSystemFiles(readdirSync(path))
}
