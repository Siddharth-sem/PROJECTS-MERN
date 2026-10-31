import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";

const NoteCard = ({
  note,
  togglePin,
  toggleArchive,
  toggleTrash,
  permanentDelete,
}) => {
  const navigate = useNavigate();

  const openNote = () => {
    navigate(`/notes/${note.id}`);
  };

  return (
    <div
      className="note-card"
      onClick={openNote}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") openNote();
      }}
    >
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
        {!note.isTrashed && togglePin && (
          <button
            className="note-action-btn"
            onClick={(e) => {
              e.stopPropagation();
              togglePin(note.id);
            }}
          >
            {note.isPinned ? "Unpin" : "Pin"}
          </button>
        )}

        {!note.isTrashed && toggleArchive && (
          <button
            className="note-action-btn"
            onClick={(e) => {
              e.stopPropagation();
              toggleArchive(note.id);
            }}
          >
            {note.isArchived ? "Unarchive" : "Archive"}
          </button>
        )}

        {toggleTrash && (
          <button
            className="note-action-btn"
            onClick={(e) => {
              e.stopPropagation();
              toggleTrash(note.id);
            }}
          >
            {note.isTrashed ? "Restore" : "Trash"}
          </button>
        )}

        {note.isTrashed && permanentDelete && (
          <button
            className="note-action-btn danger"
            onClick={(e) => {
              e.stopPropagation();
              permanentDelete(note.id);
            }}
          >
            Delete Permanently
          </button>
        )}
      </div>
    </div>
  );
};

export default NoteCard;