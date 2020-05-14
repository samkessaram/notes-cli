import { writeFileSync, accessSync, constants as FS_CONSTANTS } from "fs"

// import { log, LOG_LEVELS } from "../Logger"

// If no error caught, that means that the file exists and is accessible.
export function fileExists(path: string): boolean {
  try {
    accessSync(path, FS_CONSTANTS.R_OK | FS_CONSTANTS.W_OK)
    return true
  } catch (err) {
    return false
  }
}

export function createFile(path: string, body: string): void {
  writeFileSync(path, body)
}
