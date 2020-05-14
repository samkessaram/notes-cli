# notes-cli

A command line tool for managing notes

## Why?

I like to take notes, but have found other tools to have too much overhead. I found myself taking notes in simple text files in my editor, so I built this tool to help keep those notes sane.

## What does it do?

Right now, this project does 2 things:

1. Allows you to create a new text file from the command line via `note <title>`
2. Organizes notes upon creation in `~/Notes/<year>.<month>/`

## TODO

- [x] Make notes searchable
- [ ] Sanitize inputs
- [ ] Add tests
- [x] Update folder structure to conform to `/year/month` pattern
- [x] Create notes as markdown files
- [ ] Add templates
