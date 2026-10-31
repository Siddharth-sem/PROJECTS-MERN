import { useContext } from "react";
import { NotesContext } from "./NotesContext";

export const useNotes = () => useContext(NotesContext);