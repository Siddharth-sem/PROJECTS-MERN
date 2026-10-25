
import NoteCard from "./NoteCard"
import { useState } from "react"
import NoteForm from "./NoteForm"

const NotesList = ({notes, setNotes, deleteNote, editNote, search, archiveNote, togglePin}) => {
  const [showForm, setShowForm] = useState(false)

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState("")
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
    tags: tags
      .split(",")
      .map((tag)=> tag.trim())
      .filter((tag)=>tag !== ""),
    isPinned: false,
    isTrashed: false,
    isArchived: false
  }

  setNotes((currNotes) => [...currNotes, newNote])

  setTitle("")
  setContent("")
  setTags("")
  setShowForm(false)
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
        
        <h2>Create Note</h2>

        <NoteForm
          title ={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
        />

        <input
          type="text"
          placeholder="Enter tags(comma separated)"
          value={tags}
          onChange={(e)=>setTags(e.target.value)}
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