import { useState } from "react"

// import NavBar from "../components/NavBar"
import Sidebar from "../components/Sidebar"
import SearchBar from "../components/SearchBar"
import NotesList from "../components/NotesList"

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

  return (
    <div>

      <Sidebar />

      <SearchBar />

      <NotesList
        notes={notes}
        setNotes={setNotes}
/>
    </div>
  )
}

export default Dashboard
