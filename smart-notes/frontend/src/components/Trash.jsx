import NoteCard from "./NoteCard";

const Trash = ({ notes, toggleTrash, permanentDelete }) => {
  const trashedNotes = notes.filter((note) => note.isTrashed);

  return (
    <div className="notes-grid">
      {trashedNotes.length > 0 ? (
        trashedNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            toggleTrash={toggleTrash}
            permanentDelete={permanentDelete}
          />
        ))
      ) : (
        <p className="empty-state">Your trash is empty.</p>
      )}
    </div>
  );
};

export default Trash;