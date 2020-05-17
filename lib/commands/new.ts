import { Note } from "../Note"
import { buildFolderStructure } from "../Folder"

export function _new(title) {
  const note = new Note(title)
  const path = buildFolderStructure(note.createdAt)
  note.save(path)
  note.open()
}
