import { useState } from "react"

// import NavBar from "../components/NavBar"
import Sidebar from "../components/Sidebar"
import SearchBar from "../components/SearchBar"
import NotesList from "../components/NotesList"
import Trash from "../components/Trash"
import Archived from "../components/Archived"


const Dashboard = () => {

  const [edit, setEdit] = useState(null)

  const [search, setSearch] =useState("")

  const [notes, setNotes] = useState([
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
    ])



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


// edit a note
const editNote =(noteId)=> {
  const selNote = notes.find(
    (note) => note.id === noteId
  )
  setEdit(selNote)
}

// save the edited note

const saveEdit = () => {
  setNotes((currNotes) =>
    currNotes.map((note) =>
      note.id === edit.id ? edit : note
    )
  )

  setEdit(null)
}


  return (

    
    <div>
      <h1><u>SIDEBAR</u></h1>
      <Sidebar />

      <h1><u>SEARCHBAR</u></h1>
      <SearchBar 
        search={search}
        setSearch={setSearch}
      />

      <h1><u>NOTELIST</u></h1>
      <NotesList
        notes={notes}
        setNotes={setNotes}
        deleteNote={deleteNote}
        editNote={editNote}
        search={search}
        archiveNote={archiveNote}
      />
      {edit && (
      <div>
        <h2>Edit Note</h2>
      
      <input
        type="text"
        value={edit.title}
        onChange={(e)=>
          setEdit({...edit, title : e.target.value})
        }
      />
      <textarea
        value={edit.content}
        onChange={(e)=>
          setEdit({...edit, content : e.target.value})
        }
      />
      <button onClick={saveEdit}>
        Save Changes
      </button>
      <button onClick={() => setEdit(null)}>
        Cancel
      </button>
      </div>
      )}
  
      <h1><u>TRASH</u></h1>
      <Trash 
        notes ={notes}
        deleteNote ={deleteNote}
        permanentDelete={permanentDelete}
      />

      <h1><u>ARCHIVED NOTES</u></h1>
      <Archived
        notes={notes}
        archiveNote={archiveNote}
        deleteNote={deleteNote}
        editNote={editNote}
      />
    </div>
  )
}

export default Dashboard
