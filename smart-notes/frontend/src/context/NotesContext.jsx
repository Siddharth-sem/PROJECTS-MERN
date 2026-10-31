import { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { NotesContext } from "./NotesContext";

export const useNotes = () => useContext(NotesContext);
export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState(() => {
    try {
      const savedNotes = localStorage.getItem("smart-notes");

      if (!savedNotes) return [];

      const parsedNotes = JSON.parse(savedNotes);

      if (!Array.isArray(parsedNotes)) return [];

      return parsedNotes.filter(
        (note) =>
          note &&
          typeof note === "object" &&
          typeof note.id === "number" &&
          typeof note.title === "string" &&
          typeof note.content === "string" &&
          Array.isArray(note.tags)
      );
    } catch (error) {
      console.error("Failed to load notes:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("smart-notes", JSON.stringify(notes));
    } catch (error) {
      console.error("Failed to save notes:", error);
    }
  }, [notes]);

  const addNote = (noteData) => {
    const newNote = {
      id: Date.now(),
      title: noteData.title,
      content: noteData.content,
      tags: noteData.tags,
      isPinned: false,
      isTrashed: false,
      isArchived: false,
    };

    setNotes((current) => [...current, newNote]);

    return newNote.id;
  };

  const updateNote = (noteId, updatedData) => {
    setNotes((current) =>
      current.map((note) =>
        note.id === noteId
          ? { ...note, ...updatedData }
          : note
      )
    );
  };

  const togglePin = (noteId) => {
    setNotes((current) =>
      current.map((note) =>
        note.id === noteId
          ? { ...note, isPinned: !note.isPinned }
          : note
      )
    );
  };

  const toggleArchive = (noteId) => {
    setNotes((current) =>
      current.map((note) =>
        note.id === noteId
          ? { ...note, isArchived: !note.isArchived }
          : note
      )
    );
  };

  const toggleTrash = (noteId) => {
    setNotes((current) =>
      current.map((note) =>
        note.id === noteId
          ? { ...note, isTrashed: !note.isTrashed }
          : note
      )
    );
  };

  const permanentDelete = (noteId) => {
    setNotes((current) =>
      current.filter((note) => note.id !== noteId)
    );
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        addNote,
        updateNote,
        togglePin,
        toggleArchive,
        toggleTrash,
        permanentDelete,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};