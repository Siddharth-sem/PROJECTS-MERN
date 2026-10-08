
import NoteCard from "./NoteCard"


const NotesList = ({notes, setNotes}) => {

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
      notes.map((note) => {

        if (note.id === noteId) {
          return {
            ...note,
            isTrashed: !note.isTrashed
          }
        }

        return note
      })
    )

}


  return (
    <div>
      {notes
      .filter((note) => note.isTrashed === false)
      .map((note) => (
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