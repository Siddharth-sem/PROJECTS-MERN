import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import NoteEditor from "./pages/NoteEditor";
import NotePreview from "./pages/NotePreview";

import { NotesProvider } from "./context/NotesContext";

import "./App.css";

const AppLayout = () => {
  const location = useLocation();

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("smart-notes-theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("smart-notes-theme", theme);
  }, [theme]);

  return (
    <>
      {location.pathname !== "/dashboard" &&
        !location.pathname.startsWith("/notes/") && <NavBar />}

      {!location.pathname.startsWith("/notes/") && (
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
      )}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/editor/new" element={<NoteEditor />} />
        <Route
          path="/notes/:id"
          element={
            <NotePreview
              theme={theme}
              toggleTheme={() =>
                setTheme((current) =>
                  current === "light" ? "dark" : "light"
                )
              }
            />
          }
        />
      </Routes>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <NotesProvider>
        <AppLayout />
      </NotesProvider>
    </BrowserRouter>
  );
}

export default App;