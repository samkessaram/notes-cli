#!/usr/bin/env ts-node

import { Note } from "./Note"
import { log, LOG_LEVELS } from "./Logger"
import { buildFolderStructure } from "./Folder"

async function run() {
  const input = process.argv.slice(2).join(" ")

  const note = new Note(input)

  const path = buildFolderStructure(note.createdAt)

  note.save(path)

  log(`Opening note.`, LOG_LEVELS.NOTICE)
  note.open()
}

run()
