import { useState , useEffect} from "react"

// import NavBar from "../components/NavBar"
import Sidebar from "../components/Sidebar"
import SearchBar from "../components/SearchBar"
import NotesList from "../components/NotesList"
import Trash from "../components/Trash"
import Archived from "../components/Archived"
import NoteForm from "../components/NoteForm"
import NoteCard from "../components/NoteCard"


const Dashboard = () => {

  const [edit, setEdit] = useState(null)

  const [search, setSearch] =useState("")

  const [activeSection, setActiveSection] = useState("all")

  const [selectedTag, setSelectedTag] = useState(null)

  const [notes, setNotes] = useState(() => {
  const savedNotes = localStorage.getItem("smart-notes")

  
  

  if (savedNotes) {
    return JSON.parse(savedNotes)
  }

  return [
    {
      id: 1,
      title: "React Notes",
      content: "Learning components and props",
      tags: ["React", "Frontend"],
      isPinned: true,
      isTrashed: false,
      isArchived: false
    },
    {
      id: 2,
      title: "DBMS",
      content: "Learning MongoDB and databases",
      tags: ["DBMS", "MongoDB"],
      isPinned: false,
      isTrashed: false,
      isArchived: false
    },
    {
      id: 3,
      title: "Hackathon Ideas",
      content: "Ideas for the next hackathon",
      tags: ["Hackathon"],
      isPinned: false,
      isTrashed: false,
      isArchived: false
    }
  ]
    })

  const allTags = [...new Set(notes.flatMap((note) => note.tags))]

  useEffect(() => {
  localStorage.setItem("smart-notes", JSON.stringify(notes))
  }, [notes])

  // Close edit form when sidebar section changes
  useEffect(() => {
    setEdit(null)
    setEditTags("")
  }, [activeSection])

// remove the notes nad move to trash
const deleteNote = (noteId) => {
  setNotes(
    (currNotes) => currNotes.map((note) => {

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

// make the note archived
const archiveNote = (noteId) => {
  setNotes(
    (currNotes) => currNotes.map((note) => {
       if (note.id === noteId) {
          return {
            ...note,
            isArchived: !note.isArchived
          }
        }

        return note
    })
  )
}


// permanently delete the note from trash
const permanentDelete = (noteId) => {
  setNotes(
    (currNotes) => currNotes.filter((note) => note.id !== noteId)
  )
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

// edit a note
const [editTags, setEditTags] = useState("");
const editNote =(noteId)=> {
  const selNote = notes.find(
    (note) => note.id === noteId
  )
  setEdit(selNote)
  setEditTags(selNote.tags.join(", "));
}

// save the edited note

const saveEdit = () => {
  setNotes((currNotes) =>
    currNotes.map((note) =>
      note.id === edit.id
      ? {
          ...edit,
          tags: editTags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag !== "")
        }
      : note
    )
  )

  setEdit(null)
}


  return (

    
    <div>

      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <SearchBar 
        search={search}
        setSearch={setSearch}
      />

      <h2>
        {activeSection === "all" && "All Notes"}
        {activeSection === "pinned" && "Pinned Notes"}
        {activeSection === "archived" && "Archived Notes"}
        {activeSection === "trash" && "Trash"}
        {activeSection === "tags" && "Tags"}
      </h2>

      {activeSection === "tags" && (
      <div>
        {allTags.map((tag) => (
          <button 
          key={tag}
          onClick={()=> setSelectedTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      )}

      {activeSection === "tags" && selectedTag && (
      <div>
        <h3><u>{selectedTag} Notes</u></h3>

        {notes
          .filter((note) => note.tags.includes(selectedTag) && note.isTrashed === false && note.isArchived === false)
          .map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              togglePin={togglePin}
              deleteNote={deleteNote}
              permanentDelete={permanentDelete}
              editNote={editNote}
              archiveNote={archiveNote}
            />
          ))}
      </div>
      )}

      {activeSection === "all" && (
      <NotesList
        notes={notes}
        setNotes={setNotes}
        deleteNote={deleteNote}
        editNote={editNote}
        search={search}
        archiveNote={archiveNote}
        togglePin={togglePin}
      />
      )}
      {edit && (
      <div>
        <h2>Edit Note</h2>
      
      <NoteForm
        title={edit.title}
        setTitle={(newTitle) =>
          setEdit({ ...edit, title: newTitle })
        }
        content={edit.content}
        setContent={(newContent) =>
          setEdit({ ...edit, content: newContent })
        }
      />
      <input
        type="text"
        placeholder="Enter tags (comma separated)"
        value={editTags}
        onChange={(e) => setEditTags(e.target.value)}
      />

      <button onClick={saveEdit }>
        Save Changes
      </button>
      <button onClick={() => setEdit(null)}>
        Cancel
      </button>
      </div>
      )}
  

      {activeSection === "trash" && (
      <Trash
        notes={notes}
        deleteNote={deleteNote}
        permanentDelete={permanentDelete}
      />
      )}

      
      {activeSection === "archived" && (
        
      <Archived
        notes={notes}
        archiveNote={archiveNote}
        deleteNote={deleteNote}
        editNote={editNote}
      />
      )}
    </div>
  )
}

export default Dashboard
