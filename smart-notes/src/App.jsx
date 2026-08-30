import {BrowserRouter, Route, Routes} from 'react-router-dom'
import NavBar from './components/NavBar'

// importing routes
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register' 
import NoteEditor from './pages/NoteEditor'

import './App.css'


function App() {
  return (
    <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/editor' element={<NoteEditor />} />
      </Routes>
    </BrowserRouter>
  )

}

export default App
