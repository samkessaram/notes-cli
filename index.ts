#!/usr/bin/env ts-node

import {
  writeFileSync,
  existsSync,
  mkdirSync,
  accessSync,
  constants as FS_CONSTANTS,
} from "fs"

import { exec } from "child_process"

const chalk = require("chalk")

import startCase = require("lodash/startCase")
import { DateParts } from "./definitions"

const LOG_LEVELS = {
  DEFAULT: "white",
  WARN: "yellow",
  ERROR: "red",
  SUCCESS: "green",
  NOTICE: "blue",
}

const log = (input: string, level = LOG_LEVELS.DEFAULT): void =>
  console.log(chalk[level](input))

const USER_DIRECTORY = process.env.HOME // oops only works on OSX
const NOTES_DIRECTORY = USER_DIRECTORY + "/Notes"

function getDateParts(): DateParts {
  const date = new Date()
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const day = date.getDate().toString().padStart(2, "0")
  const year = date.getFullYear().toString()
  return { day, month, year }
}

function buildTitle(input: string, dateParts: DateParts): string {
  const title = startCase(input).replace(/\s/g, "")
  const { day, month, year } = dateParts

  return `${year}.${month}.${day}_${title}`
}

function createDirectory(dir): void {
  if (existsSync(dir)) {
    log(`${dir} already exists. Skipping create.`, LOG_LEVELS.NOTICE)
    return
  }

  mkdirSync(dir)
  log(`Created ${dir}`, LOG_LEVELS.NOTICE)
}

// If no error caught, that means that the file exists and is accessible.
function fileExists(path) {
  try {
    accessSync(path, FS_CONSTANTS.R_OK | FS_CONSTANTS.W_OK)
    return true
  } catch (err) {
    return false
  }
}

async function run() {
  const input = process.argv.slice(2).join(" ")

  if (input === "") {
    log("Please enter a title!", LOG_LEVELS.ERROR)
    return
  }

  const dateParts = getDateParts()

  const title = buildTitle(input, dateParts)

  createDirectory(NOTES_DIRECTORY)

  const subDirectory = `${NOTES_DIRECTORY}/${dateParts.year}.${dateParts.month}`
  createDirectory(subDirectory)

  const notePath = `${subDirectory}/${title}`

  if (fileExists(notePath)) {
    log("Note already exists!", LOG_LEVELS.ERROR)
    return
  } else {
    log(`Creating note ${title}`, LOG_LEVELS.SUCCESS)
    writeFileSync(notePath, `${title}\n\n`)
  }
  log(`Opening note.`, LOG_LEVELS.NOTICE)
  exec(`code ${notePath}`)
}

run()
