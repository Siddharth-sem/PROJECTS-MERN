
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
    alert("Pleast enter both title and content")
    return
  }

  

  const newNote = {
    id: Date.now(),
    title: title,
    content: content,
    tags: [
      ...new Map(
        tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag !== "")
          .map((tag) => [
            tag.toLowerCase(),
            tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()
          ])
      ).values()
    ],
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

const visibleNotes = [...notes]
  .filter((note) => note.isTrashed === false)
  .filter((note) => note.isArchived === false)
  .sort((a, b) => Number(b.isPinned) - Number(a.isPinned))
  .filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase()) ||
    note.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
  <div className="notes-list-container">

    <div className="notes-grid">
      {visibleNotes.length > 0 ? (
        visibleNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            togglePin={togglePin}
            deleteNote={deleteNote}
            editNote={editNote}
            archiveNote={archiveNote}
          />
        ))
      ) : (
        <p className="empty-state">
          {search.trim()
            ? "No notes match your search."
            : "No notes yet. Create your first note!"}
        </p>
      )}
    </div>

    <button
      className="floating-create-btn"
      onClick={() => {
        if (showForm) {
          setTitle("");
          setContent("");
          setTags("");
          setShowForm(false);
        } else {
          setShowForm(true);
        }
      }}
    >
      {showForm ? "✕ Close Editor" : "+ Create Note"}
    </button>

    {showForm && (
      <div>
        <h2>Create Note</h2>

        <NoteForm
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
        />

        <input
          type="text"
          placeholder="Enter tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <button onClick={addTestNote}>Save Note</button>
      </div>
    )}

  </div>
);
}

export default NotesList