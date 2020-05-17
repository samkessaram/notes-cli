#!/usr/bin/env ts-node
const { program } = require("commander")

import { _new, list, find } from "./lib/commands"

program
  .command("new <noteTitle...>")
  .description("Start a new note")
  .action((noteTitle) => {
    _new(noteTitle)
  })

program.command("list").description("List recent notes").action(list)

program
  .command("find <searchTerms...>")
  .description("Search notes")
  .action((searchTerms) => {
    find(searchTerms.join(" "))
  })

program.parse(process.argv)
