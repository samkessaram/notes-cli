import assert from "assert"
import startCase = require("lodash/startCase")

import { createFile, fileExists, openFile } from "../File"
import { log, LOG_LEVELS } from "../Logger"
import { DateParts } from "../utils/definitions"
import { getDateParts } from "../utils/date"

export class Note {
  public createdAt: Date
  public title: string
  private location: string

  constructor(title: string) {
    assert(title, "You must enter a title for your note!")
    this.createdAt = new Date()
    this.title = this.buildTitle(title, getDateParts(this.createdAt))
  }

  public save(path) {
    const location = `${path}/${this.title}.md`
    if (fileExists(location)) {
      log("Note already exists!", LOG_LEVELS.ERROR)
      return
    } else {
      log(`Creating note ${this.title}`, LOG_LEVELS.SUCCESS)
      createFile(location, `${this.title}\n\n`)
      this.location = location
    }
  }

  public open() {
    log(`Opening note.`, LOG_LEVELS.NOTICE)
    openFile(this.location)
  }

  private buildTitle(input: string, dateParts: DateParts): string {
    const title = startCase(input).replace(/\s/g, "")
    const { day, month, year } = dateParts

    return `${year}.${month}.${day}_${title}`
  }
}
