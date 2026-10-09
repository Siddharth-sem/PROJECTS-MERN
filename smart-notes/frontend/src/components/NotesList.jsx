
import NoteCard from "./NoteCard"


const NotesList = ({notes, setNotes, deleteNote, editNote}) => {

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

  setNotes((currNotes) => [...currNotes, newNote])
}

// pin the note
  const togglePin = (noteId) => {

    setNotes(
      (currNotes) => currNotes.map((note) => {

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



  return (
    <div>
      {notes
      .filter((note) => note.isTrashed === false)
      .map((note) => (
        <NoteCard 
          key={note.id} 
          note={note}
          togglePin={togglePin}
          deleteNote={deleteNote}
          editNote={editNote}
        />
      ))}

      <br />
      <br />

      <button onClick={addTestNote}>
        + Add Test Note
      </button>
    </div>
  )
}

export default NotesList