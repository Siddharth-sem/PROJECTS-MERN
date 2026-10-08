import { useState } from "react"
import NoteCard from "./NoteCard"


const NotesList = () => {

const [notes, setNotes] = useState([
  {
    id: 1,
    title: "React Notes",
    content: "Learning components and props",
    tags: ["React", "Frontend"],
    isPinned: true,
    isTrashed: false
  },
  {
    id: 2,
    title: "DBMS",
    content: "Learning MongoDB and databases",
    tags: ["DBMS", "MongoDB"],
    isPinned: false,
    isTrashed: false
  },
  {
    id: 3,
    title: "Hackathon Ideas",
    content: "Ideas for the next hackathon",
    tags: ["Hackathon"],
    isPinned: false,
    isTrashed: false
  }
])

// create new note
const addTestNote = () => {

  const newNote = {
    id: Date.now(),
    title: "New Test Note",
    content: "This note was added using state.",
    tags: ["Test"],
    isPinned: false,
    isTrashed: false
  }

  setNotes([...notes, newNote])
}

// pin the note
const togglePin = (noteId) => {

    setNotes(
      notes.map((note) => {

        if (note.id === noteId) {
          return {
            ...note,
            isPinned: !note.isPinned
          }
        }

        return note
      })
    )
  }

  // remove the specific note
  const deleteNote = (noteId) => {

  setNotes(
    notes.filter((note) => note.id !== noteId)
  )

}


  return (
    <div>
      {notes.map((note) => (
        <NoteCard key={note.id} 
        note={note}
        togglePin={togglePin}
        deleteNote={deleteNote}
        />
      ))}

      <button onClick={addTestNote}>
        + Add Test Note
      </button>
    </div>
  )
}

export default NotesList