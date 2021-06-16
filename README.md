# notes-cli

A command line tool for managing notes

## Why?

I like to take notes, but have found other tools to have too much overhead. I found myself taking notes in simple text files in my editor, so I built this tool to help keep those notes sane.

## What does it do?

1. Creates new markdown notes.
2. Searches through previous notes.
3. Creates notes from user-defined templates.
4. Organizes notes in `~/Notes/<year>/<month>/`

## How to install

1. Clone the repo
2. `npm i`
3. `npm run build`
4. Create an alias to the executable. (`alias note="~/notes-cli/notes"`)

## Usage

Create a new note:

`note new [-t <template name>] [title]`

List recent notes:

`note list`

Search notes:

`note find <search terms>`

## TODO

- [x] Make notes searchable
- [x] Update folder structure to conform to `/year/month` pattern
- [x] Create notes as markdown files
- [x] Add templates
- [ ] Sanitize inputs
- [ ] Add tests
