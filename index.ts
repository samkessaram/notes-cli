#!/usr/bin/env ts-node
const { program } = require("commander")

import { create, browse } from "./lib"

program
  .command("new <title>")
  .description("Create a new note")
  .action((title) => {
    create(title)
  })

program.command("browse").description("Browse recent notes").action(browse)

program.parse(process.argv)
