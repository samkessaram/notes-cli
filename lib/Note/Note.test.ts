import { expect } from "chai"
import { Note } from "./Note"

describe("Note", () => {
  it("should initialize with just a title argument", () => {
    const note = new Note({ title: "foo" })
    expect(note.title.endsWith("Foo")).to.be.eq(true)
  })

  it("should initialize with just a template argument", () => {
    const note = new Note({ template: "foo" })
    expect(note.title.endsWith("Foo")).to.be.eq(true)
  })
})
