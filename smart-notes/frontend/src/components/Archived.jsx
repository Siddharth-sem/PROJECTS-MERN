import NoteCard from "./NoteCard"

const Archived = ({notes, archiveNote, deleteNote, editNote}) => {
  return (
    <div className="notes-grid">
      {notes.filter(
        (note) => note.isArchived === true && note.isTrashed === false
      ).length > 0 ? (
        notes
          .filter(
            (note) => note.isArchived === true && note.isTrashed === false
          )
          .map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              archiveNote={archiveNote}
              deleteNote={deleteNote}
              editNote={editNote}
            />
          ))
      ) : (
        <p className="empty-state">No archived notes yet.</p>
      )}
    </div>
  );
}

export default Archived
