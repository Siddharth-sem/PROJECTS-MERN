
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import NavBar from './components/NavBar'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import NoteEditor from './pages/NoteEditor'

import './App.css'

const AppLayout = () => {
  const location = useLocation()

  return (
    <>
      {location.pathname !== "/dashboard" && <NavBar />}

      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/editor' element={<NoteEditor />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}

export default App
