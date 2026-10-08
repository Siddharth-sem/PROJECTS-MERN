import { useState } from "react"

// import NavBar from "../components/NavBar"
import Sidebar from "../components/Sidebar"
import SearchBar from "../components/SearchBar"
import NotesList from "../components/NotesList"
import Trash from "../components/Trash"

const Dashboard = () => {

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


  // remove the notes nad move to trash
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


// permanently delete the note from trash
const permanentDelete = (noteId) => {
  setNotes(
    notes.filter((note) => note.id !== noteId)
  )
}

  return (
    <div>
      <h1><u>SIDEBAR</u></h1>
      <Sidebar />

      <h1><u>SEARCHBAR</u></h1>
      <SearchBar />

      <h1><u>NOTELIST</u></h1>
      <NotesList
        notes={notes}
        setNotes={setNotes}
        deleteNote={deleteNote}
      />
  
      <h1><u>TRASH</u></h1>
      <Trash 
        notes ={notes}
        deleteNote ={deleteNote}
        permanentDelete={permanentDelete}
      />

    </div>
  )
}

export default Dashboard
