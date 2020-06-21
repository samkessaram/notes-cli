#!/usr/bin/env ts-node
const { program } = require("commander")

import { _new, list, find } from "./lib/commands"

program
  .command("new [noteTitle...]")
  .option("-t, --template <templateName>", "template to use")
  .description("Start a new note")
  .action((noteTitle, commandObject) => {
    const { template } = commandObject
    _new(noteTitle.join(" "), template)
  })

program.command("list").description("List recent notes").action(list)

program
  .command("find <searchTerms...>")
  .description("Search notes")
  .action((searchTerms) => {
    find(searchTerms.join(" "))
  })

program.parse(process.argv)
