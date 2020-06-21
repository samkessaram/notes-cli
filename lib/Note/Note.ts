const assert = require("assert")
import startCase = require("lodash/startCase")

import { createFile, fileExists, openFile, readFile } from "../File"
import { TEMPLATES_DIRECTORY } from "../Folder"
import { log, LOG_LEVELS } from "../Logger"
import { DateParts } from "../utils/definitions"
import { getDateParts } from "../utils/date"

export class Note {
  public createdAt: Date
  public title: string
  private location: string
  private template: string

  constructor(title: string, template?: string) {
    const noteTitle = title || template
    assert(noteTitle, "You must enter a title or template for your note!")
    this.createdAt = new Date()
    this.title = this.buildTitle(noteTitle, getDateParts(this.createdAt))
    this.template = template
  }

  public save(path): boolean {
    const location = `${path}/${this.title}.md`
    if (fileExists(location)) {
      log("Note already exists!", LOG_LEVELS.ERROR)
      return false
    } else {
      log(`Creating note ${this.title}`, LOG_LEVELS.SUCCESS)
      const body = this.buildBody(this.title, this.template)
      createFile(location, body)
      this.location = location
      return true
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

  private buildBody(title: string, templateName?: string): string {
    if (templateName) {
      const templatePath = this.getTemplatePath(templateName)
      try {
        const templateBody = readFile(templatePath)
        return templateBody.replace("{{ title }}", title)
      } catch (error) {
        log(
          `Error fetching template '${templateName}'. Make sure template exists at '${templatePath}'`,
          LOG_LEVELS.ERROR,
        )
        log(error, LOG_LEVELS.NOTICE)
      }
    }

    return `${title}\n\n`
  }

  private getTemplatePath(templateName: string): string {
    return `${TEMPLATES_DIRECTORY}/${templateName}.md`
  }
}
