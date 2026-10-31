import NoteCard from "./NoteCard";

const Archived = ({ notes, toggleArchive, toggleTrash }) => {
  const archivedNotes = notes.filter(
    (note) => note.isArchived && !note.isTrashed
  );

  return (
    <div className="notes-grid">
      {archivedNotes.length > 0 ? (
        archivedNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            toggleArchive={toggleArchive}
            toggleTrash={toggleTrash}
          />
        ))
      ) : (
        <p className="empty-state">No archived notes yet.</p>
      )}
    </div>
  );
};

export default Archived;