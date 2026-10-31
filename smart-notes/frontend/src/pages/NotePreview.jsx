import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useNotes } from "../context/useNotes";
import "./NotePreview.css";

const NotePreview = ({ theme, toggleTheme }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { notes, updateNote, toggleTrash } = useNotes();

  const note = notes.find((item) => item.id === Number(id));

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note?.title ?? "");
  const [content, setContent] = useState(note?.content ?? "");
  const [tags, setTags] = useState(note?.tags?.join(", ") ?? "");

  const contentRef = useRef(null);

  if (!note) {
    return (
      <div className="note-not-found">
        <h2>Note not found</h2>
        <button onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  const resetFields = () => {
    setTitle(note.title);
    setContent(note.content);
    setTags((note.tags ?? []).join(", "));
  };

  const hasUnsavedChanges = () => {
    const cleanTags = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    const originalTags = note.tags ?? [];

    return (
      title !== note.title ||
      content !== note.content ||
      JSON.stringify(cleanTags.map((tag) => tag.toLowerCase()).sort()) !==
        JSON.stringify(originalTags.map((tag) => tag.toLowerCase()).sort())
    );
  };

  const handleBack = () => {
    if (isEditing && hasUnsavedChanges()) {
      const confirmed = window.confirm(
        "You have unsaved changes. Discard them?"
      );

      if (!confirmed) return;
    }

    navigate("/dashboard");
  };

  const startEditing = () => {
    resetFields();
    setIsEditing(true);
  };

  const cancelEditing = () => {
    if (hasUnsavedChanges()) {
      const confirmed = window.confirm(
        "Discard your unsaved changes?"
      );

      if (!confirmed) return;
    }

    resetFields();
    setIsEditing(false);
  };

  const formatText = (before, after = before) => {
    const textarea = contentRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const selectedText = content.substring(start, end);
    const selected = selectedText || "text";

    const replacement = `${before}${selected}${after}`;

    const newContent =
      content.substring(0, start) +
      replacement +
      content.substring(end);

    setContent(newContent);

    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selected.length
      );
    });
  };

  const insertLine = (prefix) => {
    const textarea = contentRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const lineStart = content.lastIndexOf("\n", start - 1) + 1;

    const newContent =
      content.substring(0, lineStart) +
      prefix +
      content.substring(lineStart);

    setContent(newContent);

    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length
      );
    });
  };

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      alert("Please enter both title and content.");
      return;
    }

    const cleanTags = [
      ...new Map(
        tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
          .map((tag) => [
            tag.toLowerCase(),
            tag.charAt(0).toUpperCase() +
              tag.slice(1).toLowerCase(),
          ])
      ).values(),
    ];

    updateNote(note.id, {
      title: title.trim(),
      content,
      tags: cleanTags,
    });

    setIsEditing(false);
  };

  const handleTrash = () => {
    if (isEditing && hasUnsavedChanges()) {
      const confirmed = window.confirm(
        "Discard unsaved changes and move this note to Trash?"
      );

      if (!confirmed) return;
    }

    toggleTrash(note.id);
    navigate("/dashboard");
  };

  return (
    <main className="note-preview-page">
      <header className="note-preview-toolbar">
        <button
          type="button"
          className="preview-back-btn"
          onClick={handleBack}
        >
          ← Back
        </button>

        <div className="preview-header-actions">
          <button
            type="button"
            className="preview-action-btn"
            onClick={handleTrash}
          >
            🗑 Trash
          </button>

          <button
            type="button"
            className="preview-action-btn"
            onClick={toggleTheme}
          >
            {theme === "light" ? "🌙 Theme" : "☀️ Theme"}
          </button>

          {isEditing ? (
            <>
              <button
                type="button"
                className="preview-action-btn"
                onClick={cancelEditing}
              >
                Cancel
              </button>

              <button
                type="button"
                className="preview-save-btn"
                onClick={handleSave}
              >
                Save
              </button>
            </>
          ) : (
            <button
              type="button"
              className="preview-edit-btn"
              onClick={startEditing}
            >
              ✏️ Edit
            </button>
          )}
        </div>
      </header>

      {isEditing && (
        <div className="preview-tags-row">
          <label htmlFor="note-tags">Tags</label>

          <input
            id="note-tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Add tags separated by commas"
          />
        </div>
      )}

      <section className="note-preview-content">
        {isEditing ? (
          <>
            <input
              type="text"
              className="preview-title-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note title"
            />

            <textarea
              ref={contentRef}
              className="preview-editor-textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note..."
            />

            <div className="markdown-toolbar">
              <button type="button" onClick={() => formatText("**")}>
                <strong>B</strong>
              </button>

              <button type="button" onClick={() => formatText("*")}>
                <em>I</em>
              </button>

              <button type="button" onClick={() => insertLine("# ")}>
                H1
              </button>

              <button type="button" onClick={() => insertLine("## ")}>
                H2
              </button>

              <button type="button" onClick={() => insertLine("- ")}>
                • List
              </button>

              <button type="button" onClick={() => insertLine("1. ")}>
                1. List
              </button>

              <button type="button" onClick={() => formatText("`")}>
                {"</>"}
              </button>

              <button
                type="button"
                onClick={() =>
                  formatText("[", "](https://example.com)")
                }
              >
                Link
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="preview-note-title">{note.title}</h1>

            <div className="preview-note-tags">
              {(note.tags ?? []).map((tag, index) => (
                <span className="note-tag" key={`${tag}-${index}`}>
                  {tag}
                </span>
              ))}
            </div>

            <article className="preview-markdown">
              <ReactMarkdown>{note.content}</ReactMarkdown>
            </article>
          </>
        )}
      </section>
    </main>
  );
};

export default NotePreview;