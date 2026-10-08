const NoteCard = ({note, togglePin, deleteNote, PermanentDelete}
) => {
  return (
    <div>
      <h3>{note.title}</h3>

      <p>{note.content}</p>

      <p>
        Tags : {note.tags.join(", ")}
      </p>

      <button onClick={() => togglePin(note.id)}>
        {note.isPinned ? "Unpin" : "Pin"}
      </button>

      <button onClick={() => deleteNote(note.id)}>
        {note.isTrashed ? "Restore" : "Trash"}
      </button>

      <button onClick={() => PermanentDelete(note.id)}>
        Remove Permanantely
      </button>
    </div>
  )
}

export default NoteCard