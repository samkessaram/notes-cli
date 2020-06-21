import { Note } from "../Note"
import { buildFolderStructure } from "../Folder"

export function _new(title: string, template: string) {
  const note = new Note(title, template)
  const path = buildFolderStructure(note.createdAt)
  if (note.save(path)) note.open()
}
