#!/usr/bin/env ts-node
const { program } = require("commander")

import { _new, list, find } from "./lib/commands"

program
  .command("new <note title...>")
  .description("Start a new note")
  .action((title) => {
    _new(title)
  })

program.command("list").description("List recent notes").action(list)

program
  .command("find <search terms...>")
  .description("Search notes")
  .action((term) => {
    find(term.join(" "))
  })

program.parse(process.argv)
