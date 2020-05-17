const { Select } = require("enquirer")
import { execSync } from "child_process"

import { NOTES_DIRECTORY } from "../Folder"
import { log, LOG_LEVELS } from "../Logger"
import { openFile } from "../File"

function grep(term: string): string {
  /**
   * -r recursive
   * -i ignore case
   * -l Suppress normal output; instead print the name of each input file from which output would normally have been printed. The scanning of each file stops on the first match.
   */

  try {
    return execSync(`grep -r -l -i '${term}' ${NOTES_DIRECTORY}`, {
      encoding: "utf-8",
    })
  } catch (error) {
    return
  }
}

function isInvalid(term: string): boolean {
  const invalid = term.match(/[^A-Za-z0-9_ ]/g)
  if (invalid) {
    log(
      `Search term contains invalid characters: ${invalid.join(", ")}`,
      LOG_LEVELS.ERROR,
    )
  }

  return !!invalid
}

function parseFiles(filesString: string): string[] {
  const files = filesString.split("\n")
  return files
}

function displayResults(files: string[], term: string): void {
  const prompt = new Select({
    message: `Files including '${term}'`,
    choices: files.map((f) => {
      return f.slice(f.lastIndexOf("/") + 1)
    }),
  })

  prompt
    .run()
    .then((fileName) => {
      const file = files.filter((f) => f.includes(fileName))[0]
      openFile(file)
    })
    .catch((error) => {
      log(error, LOG_LEVELS.ERROR)
    })
}

export function find(term): void {
  if (isInvalid(term)) return
  const files = grep(term)

  if (!files) {
    log(`No notes matched your search: '${term}'`, LOG_LEVELS.WARN)
    return
  }

  const parsed = parseFiles(files)
  displayResults(parsed, term)
}
