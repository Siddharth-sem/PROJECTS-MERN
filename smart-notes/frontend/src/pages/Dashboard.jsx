// import NavBar from "../components/NavBar"
import Sidebar from "../components/Sidebar"
import SearchBar from "../components/SearchBar"
import NotesList from "../components/NotesList"

const Dashboard = () => {
  return (
    <div>

      <Sidebar />

      <SearchBar />

      <NotesList />
    </div>
  )
}

export default Dashboard
