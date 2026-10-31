import NoteCard from "./NoteCard.jsx"

const Trash = ({notes, deleteNote, permanentDelete}) => {
  return (
    <div className="notes-grid">
      {notes.filter((note) => note.isTrashed === true).length > 0 ? (
        notes
          .filter((note) => note.isTrashed === true)
          .map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              deleteNote={deleteNote}
              permanentDelete={permanentDelete}
            />
          ))
      ) : (
        <p className="empty-state">Your trash is empty.</p>
      )}
    </div>
  );
}

export default Trash
