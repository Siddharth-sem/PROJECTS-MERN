
import NoteCard from "./NoteCard"
import { useState } from "react"

const NotesList = ({notes, setNotes, deleteNote, editNote, search, archiveNote}) => {
  const [showForm, setShowForm] = useState(false)

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
// create new note
const addTestNote = () => {

  if(!title.trim() || !content.trim()){
    alert("Pleast enter n=both title and content")
    return
  }

  

  const newNote = {
    id: Date.now(),
    title: title,
    content: content,
    tags: [],
    isPinned: false,
    isTrashed: false,
    isArchived: false
  }

  setNotes((currNotes) => [...currNotes, newNote])

  setTitle("")
  setContent("")
  setShowForm(false)
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
      {[...notes]
      .filter((note) => note.isTrashed === false)
      .filter((note) => note.isArchived === false)
      .sort((a,b)=> Number(b.isPinned) - Number(a.isPinned))
      .filter((note) => 
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.content.toLowerCase().includes(search.toLowerCase()))
      .map((note) => (
        <NoteCard 
          key={note.id} 
          note={note}
          togglePin={togglePin}
          deleteNote={deleteNote}
          editNote={editNote}
          archiveNote={archiveNote}
        />
      ))}

      <br />
      <br />

      <button 
        onClick={() => {
          if (showForm) {
            setTitle("")
            setContent("")
            setShowForm(false)
          } else {
            setShowForm(true)
          }
        }}
      >
        {showForm ? "Cancel" : "+ Create Note"}
      </button>

      {showForm && (
        <div>
          <h3>Create New Note</h3>

          <input
            type="text"
            placeholder="Enter note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Write your note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button onClick={addTestNote}>
            Save Note
          </button>
        </div>
      )}

    </div>
  )
}

export default NotesList