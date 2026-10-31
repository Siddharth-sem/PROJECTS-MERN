
import ReactMarkdown from "react-markdown";

const NoteCard = ({
  note,
  togglePin,
  deleteNote,
  permanentDelete,
  editNote,
  archiveNote
}) => {
  return (
    <div className="note-card">

      <div className="note-card-header">
        <h3 className="note-card-title">{note.title}</h3>

        {note.isPinned && (
          <span className="pinned-label">Pinned</span>
        )}
      </div>

      <div className="note-card-content">
        <ReactMarkdown>{note.content}</ReactMarkdown>
      </div>

      <div className="note-card-tags">
        {note.tags.map((tag, index) => (
          <span className="note-tag" key={index}>
            {tag}
          </span>
        ))}
      </div>

      <div className="note-card-actions">

        {note.isTrashed === false && togglePin && (
          <button
            className="note-action-btn"
            onClick={() => togglePin(note.id)}
          >
            {note.isPinned ? "Unpin" : "Pin"}
          </button>
        )}

        <button
          className="note-action-btn"
          onClick={() => deleteNote(note.id)}
        >
          {note.isTrashed ? "Restore" : "Trash"}
        </button>

        {note.isTrashed && (
          <button
            className="note-action-btn danger"
            onClick={() => permanentDelete(note.id)}
          >
            Delete Permanently
          </button>
        )}

        {note.isTrashed === false && editNote && (
          <button
            className="note-action-btn"
            onClick={() => editNote(note.id)}
          >
            Edit
          </button>
        )}

        {note.isTrashed === false && archiveNote && (
          <button
            className="note-action-btn"
            onClick={() => archiveNote(note.id)}
          >
            {note.isArchived ? "Unarchive" : "Archive"}
          </button>
        )}

      </div>
    </div>
  );
};

export default NoteCard;
