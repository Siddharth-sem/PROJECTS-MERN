
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { useState, useEffect } from "react";
import NavBar from './components/NavBar'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import NoteEditor from './pages/NoteEditor'

import './App.css'

const AppLayout = () => {
  const location = useLocation()
  const [theme, setTheme] = useState("light");

    useEffect(() => {
      document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

  return (
    <div>
      {location.pathname !== "/dashboard" && <NavBar />}

      <button
        className="theme-toggle"
        onClick={() =>
          setTheme((current) =>
            current === "light" ? "dark" : "light"
          )
        }
      >
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>

      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/editor' element={<NoteEditor />} />
      </Routes>
    </div>
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
