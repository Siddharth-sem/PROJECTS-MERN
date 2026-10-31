import { useNavigate } from "react-router-dom";
import NoteCard from "./NoteCard";

const NotesList = ({
  notes,
  search,
  togglePin,
  toggleArchive,
  toggleTrash,
}) => {
  const navigate = useNavigate();

  const visibleNotes = [...notes]
    .filter((note) => !note.isTrashed && !note.isArchived)
    .sort((a, b) => Number(b.isPinned) - Number(a.isPinned))
    .filter(
      (note) =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.content.toLowerCase().includes(search.toLowerCase()) ||
        note.tags.some((tag) =>
          tag.toLowerCase().includes(search.toLowerCase())
        )
    );

  return (
    <div className="notes-list-container">
      <div className="notes-grid">
        {visibleNotes.length > 0 ? (
          visibleNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              togglePin={togglePin}
              toggleArchive={toggleArchive}
              toggleTrash={toggleTrash}
            />
          ))
        ) : (
          <p className="empty-state">
            {search.trim()
              ? "No notes match your search."
              : "No notes yet. Create your first note!"}
          </p>
        )}
      </div>

      <button
        className="floating-create-btn"
        onClick={() => navigate("/editor/new")}
      >
        + Create Note
      </button>
    </div>
  );
};

export default NotesList;