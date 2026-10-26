import ReactMarkdown from "react-markdown";

const NoteCard = ({note, togglePin, deleteNote, permanentDelete, editNote, archiveNote}
) => {
  return (
    <div>
      <h3>{note.title}</h3>

      <ReactMarkdown>{note.content}</ReactMarkdown>

      <p>
        Tags : {note.tags.join(", ")}
      </p>

      
      {note.isTrashed === false && togglePin && (
      <button onClick={() => togglePin(note.id)}>
        {note.isPinned ? "Unpin" : "Pin"}
      </button>
      )}


      <button onClick={() => deleteNote(note.id)}>
        {note.isTrashed ? "Restore" : "Trash"}
      </button>

      

      {note.isTrashed && (
      <button onClick={() => permanentDelete(note.id)}>
        Remove Permanantely
      </button>
      )}


      {note.isTrashed === false &&(
      <button onClick={() => editNote(note.id)}>
        Edit
      </button>
      )}

      {note.isTrashed === false &&(
      <button onClick={() => archiveNote(note.id)}>
        {note.isArchived ? "Unarchive" : "Archive"}
      </button>
      )}
    </div>
  ) 
}

export default NoteCard